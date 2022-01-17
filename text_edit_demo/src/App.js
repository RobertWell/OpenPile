import logo from './logo.svg';
import './App.css';
import SlateEditor from './components/SlateEditor'
import DraftEditor from './components/DraftEditor';
function App() {
  return (
    <div className="App">
      <DraftEditor />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
