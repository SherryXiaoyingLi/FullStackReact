import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi there
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a href="/auth/google">Sign In With Google</a>
        {/* if put relative path here, before the path domain will be same as current server's (only problem in development env, in prod env relative path will be put to the right one) e.g. localhost:3000, not localhost:5000 */}
        {/* if absolute path, can't change b/w localhost and heroku's prod url */}
        {/* also want frontend devloper not have to worry about these */}
        {/* but added src/setupProxy.js even tho when hover over link still localhost:3000/auth/google (wrong) but actually proxy worked and will go to auth flow*/}
        {/* but then when google callback, password strategy will try go to localhost:3000/auth/google/callback but google API does not recognize (notice a problem only for development env, in prod env create-react-app doesnt even exists) so should upd on google console to make it valid redirect */}
      </header>
    </div>
  );
}

export default App;
