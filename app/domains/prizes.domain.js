const SqliteService = require("../services/sqlite.svc");
const prizeDT = require('../data-transformations/prizes.dt')

const getTwoPrizesConsecutives = async () => {
  const query = `SELECT * FROM movies m WHERE m.winner = 'yes'`;
  const sqliteService = new SqliteService();
  const prizes = await sqliteService.execQuery(query);
  const prizesDt = prizeDT(prizes)

  return prizesDt

};

module.exports = {
  getTwoPrizesConsecutives
}
