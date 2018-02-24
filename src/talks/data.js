const talks = require('./_content/talks.json');

let groupingTalks = talks.map(talk => {
  let years = talk.places.map(place => {
    let parts = place.date.split('/');
    let thisTalk = { ...talk, place };
    return { year: parseInt(parts[2], 10), talk: thisTalk };
  });
  return years;
});

groupingTalks = [].concat.apply([], groupingTalks);

let groupedTalks = groupingTalks.reduce((acc, talkPerYear) => {
  let { year, talk } = talkPerYear;
  let talksPerYear = acc[year];
  if (!talksPerYear) {
    talksPerYear = [];
  }
  talksPerYear.push(talk);
  return {
    ...acc,
    [year]: talksPerYear
  };
}, {});

function parseDate(str) {
  let parts = str.split('/');
  let dt = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );
  return dt;
}

Object.keys(groupedTalks).forEach(year => {
  groupedTalks[year] = groupedTalks[year].sort((a, b) => {
    return (
      parseDate(b.place.date).getTime() - parseDate(a.place.date).getTime()
    );
  });
});

//console.log(groupedTalks);

const years = Object.keys(groupedTalks).sort((a, b) => b - a);

export { groupedTalks, years };
