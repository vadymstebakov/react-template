import React from 'react';
import './App.css';
import useMediaQuery from '@hooks/useMediaQuery';
import axios from '@axios';

function App() {
    console.dir(axios);
    const mq = useMediaQuery('(max-width: 600px)');
    const isEnd = mq ? 'It matches!' : 'No match (yet)';
    // console.log(isEnd);
    React.useEffect(() => {
        if (isEnd === 'It matches!') {
            console.log(isEnd);
        }

        return () => {
            console.log('unmount');
        };
    }, [isEnd]);
    return (
        <div className="App">
            <header className="App-header">
                <img src="assets/images/logo512.png" className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
