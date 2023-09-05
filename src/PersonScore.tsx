import { useEffect, useReducer } from 'react';
import { getPerson } from './person';
import { reducer } from './reducer';

export default function PersonScore() {
  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchPerson = async () => {
      const { name } = await getPerson();
      dispatch({ type: 'initialized', name });
    };
    fetchPerson();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <button onClick={() => dispatch({ type: 'increment' })}>Add</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Substract</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
