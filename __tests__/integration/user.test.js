/* eslint-disable no-undef */
const request = require("supertest")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const app = require("../../src/app")

const factory = require("../factories")

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

  afterAll(async done => {
    await mongoose.disconnect(done)
  })

  afterEach(async () => {})

  it("should not be able to get user with invalid token", async () => {
    const response = await request(app)
      .get("/me")
      .set("Authorization", "Bearer 1234")

    expect(response.status).toBe(401)
  })

  it("should be able to get user", async () => {
    const response = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it("should be able to delete user", async () => {
    const response = await request(app)
      .delete("/me")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
  })
})
