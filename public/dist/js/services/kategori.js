class KategoriService {
    constructor(http) {
        this.http = http;
    }

    getAll(a, b, callback) {
        this.http({
            url: `${API_SERVICE}kategori/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    getAllById(a,callback) {
        this.http({
            url: `${API_SERVICE}kategori/` + a,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }


    filterCategoryByName(a, b, c, callback) {
        this.http({
            url: `${API_SERVICE}kategori/` + a + "/" + b + "/" + c,
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
            url: `${API_SERVICE}kategori`,
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
            url: `${API_SERVICE}kategori/ ` + id,
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
            url: `${API_SERVICE}kategori/` + a,
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

export default KategoriService;
