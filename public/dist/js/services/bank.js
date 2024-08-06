class BankService {
    constructor(http) {
        this.http = http;
    }

    getAll(a, b, callback) {
        this.http({
            url: `${API}bank/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    filterDataByColumn(a, b, c, d, callback) {
        this.http({
            url: `${API}bank/` + a + "/" + b + "/" + c + "/" + d,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }


    create(obj, callback) {
        this.http({
            url: `${API}bank`,
            method: "POST",
            data: obj,
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        })
            .then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    update(obj, id, callback) {
        this.http({
            url: `${API}bank/ ` + id,
            method: "PUT",
            data: obj,
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        })
            .then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    delete(a, callback) {
        this.http({
            url: `${API}bank/` + a,
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
}

export default BankService
