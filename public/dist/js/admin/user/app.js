import * as lib from "../../helpers/lib.js";
import PenggunaService from "../../services/pengguna.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {



    let id = 0;
    let itemPage = 10;
    let currentPage = 0;
    let totalDataPage = 0;
    const detailCustomerElement = document.getElementById("detail-customer");
    const tableDataElement = document.getElementById("table-data");
    const users = document.getElementsByClassName("customer");
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


    const getDataCustomers=()=>{
        new PenggunaService($http).getDataPengguna(itemPage,currentPage,res=>{
            const {data,totalPages}=res;
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
    getDataCustomers(itemPage,currentPage);

    document.addEventListener("click", (evt) => {
        const target = evt.target;
        const dataAction = target.dataset.action;
        if (dataAction === 'open-form') {
            openForm(target);
        } else if (dataAction === 'save-form') {
            saveForm(target);
        }else if (dataAction==='cancel-form') {
            detailCustomer(0,null);
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

    const generateFakePassword=(length)=> {
        const sourceString = "840328408fds0f80ds8f048304830850438504850v8sd0f8ds9f8s9d8f0ds8f9";
        let password = "";
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * sourceString.length);
            password += sourceString[randomIndex];
        }
    
        return password;
    }
    const detailCustomer=(a,data)=>{
        
        if (a==0) {
            detailCustomerElement.classList.add("hide");
            tableDataElement.classList.remove("hide");
        }else {
            detailCustomerElement.classList.remove("hide");
            tableDataElement.classList.add("hide");
        }
        let customer =document.querySelectorAll(".customer");
        customer.forEach(row=>{
           row.classList.add("font-12");
        });
        if(data){
            customer[0].value=data.name;
            customer[1].value=data.email;
            customer[2].value=data.customer.phone;
            customer[3].value=data.customer.alamat;
            customer[4].value=data.customer.postal_kode;
            customer[5].value=data.username;
            customer[6].value=generateFakePassword(32);
        }
       
    }
    $scope.editData = (row) => {
        detailCustomer(1,row);
      
    }

    $scope.hapusData = (row) => {
        const userid=row.customer.userid;
        new PenggunaService($http).deleteDataPengguna(userid, (res) => {
            const { success } = res;
            if (success) {
                swal({
                    text: "Hapus data pengguna berhasil",
                    icon: "success"
                });
                getDataCustomers();
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
