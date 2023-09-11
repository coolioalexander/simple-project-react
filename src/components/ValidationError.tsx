import { FieldError } from 'react-hook-form';

type Props = {
  fieldError: FieldError | undefined;
};

export default function ValidationError({ fieldError }: Props) {
  if (!fieldError) {
    return null;
  }
  return <span className="text-xs text-red-500 mt-1">{fieldError.message}</span>;
}
