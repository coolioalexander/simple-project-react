import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AppProvider } from './state/AppContext';

function App() {
  return (
    <div>
      <AppProvider>
        <Header />
        <Outlet />
      </AppProvider>
    </div>
  );
}

export default App;
