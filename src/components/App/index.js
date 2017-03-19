import React from 'react';
import queryService from '../api';

import logo from '../assets/logo.svg';
import grapes from '../assets/grapes.png';

const getCurrentTabUrl = () => {
    const queryInfo = {
        active: true,
        currentWindow: true
    };

    return new Promise((resolve, reject) => {
        chrome.tabs.query(queryInfo, tabs => {
            const tab = tabs[0];
            const url = tab.url;  
            resolve(url);  
        });
    });
};

const rating = () => {
    return new Promise((resolve, reject) => {
        document.addEventListener('DOMContentLoaded', () => {
            getCurrentTabUrl().then((url) => {
                return queryService(url);
            }).then((data) => {
                console.log(data);
                resolve(data.rating);
            });
        });
    });
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            requestInFlight: false
        };
    }

    getText() {
        rating().then((rating) => {
            this.setState({
                message: rating > 50 ? 'We don\'t have enough data to verify this webpage' : 'This news is likely to be fake',
                requestInFlight: false
            });
            console.log(this.state);
        });
    }

    componentDidMount() {
        this.setState({
            message: this.state.message,
            requestInFlight: true
        });
        this.getText();
    }

    render() {
        return (
            <section>
                <img className="logo" src={logo}/>
                <h1>I heard it through the grape vine</h1>
                {
                    this.state.requestInFlight
                    ? <img src={grapes} className="grapes" />
                    : <p>{this.state.message}</p>
                }
            </section>
        );
    }
};

export default App;