class BankService {
    constructor(http) {
        this.http = http;
    }

    getDataBank(a, b, callback) {
        this.http({
            url: `${API_SERVICE}bank/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }
    createDataBank(data, callback) {
        this.http({
            url: `${API_SERVICE}bank`,
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
    updateDataBank(data, id, callback) {
        this.http({
            url: `${API_SERVICE}bank/` + id,
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
    detailDataBank(a, callback) {
        this.http({
            url: `${API_SERVICE}bank/` + a,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    deleteDataBank(a, callback) {
        this.http({
            url: `${API_SERVICE}bank/` + a,
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

export default BankService;
