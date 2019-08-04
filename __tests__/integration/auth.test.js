/* eslint-disable no-undef */
const request = require("supertest")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const bcrypt = require("bcryptjs")

const User = require("../../src/app/models/User")
const factory = require("../factories")

const app = function lazyApp() {
  return require("../../src/app")
}

describe("Auth", () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer()
    const uri = await mongoServer.getConnectionString()

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
  })

  afterAll(async done => {
    await mongoose.disconnect(done)
  })

  afterEach(async () => {
    await User.deleteMany()
  })

  it("should hash user password when user is created", async () => {
    const password = "123123123"

    const user = await factory.create("User", { password })

    const compareHash = await bcrypt.compare(password, user.password)

    expect(compareHash).toBe(true)
  })

  it("should be able to register", async () => {
    const user = await factory.attrs("User")

    const response = await request(app())
      .post("/register")
      .send(user)

    expect(response.body).toHaveProperty("token")
  })

  it("should not be able to register with invalid email", async () => {
    const email = "caiogmail.com"
    const user = await factory.attrs("User", { email })

    const response = await request(app())
      .post("/register")
      .send(user)

    expect(response.status).toBe(400)
  })

  it("should not be able to register with duplicate email", async () => {
    const email = "caio@gmail.com"
    const user = await factory.attrs("User", { email })

    await request(app())
      .post("/register")
      .send(user)

    const response = await request(app())
      .post("/register")
      .send(user)

    expect(response.status).toBe(400)
  })

  it("should be able to login with valid cretendials", async () => {
    const password = "123123123"
    const user = await factory.create("User", { password })

    const response = await request(app())
      .post("/login")
      .send({
        email: user.email,
        password
      })

    expect(response.status).toBe(200)
  })

  it("should not be able to login with invalid password", async () => {
    const password = "123123123"
    const user = await factory.create("User", { password })

    const response = await request(app())
      .post("/login")
      .send({
        email: user.email,
        password: `${password}diff`
      })

    expect(response.status).toBe(400)
  })

  it("should not be able to login with invalid email", async () => {
    const password = "123123123"
    const user = await factory.create("User", { password })

    const response = await request(app())
      .post("/login")
      .send({
        email: `${user.email}diff`,
        password
      })

    expect(response.status).toBe(400)
  })

  it("should be able to logout", async () => {
    const user = await factory.create("User")

    const token = await user.generateAuthToken()

    const response = await request(app())
      .post("/logout")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it("should be able to logout all tokens", async () => {
    const user = await factory.create("User")

    await user.generateAuthToken()
    const token = await user.generateAuthToken()

    const response = await request(app())
      .post("/logoutAll")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it("should not accept older token", async () => {
    const user = await factory.create("User")

    const token = await user.generateAuthToken()

    user.tokens = []

    await user.save()

    const response = await request(app())
      .post("/logoutAll")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(401)
  })
})
