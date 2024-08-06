class SatuanService {
    constructor(http) {
        this.http = http;
    }

    getAll(a, b, callback) {
        this.http({
            url: `${API_SERVICE}satuan/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    getAllById(a, callback) {
        this.http({
            url: `${API_SERVICE}satuan/` + a,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    create(obj, callback) {
        this.http({
            url: `${API_SERVICE}satuan`,
            method: "POST",
            data: obj,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    update(obj, id, callback) {
        this.http({
            url: `${API_SERVICE}satuan/ ` + id,
            method: "PUT",
            data: obj,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    delete(a, callback) {
        this.http({
            url: `${API_SERVICE}satuan/` + a,
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

export default SatuanService;
