import { useEffect, useReducer, useRef, useMemo, useCallback } from 'react';
import { getPerson } from './person';
import { reducer } from './reducer';
import { Reset } from './Reset';

export default function PersonScore() {
  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const expensiveFunction = () => {
    console.log('Executing expensive function');
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
      sum += i;
    }
    return sum;
  };
  const expensiveValue = useMemo<number>(expensiveFunction, []);
  const resetCallback = useCallback(() => dispatch({ type: 'reset' }), []);

  useEffect(() => {
    const fetchPerson = async () => {
      const { name } = await getPerson();
      dispatch({ type: 'initialized', name });
    };
    fetchPerson();
  }, []);

  useEffect(() => {
    if (!loading) {
      addButtonRef.current?.focus();
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <p>{expensiveValue}</p>
      <button ref={addButtonRef} onClick={() => dispatch({ type: 'increment' })}>
        Add
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Substract</button>
      <Reset onReset={resetCallback} />
    </div>
  );
}
