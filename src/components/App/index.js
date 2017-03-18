import React from 'react';
import axios from 'axios';

const queryService = url => {
    axios
        .get(`/rating?url${url}`)
        .then((res) => {
            return res.data;
        });
};

const rating = () => {
    const getCurrentTabUrl = callback => {
        const queryInfo = {
            active: true,
            currentWindow: true
        };

        chrome.tabs.query(queryInfo, tabs => {
            const tab = tabs[0];
            const url = tab.url;
            return url;
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        return queryService(getCurrentTabUrl());
    });
};

const displayText = rating() == 1 ? 'is reliable' : 'is not reliable';

const App = () => {
    return (
        <h1>I heard through the grape vine this article {displayText}</h1>
    );
};

export default App;