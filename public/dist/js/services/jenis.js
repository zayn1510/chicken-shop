class JenisService {
    constructor(http) {
        this.http = http;
    }

    getDataJenis(a, b, callback) {
        this.http({
            url: `${API_SERVICE}jenis/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    filterDataJenis(a, b, c, callback) {
        this.http({
            url: `${API_SERVICE}jenis/` + a + "/" + b + "/" + c,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken 
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    createDataJenis(data, callback) {
        this.http({
            url: `${API_SERVICE}jenis`,
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
    updateDataJenis(data, id, callback) {
        this.http({
            url: `${API_SERVICE}jenis/` + id,
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
    detailDataJenis(a, callback) {
        this.http({
            url: `${API_SERVICE}jenis/` + a,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    deleteDataJenis(a, callback) {
        this.http({
            url: `${API_SERVICE}jenis/` + a,
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

export default JenisService;
