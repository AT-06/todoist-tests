let axios = require('axios');

class RequestManager {
    intanceRequests() {
        return axios.create({
            baseURL: 'https://beta.todoist.com/API/v8',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ea8c82aa2deaed6de59d372d0e25ac05e09697c2'
            }
        });
    }

    getResponse() {
        this.intanceRequests()
            .get('/projects')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

module.exports = new RequestManager();
