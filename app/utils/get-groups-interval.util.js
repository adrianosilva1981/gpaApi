module.exports = (movies) => {
  const group = {};

  movies.forEach(movie => {
    const year = parseInt(movie.year);
    movie.producers.forEach(producer => {
      if (!group[producer]) {
        group[producer] = [];
      }
      group[producer].push(year);
    });
  });

  return group
}