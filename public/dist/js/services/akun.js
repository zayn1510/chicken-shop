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
}

export default AkunService;
