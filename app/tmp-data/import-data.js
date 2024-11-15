const fs = require('fs');
const csv = require('csv-parser');
const Loki = require('lokijs');
const path = require("path");
const db = new Loki('movies.db');
const moviesCollection = db.addCollection('movies');

async function loadCsvData() {
    try {
        const moviesMap = new Map();

        await new Promise((resolve, reject) => {
            const csvFilePath = path.join(__dirname, 'movielist.csv');
            fs.createReadStream(csvFilePath)
                .pipe(csv({ separator: ';' }))
                .on('data', (row) => {
                    const { title, year, studios, producers, winner } = row;

                    moviesMap.set(title, {
                        title,
                        year,
                        studios,
                        producers: producers.split(/,|\band\b/).map(el => el.replace(/^\s+/, "")),
                        winner: winner === 'yes'
                    });
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                    resolve();
                })
                .on('error', (err) => {
                    reject(err);
                });
        });

        for (const movie of moviesMap.values()) {
            moviesCollection.insert(movie);
        }

        db.saveDatabase();

    } catch (err) {
        console.error('Erro ao processar o CSV:', err);
    }
}

async function start() {
    await loadCsvData();
    console.log('Processamento do CSV concluído');
}

start();
