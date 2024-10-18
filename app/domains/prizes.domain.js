const SqliteService = require("../services/sqlite.svc");
const prizeDt = require('../data-transformations/prize.dt')
const intervalYears = require('../utils/get-years-interval.util')

const getTwoPrizesConsecutives = async () => {
  const query = `SELECT
                  GROUP_CONCAT(m."year" , ',') AS \`years\`,
                  m.producers, COUNT(m.winner) as \`awards\`
                FROM movies m WHERE m.winner = 'yes'
                GROUP by m.producers
                HAVING COUNT(m.winner) > 1 order by \`awards\` desc`;

  const sqliteService = new SqliteService();
  const prizes = await sqliteService.execQuery(query);

  const prizesDt = prizeDt(prizes)
  const producer = prizesDt.map(el => ({
    producer: el.producers,
    interval: intervalYears(el.years)
  }))

  return producer
};

module.exports = {
  getTwoPrizesConsecutives
}
