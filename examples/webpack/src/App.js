import React from 'react';
import Counter from './Counter';

export default class App extends React.Component {
    render() {
        return (
            <h1>
                Counters: <Counter />
            </h1>
        );
    }
}
