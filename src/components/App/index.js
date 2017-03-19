import React from 'react';
import queryService from '../api';

import logo from '../assets/logo.svg';

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
            message: ''
        };
    }

    getText() {
        rating().then((rating) => {
            this.setState({
                message: rating > 50 ? 'We can\'t find anything wrong with this webapage' : 'This news is likely fake'
            });
            console.log(this.state);
        });
    }

    componentDidMount() {
        this.getText();
    }

    render() {
        return (
            <section>
                <img className="logo" src={logo}/>
                <h1>I heard it through the grape vine</h1>
                <p>{this.state.message}</p>
            </section>
        );
    }
};

export default App;