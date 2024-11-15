const DataService = require('../services/data.svc')
const dataService = new DataService('movies')
const getGroupInterval = require('../utils/get-groups-interval.util')

const getTwoPrizesGreaterConsecutives = async () => {
  try {
    const collection = await dataService.loadDB();
    if (!collection) throw new Error('Error loading collection')

    const movies = collection.find({ winner: true });
    const group = getGroupInterval(movies);

    let producersInterval = 0;
    let producersMaxInterval = [];

    Object.keys(group).forEach(producer => {
      const years = group[producer].sort((a, b) => a - b);
      for (let i = 1; i < years.length; i++) {
        const interval = years[i] - years[i - 1];

        if (interval > producersInterval) {
          producersInterval = interval;
          producersMaxInterval = [{
            producer,
            interval,
            previousWin: years[i - 1],
            followingWin: years[i]
          }];
        } else if (interval === producersInterval) {
          producersMaxInterval.push({
            producer,
            interval,
            previousWin: years[i - 1],
            followingWin: years[i]
          });
        }
      }
    });

    return producersMaxInterval;

  } catch (error) {
    return error;
  }
};

const getTwoPrizesLowerConsecutives = async () => {
  try {
    const collection = await dataService.loadDB();
    if (!collection) throw new Error('Error loading collection')

    const movies = collection.find({ winner: true });
    const group = getGroupInterval(movies);

    let producersInterval = Infinity;
    let producersMaxInterval = [];

    Object.keys(group).forEach(producer => {
      const years = group[producer].sort((a, b) => a - b);
      for (let i = 1; i < years.length; i++) {
        const interval = years[i] - years[i - 1];

        if (interval < producersInterval) {
          producersInterval = interval;
          producersMaxInterval = [{
            producer,
            interval,
            previousWin: years[i - 1],
            followingWin: years[i]
          }];
        } else if (interval === producersInterval) {
          producersMaxInterval.push({
            producer,
            interval,
            previousWin: years[i - 1],
            followingWin: years[i]
          });
        }
      }
    });

    return producersMaxInterval;

  } catch (error) {
    return error;
  }
};

const getTwoPrizesConsecutives = async () => {
  const max = await getTwoPrizesGreaterConsecutives()
  const min = await getTwoPrizesLowerConsecutives()

  return { min, max }
}

module.exports = {
  getTwoPrizesConsecutives
};
