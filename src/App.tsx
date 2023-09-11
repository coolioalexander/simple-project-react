import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div>
      <>
        <Header user={{ id: '1', name: 'John Doe' }} onSignIn={() => {}} loading={false} />
        <Outlet />
      </>
    </div>
  );
}

export default App;
