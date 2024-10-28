class TransaksiiService {
    constructor(http) {
        this.http = http;
    }

    getDataTransaksi(a, b, callback) {
        this.http({
            url: `${API_SERVICE}transaksi-pembayaran/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }
    updateStatusFotoPembayaran(a, b, callback) {
        this.http({
            url: `${API_SERVICE}update-konfirmasi-pembayaran/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    updateStatusTransaksi(a, b, callback) {
        this.http({
            url: `${API_SERVICE}update-status-transaksi/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    detailDataTransaksi(a,b,callback) {
        this.http({
            url: `${API_SERVICE}detail-transaksi/` + a+"/"+b ,
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

export default TransaksiiService;
