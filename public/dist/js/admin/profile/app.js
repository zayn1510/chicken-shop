import * as lib from "../../helpers/lib.js";
import AkunService from "../../services/akun.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {


    const profiles = document.querySelectorAll(".profiles");


    document.addEventListener("click", e => {
        let formdata = new FormData();
        const dataaction = e.target.getAttribute("data-action");
        if (dataaction === 'perbarui-profil-website') {

            profiles.forEach(element => {
                const id = element.getAttribute("id");
                formdata.append(id, element.value);
            });
            const logo = document.getElementById("logo");
            const image=document.getElementById("image");
            if (logo.files.length > 0) {
                formdata.append("logo", logo.files[0]);
            }
            if (image.files.length > 0) {
                formdata.append("image", image.files[0]);
            }
            
            new AkunService($http).UpdateWebsite(formdata, res => {

            });
        }

    });
});
