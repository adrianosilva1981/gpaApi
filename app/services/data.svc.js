const Loki = require('lokijs');

class DataService {
    constructor(collectionName) {
        this.collectionName = collectionName
    }

    async loadDB() {
        return new Promise((resolve, reject) => {
            this.db = new Loki(`movies.db`, {
                autoload: true,
                autoloadCallback: (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        this.collection = this.db.getCollection(this.collectionName)
                            || this.db.addCollection(this.collectionName);
                        resolve(this.collection)
                    }
                },
                autosave: true,
                autosaveInterval: 4000
            });
        })
    }

    closeDB() {
        if (this.db) {
            this.db.persistence.persist()
            this.db = null;
        }
    }
}

module.exports = DataService
