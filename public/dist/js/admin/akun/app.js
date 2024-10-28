import * as lib from "../../helpers/lib.js";
import AkunService from "../../services/akun.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    const id_user = document.getElementById("id_user");
    document.addEventListener("click", evt => {
        const dataaction = evt.target.getAttribute("data-action");

        if (dataaction === 'perbarui-akun') {
            const data = {
                password: document.getElementById("old").value,
                id: id_user.value
            }
            var span = document.createElement("span");
            span.id = "message-error";
            span.classList.remove("hide");
            if (document.getElementById("old").value.length === 0) {
                document.getElementById("old").classList.add("error");

                span.textContent = "Masukan kata sandi dulu sebelum update akun";
                span.classList.add("color-red");
                document.getElementById("old").insertAdjacentElement("afterend", span);
                return;
            }
            new AkunService($http).checkPassword(data, res => {
                const { success } = res;
                if (!success) {
                    document.getElementById("old").classList.add("error");
                    span.textContent = "Kata sandi masih salah !";
                    span.classList.add("color-red");
                    document.getElementById("old").insertAdjacentElement("afterend", span);
                    return;
                }
            });
            const dataupdate = {
                username: document.getElementById("username").value,
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                passowrd: document.getElementById("password").value
            }
            new AkunService($http).updateAkunAdmin(dataupdate, res => {
                const { success } = res;
                if (success) {
                    window.location.href = "../admin/login";
                }
            });
        }

    });
    document.addEventListener("input", evt => {
        const dataaction = evt.target.getAttribute("data-action");
        if (dataaction === 'oldpassword') {
            document.getElementById("old").classList.remove("error");
            document.getElementById("message-error").classList.add("hide");

        }
    })
});
