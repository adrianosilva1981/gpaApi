module.exports = (prizes) => {
  return prizes.map(el => ({
    ...el,
    years: el.years.split(',')
  }))
}