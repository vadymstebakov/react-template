import React, { useRef, useEffect } from 'react';
import './App.css';
import useMediaQuery from '@hooks/useMediaQuery';
import useToggle from '@hooks/useToggle';
import useDebounce from '@hooks/useDebounce';
import List from './components/List';

function App() {
    const isMatchMaxW600 = useMediaQuery('(max-width: 600px)');
    const [isRotateLeft, toggleIsRotateLeft] = useToggle(true);
    const headerRef = useRef(null);
    const debouncedChange = useDebounce(search);

    // console.log(headerRef.current);

    useEffect(() => {
        console.log(isMatchMaxW600);
        if (isMatchMaxW600 && headerRef.current) {
            headerRef.current.style.backgroundColor = 'tomato';
        } else if (!isMatchMaxW600 && headerRef.current) {
            headerRef.current.style.backgroundColor = '#282c34';
        }
    }, [isMatchMaxW600]);

    function search(e) {
        console.log(e.target.value);
    }

    const onChange = e => {
        e.persist();
        debouncedChange(e);
    };

    return (
        <div className="App">
            <header ref={headerRef} className="App-header">
                <img
                    src="assets/images/logo512.png"
                    className={isRotateLeft ? 'App-logo' : 'App-logo-back'}
                    alt="logo"
                    onClick={toggleIsRotateLeft}
                />
                <input type="text" placeholder="Debounced input" onChange={onChange} />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
            <List />
        </div>
    );
}

export default App;
