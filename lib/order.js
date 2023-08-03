import _ from "lodash";

const MAX_RUN = 2;

function uniqueLetters(words) {
  return _.uniq(words.join('').split(''));
}

function findOrderImpl(solved, memo, byStartingLetter) {
  if (uniqueLetters(memo).length >= 12) {
    console.log("FOUND", memo)
    return [memo];
  }

  if (memo.length >= MAX_RUN) {
    return [];
  }

  let letter = _.last(_.last(memo));
  let candidates = byStartingLetter[letter];

  if (!candidates) {
    return [];
  }

  return candidates.flatMap(w => {
    if (memo.includes(w)) {
      return [];
    }

    return findOrderImpl(solved, [...memo, w], byStartingLetter);
  })
}

export default function findOrder(solved) {
  const byStartingLetter = _.groupBy(solved, w => w[0]);

  let ret = solved.flatMap(w => findOrderImpl(solved, [w], byStartingLetter));
  console.log("FOUND", ret.length);
  return ret;
}