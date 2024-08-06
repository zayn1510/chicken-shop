class loginService {
    constructor(http) {
        this.http = http;
    }

    login(data, callback) {
        this.http({
            url: `${API}login`,
            method: "POST",
            data: data,
        }).then(e => callback(e.data))
            .catch(err => {
                callback(err);
            })
    };
}

export default loginService;
