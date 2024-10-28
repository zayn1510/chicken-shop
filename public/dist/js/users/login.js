import AyamaService from "../services/users/home.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    const btnDaftar = document.getElementById("btn-masuk");
    const form = document.getElementById("authForm");

    btnDaftar.addEventListener("click", e => {
        var inputdata = {};
        var isValid = true;
        // Cek apakah semua input di form sudah valid
        let firstInvalidInput = null;

        // Cek apakah semua input di form sudah valid
        form.querySelectorAll('input').forEach(input => {
            if (!input.checkValidity() && isValid) {
                isValid = false;
                firstInvalidInput = input;
            }

            input.addEventListener("input", e => {
                // Cari pesan kesalahan yang ada di parent node dari input ini
                const errorMessage = input.parentNode.querySelector(".error-message");

                // Hapus pesan kesalahan jika ada
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });


        if (firstInvalidInput) {
            // Tambah kelas 'invalid'

            // Buat elemen pesan kesalahan
            const errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            errorMessage.textContent = `${firstInvalidInput.getAttribute("name")} tidak boleh kosong`;

            // Tambahkan pesan kesalahan di bawah input
            firstInvalidInput.parentNode.appendChild(errorMessage);
            errorMessage.style.display = 'block';

            // Fokus ke input yang tidak valid
            firstInvalidInput.focus();
        } else {
            form.querySelectorAll(".auth").forEach(element => {
                inputdata[element.getAttribute("id")] = element.value;
            });

            new AyamaService($http).AuthUser(inputdata, res => {
                const { success, user, roles } = res;
                localStorage.setItem("userid", user);
                window.location = "/";

            });
        }


    });
});
