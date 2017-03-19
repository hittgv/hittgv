import axios from 'axios';

const queryService = url => {
    const urlEncoded = encodeURIComponent(url);
    
    return new Promise((resolve, reject) => {
        axios
            .get(`https://query-service.herokuapp.com/rating?url=${urlEncoded}`)
            .then((res) => {
                resolve(res.data);
            });
    });
};

export default queryService;