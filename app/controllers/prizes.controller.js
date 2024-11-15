const prizeDomain = require('../domains/prizes.domain')

const works = (req, res, next) => {
  res.status(200).send({ message: 'prizes works fine!' });
}

const getTwoPrizesConsecutives = async (req, res, next) => {
  try {
    const result = await prizeDomain.getTwoPrizesConsecutives()

    const statusCode = result ? 200 : 404

    res.status(statusCode).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message || error });
  }
}


module.exports = {
  works,
  getTwoPrizesConsecutives
}