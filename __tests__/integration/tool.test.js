/* eslint-disable no-undef */
const request = require("supertest")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

const Tool = require("../../src/app/models/Tool")
const factory = require("../factories")

const app = require("../../src/app")

describe("Auth", () => {
  let mongoServer, user, token

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer()
    const uri = await mongoServer.getConnectionString()

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    })

    user = await factory.create("User")
    token = await user.generateAuthToken()
  })

  afterAll(async () => {
    await mongoose.disconnect(done)
  })

  afterEach(async () => {
    await Tool.deleteMany()
  })

  it("should be able to create tool", async () => {
    const tool = await factory.attrs("Tool")

    const response = await request(app)
      .post("/tools")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...tool, user: user._id })

    expect(response.status).toBe(201)
  })

  it("should not be able to create tool with invalid link", async () => {
    const tool = await factory.attrs("Tool", {
      link: "invalidUrl",
      user: user._id
    })

    const response = await request(app)
      .post("/tools")
      .set("Authorization", `Bearer ${token}`)
      .send(tool)

    expect(response.status).toBe(400)
  })

  it("should be able to edit tool", async () => {
    const tool = await factory.create("Tool", { user: user._id })

    const response = await request(app)
      .put(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Title" })

    expect(response.status).toBe(200)
  })

  it("should not be able to edit tool with invalid parameter", async () => {
    const tool = await factory.create("Tool", { user: user._id })

    const response = await request(app)
      .put(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ invalidParam: "Anything" })

    expect(response.status).toBe(400)
  })

  it("should not be able to edit a tool that is not yours", async () => {
    const tool = await factory.create("Tool")

    const response = await request(app)
      .put(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "edited" })

    expect(response.status).toBe(404)
  })

  it("should be able to delete a tool", async () => {
    const tool = await factory.create("Tool", { user: user._id })

    const response = await request(app)
      .delete(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it("should not be able to delete a tool that is not yours", async () => {
    const tool = await factory.create("Tool")

    const response = await request(app)
      .delete(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(404)
  })

  it("should be able to get tools", async () => {
    const response = await request(app)
      .get("/tools")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it("should be able to get a tool", async () => {
    const tool = await factory.create("Tool", { user: user._id })

    const response = await request(app)
      .get(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it("should not be able to get a tool that is not yours", async () => {
    const tool = await factory.create("Tool")

    const response = await request(app)
      .get(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(404)
  })

  it("should be able to get tools by title", async () => {
    const tool = await factory.create("Tool", {
      title: "Title",
      user: user._id
    })

    const response = await request(app)
      .get(`/tools?title=${tool.title.slice(1, 2)}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.body.length).toBe(1)
  })

  it("should be able to get tools by title", async () => {
    const tool = await factory.create("Tool", {
      tags: ["tag1", "tag2"],
      user: user._id
    })

    const response = await request(app)
      .get(`/tools?tag=${tool.tags[0].slice(1, 2)}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.body.length).toBe(1)
  })
})
