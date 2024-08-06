class PenawaranService {
    constructor(http) {
        this.http = http;
    }

    filterProduk(a, b, c, d, callback) {
        this.http({
            url: `${API}produk/` + a + "/" + b + "/" + c + "/" + d,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }

    penawaranById(a, b, c, callback) {
        this.http({
            url: `${API}penawar/` + a + "/" + b + "/" + c,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }


}

export default PenawaranService;
