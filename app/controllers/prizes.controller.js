const prizeDomain = require('../domains/prizes.domain')

const works = (req, res, next) => {
  res.status(200).send({ message: 'prizes works fine!' });
}

const getTwoPrizesConsecutives = async (req, res, next) => {
  try {
    const result = await prizeDomain.getTwoPrizesConsecutives()
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message || error });
  }
}


module.exports = {
  works,
  getTwoPrizesConsecutives
}