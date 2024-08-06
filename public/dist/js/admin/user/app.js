import * as lib from "../../helpers/lib.js";
import PenggunaService from "../../services/pengguna.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {



    let id = 0;
    let itemPage = 10;
    let currentPage = 0;
    let totalDataPage = 0;
    const detailUserElement = document.getElementById("detail-user");
    const tableDataElement = document.getElementById("table-data");
    const users = document.getElementsByClassName("users");
    const openformElement = document.getElementById("open-form");
    const cancelElement = document.getElementById("cancel");
    let lastPage = 0;
    const messages = [
        "First name is required.",
        "Last name is required.",
        "Please enter a valid email address.",
        "Phone number is required.",
        "Address is required.",
        "Username is required.",
        "Password is required.",
        "Please select a role."
    ];

    const tbody = document.querySelector("tbody");
    $scope.aksi = true;


    const elementAnggota = $(".anggota");

    $(elementAnggota).each((index, element) => {
        const label = $(element).prev('label');
        label.attr("for", column[index]);
        $(element).attr("id", column[index]);
        $(element).attr("name", column[index]);
    });

    // variabel handle pagination
    let prevnextPage = 0;
    var btnPrev = document.getElementById("prevPage");
    var btnNext = document.getElementById("nextPage");


    const itemPageelement = document.getElementById("itemPage");
    itemPageelement.addEventListener("change", (event) => {
        itemPage = $(event.target).val();
        $scope.get_data_pengguna(itemPage, currentPage, 0);

    })

    const searchElement = document.getElementById("search");
    searchElement.addEventListener("input", (event) => {

        const filter = document.getElementById("filter");
        const searchData = $(event.target).val()
        if (searchData !== '') {
            new PenggunaService($http).filterDataPengguna(filter.value, searchData,
                itemPage, currentPage, res => {
                    const { data, totalPages } = res;
                    $scope.pengguna = data;
                    const pageElement = document.getElementsByClassName("pages");
                    $(pageElement).empty();
                    lib.initPagination(totalPages, null);
                });
            return;
        }
        $scope.get_data_pengguna(itemPage, currentPage, 0);
    })


    btnNext.addEventListener("click", (evt) => {
        if (currentPage == 0 || currentPage == 1) {
            currentPage = 1;
        }
        else {
            currentPage += 1;
        }
        checkPageActive();
    })

    const checkPageActive = () => {
        const pageActive = document.querySelector(".active-pagination")
        pageActive.classList.remove("active-pagination");
        const pageNumber = document.getElementsByClassName("page-number");
        pageNumber[currentPage].classList.add("active-pagination");
        if (currentPage === 0) {
            btnPrev.setAttribute("disabled", true);
        } else if (currentPage > 0) {
            btnPrev.removeAttribute("disabled");
        }
        new PenggunaService($http).getDataPengguna(currentPage, itemPage, res => {
            $scope.pengguna = res.data;
        });
    }

    btnPrev.addEventListener("click", (evt) => {
        if (currentPage == 0 || currentPage == 1 || currentPage < 0) {
            currentPage = 1;
            btnPrev.setAttribute("disabled", true);
        }

        currentPage -= 1;
        checkPageActive();
    })

    if (prevnextPage == 0) {
        $(btnPrev).attr("disabled", true);
    }


    $scope.get_data_pengguna = (a, b) => {
        new PenggunaService($http).getDataPengguna(a, b, res => {
            const { data, totalPages } = res;
            totalDataPage = totalPages
            $scope.pengguna = data;
            $(tbody).show();
            lib.initPagination(totalPages, null);
            const pageNumber = document.querySelectorAll(".page-number");
            pageNumber.forEach(element => {
                element.addEventListener("click", (evt) => {
                    currentPage = element.textContent - 1;
                    checkPageActive();
                });
            });
        });
    }

    $scope.get_data_pengguna(currentPage, itemPage);

    document.addEventListener("click", (evt) => {
        const target = evt.target;
        const dataAction = target.dataset.action;
        if (dataAction === 'open-form') {
            openForm(target);
        } else if (dataAction === 'save-form') {
            saveForm(target);
        }
    });

    const changeBorder = () => {
        const usersChange = document.querySelectorAll('.users');
        usersChange.forEach(userContainter => {
            userContainter.addEventListener("input", res => {
                const target = res.target;
                const value = target.value;
                userContainter.classList.remove("error-border")
                if (value !== '') {
                    const errorMessageElement = userContainter.nextElementSibling;
                    if (errorMessageElement) {
                        errorMessageElement.remove();
                    }
                }
            });
        });
    }
    changeBorder();

    const validationForm = (users) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const errorMessage = document.createElement('p');
        for (let i = 0; i < users.length; i++) {

            if (users[i].value === "" || users[i].value == null) { // Check for empty or null values
                users[i].classList.add("error-border")
                errorMessage.textContent = messages[i];
                errorMessage.classList.add("text-red");
                users[i].parentNode.insertBefore(errorMessage, users[i].nextSibling); // Insert after the input
                return false;
            } else {
                errorMessage.classList.remove("text-red");
            }
        }

        if (!emailPattern.test(users[2].value)) {
            users[2].classList.add("error-border");
            errorMessage.textContent = messages[2];
            errorMessage.classList.add("text-red");
            users[2].parentNode.insertBefore(errorMessage, users[2].nextSibling); // Insert after the input
            return false;
        }

        return true;
    }
    const saveForm = (evt) => {
        const json = {
            "firstname": users[0].value,
            "lastname": users[1].value,
            "email": users[2].value,
            "phone": users[3].value,
            "adress": users[4].value,
            "username": users[5].value,
            "password": users[6].value,
            "role": parseInt(users[7].value)
        }
        if (!validationForm(users)) {
            return;
        }
        new PenggunaService($http).createPengguna(json, (res) => {
            const success = res.success;
            if (!success) {
                swal({
                    text: "Simpan data gagal !",
                    icon: "error"
                });
                return;
            }
            showHideElement("hide", "show");
            $scope.get_data_pengguna(itemPage, currentPage, 0);

        });
    }
    const openForm = (evt) => {
        showHideElement("show", "hide");
        for (var index = 0; index < users.length; index++) {
            users[index].removeAttribute("disabled");
            users[index].classList.remove("error-border");
            const parag = users[index].nextElementSibling;
            if (parag) {
                parag.remove();
            }
            users[index].value = "";
        }
    }

    const showHideElement = (a, b) => {
        detailUserElement.classList.add(a)
        detailUserElement.classList.remove(b);
        tableDataElement.classList.remove(a);
        tableDataElement.classList.add(b);
        openformElement.classList.remove(a);
        openformElement.classList.add(b);
    }
    $scope.editData = (row) => {
        showHideElement("show", "hide");
        users[0].value = row.firstname;
        users[1].value = row.lastname;
        users[2].value = row.email;
        users[3].value = row.phone;
        users[4].value = row.adress;
        users[5].value = row.username;
        users[6].value = "djalsjdlsajdlasjdlasjdlasueiwur439850943850943850934859";
        let roles = 0;
        if (row.roles === 'CUSTOMER') {
            roles = 2;
        } else if (row.roles === 'KASIR') {
            roles = 1;
        }
        users[7].value = roles;
    }

    $scope.hapusData = (id_user) => {
        new PenggunaService($http).deleteDataPengguna(id_user, (res) => {
            const { success } = res;
            if (success) {
                swal({
                    text: "Hapus data pengguna berhasil",
                    icon: "success"
                });
                currentPage = 10;
                $scope.get_data_pengguna(itemPage, currentPage, 0);
                return;
            }
            swal({
                text: "Hapus data pengguna gagal",
                icon: "error"
            });
        })
    }

    $scope.batal = () => {
        showHideElement("hide", "show");
    }

    $scope.updateStatus = (status, id) => {
        new PenggunaService($http).updateStatus(status, id, (res) => {
            const { success } = res;
            if (success) {
                swal({
                    text: "Update status akun pengguna berhasil",
                    icon: "success"
                });
                currentPage = 0;
                $scope.get_data_pengguna(itemPage, currentPage, 0);
                $scope.clearText();
                return;
            }
            swal({
                text: "Update status akun pengguna gagal",
                icon: "error"
            });
        })
    }



});
