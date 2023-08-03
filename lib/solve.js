import _ from "lodash";

function solveImpl(sides, dictionary, prefix, disallowed) {
  return sides.flatMap((side, i) => {
    if (i === disallowed) {
      return [];
    } else {
      return side.flatMap((letter) => {
        let word = prefix + letter;
        let ret = [];
        let {hasPrefix, hasWord} = dictionary.queryPrefix(word);

        if (hasWord) {
          ret = [...ret, word];
        }

        if (hasPrefix) {
          ret = [...ret, ...solveImpl(sides, dictionary, word, i)];
        }

        return ret;
      })
    }
  })
}

export default function solve(sides, dictionary) {
  const ret = solveImpl(sides, dictionary, '', null, '');
  return _.sortBy(ret, w => -w.length);
}