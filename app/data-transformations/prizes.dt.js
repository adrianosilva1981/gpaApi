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

  // calculando o menor e maior intervalo
  const min = Object.keys(sortedData)[0]
  const max = Object.keys(sortedData)[Object.keys(sortedData).length - 1]

  return  {
    min: [
      {
        producer: min,
        interval: calculateInterval(sortedData[min])[0],
        previousWin: sortedData[min][0],
        followingWin: sortedData[min][sortedData[min].length - 1],
      }
    ],
    max: [
      {
        producer: max,
        interval: calculateInterval(sortedData[max])[0],
        previousWin: sortedData[max][0],
        followingWin: sortedData[max][sortedData[max].length - 1],
      }
    ]
  }
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
