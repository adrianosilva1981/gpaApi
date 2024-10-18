module.exports = (years) => {
  if (years.length < 2) return null

  const interval = [];
  for (let i = 1; i < years.length; i++) {
    const diferenca = Math.abs(years[i] - years[i - 1]);
    interval.push(diferenca);
  }

  interval.sort((a, b) => b - a)
  return interval[0];
}