import React from 'react';

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    componentDidMount() {
        const updateCounter = () => {
            this.setState(state => ({
                counter: state.counter + 1
            }));
            this.lastTimeout = setTimeout(updateCounter, 1000);
        };
        updateCounter();
    }

    componentWillUnmount() {
        clearTimeout(this.lastTimeout);
    }

    render() {

        return this.state.counter;
    }
}