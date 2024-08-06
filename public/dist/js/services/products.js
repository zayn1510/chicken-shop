class ProductsService {

    constructor(http) {
        this.http = http;
    }

    getAll(a, b, callback) {
        this.http({
            url: `${API_SERVICE}produk/` + a + "/" + b,
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
            url: `${API_SERVICE}produk/` + a,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    getAllByName(a, b, c, callback) {
        this.http({
            url: `${API_SERVICE}produk/` + a + "/" + b + "/" + c,
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
            url: `${API_SERVICE}produk`,
            method: "POST",
            data: obj,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': undefined
            }
        })
            .then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    update(obj, callback) {
        this.http({
            url: `${API_SERVICE}produk/update`,
            method: "POST",
            data: obj,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': undefined
            }
        })
            .then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    delete(a, callback) {
        this.http({
            url: `${API_SERVICE}suplier/` + a,
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

export default ProductsService;