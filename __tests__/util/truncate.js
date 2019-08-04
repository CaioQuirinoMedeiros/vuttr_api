const conn = require("../../src/database/index")

module.exports = async () => {
  console.log(conn.db)
  return conn.dropDatabase()
}
