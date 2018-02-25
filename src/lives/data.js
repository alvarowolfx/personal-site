const lives = require('./_content/lives.json');

let groupedLives = lives.reduce(
  (acc, live) => {
    const liveTime = new Date(live.start).getTime();
    const now = new Date().getTime();
    live.isPast = now > liveTime;
    const key = live.isPast ? 'past' : 'due';

    let livesPerGroup = acc[key];
    livesPerGroup.push(live);

    return {
      ...acc,
      [key]: livesPerGroup
    };
  },
  { due: [], past: [] }
);

export { groupedLives };
