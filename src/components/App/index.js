import React from 'react';
import queryService from '../api';

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
            this.setState({message: rating});
        });
    }

    componentDidMount() {
        this.getText();
    }

    render() {
        return (
            <h1>I heard through the grape vine this article {this.state.message}</h1>
        );
    }
};

export default App;