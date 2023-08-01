import axios from "axios";

export class Dictionary {
  constructor() {
    this.root = {
      children: {},
      terminal: false,
    }
  }

  addWord(word) {
    let current = this.root;

    for (let c of word.toLowerCase()) {
      current.children[c] ||= {children: {}, terminal: false};
      current = current.children[c];
    }

    current.terminal = true;
  }

  queryPrefix(word) {
    let current = this.root;

    for (let c of word.toLowerCase()) {
      current = current.children[c];

      if (!current) {
        return {hasPrefix: false, hasWord: false};
      }
    }

    return {hasPrefix: !!current, hasWord: current && current.terminal};
  }

  hasWord(word) {
    let current = this.root;

    for (let c of word.toLowerCase()) {
      current = current.children[c];

      if (!current) {
        return false;
      }
    }

    return current && current.terminal;
  }
}

export async function loadDictionary() {
  const dictionary = new Dictionary();

  const url = 'https://raw.githubusercontent.com/timothyandrew/bee/master/search/rawdict.txt';
  const response = await axios.get(url);

  const words = response.data.split('\n');

  for (let word of words) {
    dictionary.addWord(word.toLowerCase());
  }

  return dictionary;
}