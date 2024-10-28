class AkunService {
    constructor(http) {
        this.http = http;
    }

    update(obj, id, callback) {
        this.http({
            url: `${API}admin-update/ ` + id,
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

    checkPassword(obj, callback) {
        this.http({
            url: `../${API}checkpassword/ `,
            method: "POST",
            data: obj,
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        })
            .then(e => callback(e.data))
            .catch(err => {
                callback(err.status);
            });
    }
    updateAkunAdmin(obj, callback) {
        this.http({
            url: `../${API}update-admin/ `,
            method: "POST",
            data: obj,
            headers: {
                'Authorization': 'Bearer ' + accessToken // Attach the access token as a Bearer token
            }
        })
            .then(e => callback(e.data))
            .catch(err => {
                callback(err.status);
            });
    }

    UpdateWebsite(data, callback) {
        this.http({
            url: `${API_SERVICE}update-profil-website`,
            method: "POST",
            data: data,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': undefined
            }
        }).then(e => callback(e.data))
            .catch(err => {
                console.error(err);
            });
    }

}

export default AkunService;
