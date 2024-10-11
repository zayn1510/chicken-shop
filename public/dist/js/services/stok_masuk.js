class StokService {
    constructor(http) {
        this.http = http;
    }

    getDataStok(a, b, c, callback) {
        this.http({
            url: `${API_SERVICE}stok_masuk/` + a + "/" + b + "/" + c,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    getDataStokBy(a, b, c, callback) {
        this.http({
            url: `${API_SERVICE}stok_masuk_by/` + a + "/" + b + "/" + c,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    createDataStok(data, callback) {
        this.http({
            url: `${API_SERVICE}stok_masuk`,
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
    updateDataStok(data, id, callback) {
        this.http({
            url: `${API_SERVICE}stok_masuk/` + id,
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
    detailDataStok(a, callback) {
        this.http({
            url: `${API_SERVICE}stok_masuk/` + a,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    deleteDataStok(a, callback) {
        this.http({
            url: `${API_SERVICE}stok_masuk/` + a,
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

export default StokService;
