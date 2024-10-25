const sqlite3 = require('sqlite3').verbose()
const path = require('path')

class SqliteService {
  constructor() {
    this.dbPath = path.join(__dirname, '../tmp-data/database.db')
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) throw err.message
    });
  }

  async execQuery(query) {
    return new Promise((resolve, reject) => {
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(rows)
        }
    })
  });
  }
}

module.exports = SqliteService