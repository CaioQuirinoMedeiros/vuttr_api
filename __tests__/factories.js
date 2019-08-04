const faker = require("faker")
const FactoryGirl = require("factory-girl")
const mongoose = require("mongoose")

const User = require("../src/app/models/User")
const Tool = require("../src/app/models/Tool")

const factory = FactoryGirl.factory
const adapter = new FactoryGirl.MongooseAdapter()

factory.setAdapter(adapter)

factory.define("User", User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

factory.define("Tool", Tool, {
  title: faker.lorem.word(),
  link: faker.internet.url(),
  description: faker.lorem.paragraph(),
  tags: new Array(5).fill(null).map(() => faker.company.bsBuzz()),
  user: mongoose.Types.ObjectId()
})

module.exports = factory
