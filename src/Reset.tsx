import { memo } from 'react';

type Props = {
  onReset: () => void;
};

export const Reset = memo(({ onReset }: Props) => {
  console.log('Reseting...');
  return <button onClick={onReset}>Reset</button>;
});

Reset.displayName = 'Reset';
