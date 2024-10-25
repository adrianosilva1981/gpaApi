const fs = require("fs");
const csv = require("csv-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const importData = async () => {
  // in case to use with file to view data with a sgbd
  // if (fs.existsSync(path.join(__dirname, 'database.db'))) {
  //   fs.writeFileSync(path.join(__dirname, 'database.db'))
  // }

  const movies = [];
  const db = new sqlite3.Database(":memory:");
  // to set database to file
  // const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

  return new Promise((resolve, reject) => {
    const csvFilePath = path.join(__dirname, 'movielist.csv');

    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => movies.push(data))
      .on("end", async () => {
        try {
          await new Promise((resolve, reject) => {
            db.run(
              `CREATE TABLE IF NOT EXISTS movies (
                year INT,
                title TEXT,
                studios TEXT,
                producers TEXT,
                winner TEXT)`,
              (err) => {
                if (err) {
                  console.error("Erro ao criar tabela:", err);
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
          });

          const rowCount = await new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) as count FROM movies`, [], (err, row) => {
              if (err) {
                console.error("Erro ao contar registros:", err);
                reject(err);
              } else {
                resolve(row.count);
              }
            });
          });

          if (rowCount > 0) {
            resolve()
            return
          }

          for (const movie of movies) {
            await new Promise((resolve, reject) => {
              db.run(
                `INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`,
                [
                  movie.year,
                  movie.title,
                  movie.studios,
                  movie.producers,
                  movie.winner,
                ],
                (err) => {
                  if (err) {
                    console.error("Erro ao inserir dados:", err);
                    reject(err);
                  } else {
                    resolve();
                  }
                }
              );
            });
          }

          console.log("Dados importados com sucesso!");
          resolve();
        } catch (error) {
          console.error("Erro ao importar os dados:", error);
          reject(error);
        } finally {
          db.close();
        }
      });
  });
};

importData();
