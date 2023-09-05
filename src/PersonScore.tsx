import { useEffect, useState } from 'react';
import { getPerson } from './person';

export default function PersonScore() {
  const [name, setName] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      const person = await getPerson();
      setLoading(false);
      setName(person.name);
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
      <button onClick={() => setScore(score + 1)}>Add</button>
      <button onClick={() => setScore(score - 1)}>Substract</button>
      <button onClick={() => setScore(0)}>Reset</button>
    </div>
  );
}
