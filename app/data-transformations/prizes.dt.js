module.exports = (prizes) => {
  const producersCount = {};

  // agrupando os produtores que possuem prêmios
  // e os anos dos prêmios
  prizes.forEach((el) => {
    const producersArr = el.producers.split(/,| and /);
    producersArr.forEach((producer) => {
      const sanitezedProducer = producer.trim();
      if (producersCount[sanitezedProducer]) {
        producersCount[sanitezedProducer].push(el.year);
      } else if (sanitezedProducer) {
        producersCount[sanitezedProducer] = [el.year];
      }
    });
  });

  // filtrando os que têm mais de um prêmio
  const winners = Object.keys(producersCount).filter(
    (key) => producersCount[key].length > 1
  );

  if (!winners.length) return null

  // agrupando os produtores
  const winnersDt = {};
  winners.forEach((winner) => {
    winnersDt[winner] = producersCount[winner];
  });

  // ordenando pelo intervalo de anos entre dois prêmios
  const sortedKeys = Object.keys(winnersDt).sort((a, b) => {
    const differenceA = calculateDifference(winnersDt[a]);
    const differenceB = calculateDifference(winnersDt[b]);
    return differenceA - differenceB;
  });

  // agrupando os produtores de acordo com a ordem de intervalos
  const sortedData = {};
  sortedKeys.forEach((key) => {
    sortedData[key] = winnersDt[key];
  });

  let minInterval = Object.keys(sortedData)[0]
  let maxInterval = Object.keys(sortedData)[Object.keys(sortedData).length - 1]

  minInterval = sortedData[minInterval][1] - sortedData[minInterval][0],
  maxInterval = sortedData[maxInterval][1] - sortedData[maxInterval][0]

  const allData = Object.keys(sortedData).map(el => ({
    producer: el,
    interval: calculateInterval(sortedData[el])[0],
    previousWin: sortedData[el][0],
    followingWin: sortedData[el][sortedData[el].length - 1],
  }))


  const min = allData.filter(el => el.interval === minInterval)
  const max = allData.filter(el => el.interval === maxInterval)

  return { min, max }
};

const calculateDifference = (years) => {
  return Math.abs(Math.max(...years) - Math.min(...years));
};

const calculateInterval = (array) => {
  const diferencas = [];

  for (let i = 0; i < array.length - 1; i++) {
      const diferenca = array[i + 1] - array[i];
      diferencas.push(diferenca);
  }

  return diferencas.sort();
}
