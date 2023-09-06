import React from 'react';
import './App.css';
import PersonScore from './PersonScore';
import Alert from './Alert';

function App() {
  return (
    <div className="container">
      <Alert heading="Success" closeable onClose={() => console.log('Closed!')}>
        Everything is really good!
      </Alert>
    </div>
  );
}

export default App;
