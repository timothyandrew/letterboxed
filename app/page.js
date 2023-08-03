'use client'

import { loadDictionary } from '@/lib/dictionary';
import findOrder from '@/lib/order';
import solve from '@/lib/solve';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Letters from './letters';
import Spinner from './spinner';

function validateSides(sides) {
  return _.isArray(sides) && sides.length === 4 && sides.every(s => s.length === 3);
}

export default function Home() {
  const [result, setResult] = useState();
  const [sides, setSides] = useState();


  useEffect(() => {
    let fn = async () => {
      if (!validateSides(sides)) {
        return;
      }

      const dictionary = await loadDictionary();
      let solved = solve(sides, dictionary);
      setResult(findOrder(solved));
    }

    fn();
  }, [sides]);

  return (
    <div>
      <Letters setSides={setSides} sides={sides} />

      {result 
        ? <>
          Found {result.length} words
          <ul>
            {result.map(run => <li key={run}>
              {run.join(" → ")}
            </li>)}
          </ul>
        </>
      : (validateSides(sides)
        ? <Spinner />
        : <div>Enter 12 characters</div>)}
    </div>
  )
}
