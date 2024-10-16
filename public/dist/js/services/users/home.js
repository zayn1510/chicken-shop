class AyamaService {
    constructor(http) {
        this.http = http;
    }

    getDataAyam(a, b, callback) {
        this.http({
            url: `${API_SERVICE}jenis/` + a + "/" + b,
            method: "GET",

        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    createCustomers(data, callback) {
        this.http({
            url: `${API_SERVICE}customers`,
            method: "POST",
            data: data

        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    orderProducts(data, callback) {
        this.http({
            url: `${API_SERVICE}orders-user`,
            method: "POST",
            data: data

        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    AuthUser(data, callback) {
        this.http({
            url: `${API_SERVICE}authuser`,
            method: "POST",
            data: data

        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

}

export default AyamaService;
