import * as lib from "../../helpers/lib.js";
import loginService from "../../services/login.js";


var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {


    const column = [
        "username",
        "password"
    ];

    const elementForm = $(".user");
    elementForm.each((index, element) => {
        const attribut = column[index];
        lib.createElement(element, attribut);
    })

    $scope.getType = (event) => {
        const value = event.target.value;
        const element = event.target;
        if (value === '') {
            $(element).removeClass("error");
        }
    }
    $scope.masuk = () => {
        let check = true;
        let dataJson = {};
        const elementForm = $(".user");
        elementForm.each((index, element) => {
            const value = $(element).val();
            const key = $(element).attr("id");

            dataJson[key] = value;
            if (value === '') {
                swal({
                    text: key + " tidak boleh kosong",
                    icon: "warning"
                });
                $(element).addClass("error");
                check = false;
                return false;
            }
        })
        if (check) {

            new loginService($http).login(dataJson, (res) => {
                const { status } = res;
                if (status) {
                    swal({
                        text: "Login Success",
                        icon: "success"
                    });
                    window.location.href = "../dashboard";
                    return;
                }
                swal({
                    text: "Login Gagal",
                    icon: "error"
                });

            });
        }
    }
});
