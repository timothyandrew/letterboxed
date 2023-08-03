import { loadDictionary } from '@/lib/dictionary';
import findOrder from '@/lib/order';
import solve from '@/lib/solve';
import _ from 'lodash';

export default async function Home() {
  const dictionary = await loadDictionary();
  const sides = [
    ['A', 'I', 'G'],
    ['E', 'Y', 'S'],
    ['Q', 'W', 'R'],
    ['N', 'L', 'U'],
  ]

  let solved = solve(sides, dictionary);
  let ordered = findOrder(solved);

  return (
    <div>
      Found {ordered.length} words
      <ul>
        {ordered.map(run => <li key={run}>
          {run.join(" → ")}
        </li>)}
      </ul>
    </div>
  )
}
