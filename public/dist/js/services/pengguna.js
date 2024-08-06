class PenggunaService {
    constructor(http) {
        this.http = http;
    }

    getDataPengguna(a, b, callback) {
        this.http({
            url: `${API_SERVICE}users/` + a + "/" + b,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }

    createPengguna(data, callback) {
        this.http({
            url: `${API_SERVICE}auth/user`,
            method: "POST",
            data: data,
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    }
    filterDataPengguna(a, b, c, d, callback) {
        this.http({
            url: `${API_SERVICE}users/` + a + "/" + b + "/" + c + "/" + d,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }
    deleteDataPengguna(a, callback) {
        this.http({
            url: `${API_SERVICE}users/` + a,
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

export default PenggunaService;
