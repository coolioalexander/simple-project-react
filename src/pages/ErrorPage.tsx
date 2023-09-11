import { useRouteError } from 'react-router-dom';
import Header from '../components/Header';

export default function ErrorPage() {
  const error = useRouteError();

  const isError = (error: any): error is { statusText: string } => {
    return 'statusText' in error;
  };

  return (
    <>
      <Header user={undefined} onSignIn={() => {}} loading={false} />
      <div className="text-center p-5 text-xl text-slate-900">
        <h1>Sorry, an error has occured</h1>
        {isError(error) && <p className="text-base text-slate-700">{error.statusText}</p>}
      </div>
    </>
  );
}
