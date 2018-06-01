let axios = require('axios');

class RequestManager {
    intanceRequests() {
        return axios.create({
            baseURL: 'https://beta.todoist.com/API/v8',
            headers: {
                'Authorization': 'Bearer ea8c82aa2deaed6de59d372d0e25ac05e09697c2'
            }
        });
    }

    getResponse() {
        let instance =  axios.create({
            baseURL: 'https://beta.todoist.com/API/v8',
            headers: {
                'Authorization': 'Bearer ea8c82aa2deaed6de59d372d0e25ac05e09697c2'
            }
        });
        return instance
            .get('/projects')
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}

module.exports = new RequestManager();
