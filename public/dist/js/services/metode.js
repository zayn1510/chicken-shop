class MetodeService {
    constructor(http) {
        this.http = http;
    }

    getDataMetode(a, b, callback) {
        this.http({
            url: `${API_SERVICE}metode/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }
    createDataMetode(data, callback) {
        this.http({
            url: `${API_SERVICE}metode`,
            method: "POST",
            data: data,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }
    updateDataMetode(data, id, callback) {
        this.http({
            url: `${API_SERVICE}metode/` + id,
            method: "PUT",
            data: data,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }
    detailDataMetode(a, callback) {
        this.http({
            url: `${API_SERVICE}metode/` + a,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    deleteDataMetode(a, callback) {
        this.http({
            url: `${API_SERVICE}metode/` + a,
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
}

export default MetodeService;
