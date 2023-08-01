import { loadDictionary } from '@/lib/dictionary';
import solve from '@/lib/solve';

export default async function Home() {
  const dictionary = await loadDictionary();
  const sides = [
    ['S', 'U', 'P'],
    ['O', 'A', 'M'],
    ['N', 'R', 'Y'],
    ['C', 'T', 'I'],
  ]

  const solved = solve(sides, dictionary);

  return (
    <div>
      HELLO
      <ul>
        {solved.map(w => <li key={w}>
          {w.word}
          {w.uniq.length}
        </li>)}
      </ul>
    </div>
  )
}
