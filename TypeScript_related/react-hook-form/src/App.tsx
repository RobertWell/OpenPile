import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form1 from './components/Form1';
import FormProviderPage from './components/FormProviderPage';
function App() {
  return (
    <div className="App">
      <Form1 />
      <FormProviderPage />
      {/* <Banner /> */}
    </div>
  );
}

export default App;
