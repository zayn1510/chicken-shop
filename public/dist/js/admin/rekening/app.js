import * as lib from "../../helpers/lib.js";
import RekeningService from "../../services/rekening.js"
import BankService from "../../services/bank.js"

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    const colomn = [
        "id_bank",
        "nomor_rekening",
        "nama_rekening"
    ];

    let id = 0;
    let itemPage = 10;
    let currentPage = 0;
    let lastPage = 0;

    var totalDataPage = 0;

    const tbody = document.querySelector("tbody");
    $scope.aksi = true;


    const elementBank = $(".rekening");

    // variabel handle pagination
    let prevnextPage = 0;
    var btnPrev = document.getElementById("prevPage");
    var btnNext = document.getElementById("nextPage");


    const itemPageelement = document.getElementById("itemPage");
    itemPageelement.addEventListener("change", (event) => {
        itemPage = $(event.target).val();
        $scope.get_data_rekening(itemPage, currentPage, 0);

    })

    const searchElement = document.getElementById("search");
    searchElement.addEventListener("input", (event) => {

        const filter = document.getElementById("filter");
        const searchData = $(event.target).val()
        if (searchData !== '') {
            new RekeningService($http).filterDataByColumn(itemPage,
                currentPage, $(filter).val(), searchData, res => {
                    const { data, totalPages } = res;
                    $scope.rekening = data;
                    const pageElement = document.getElementsByClassName("pages");
                    $(pageElement).empty();
                    lib.initPagination(totalPages, null);
                });
        }
    })

    $scope.get_data_bank = () => {
        new BankService($http).getAll(100, 0, res => {
            const { data } = res;
            $scope.bank = data;
        })
    }

    $scope.get_data_bank();

    btnNext.addEventListener("click", (evt) => {
        if (currentPage == 0 || currentPage == 1) {
            currentPage = 1;
        }
        currentPage += 1;
        lastPage = currentPage;
        if (lastPage == currentPage) {
            $(btnNext).attr("disabled", true);
        }
        $(btnPrev).removeAttr("disabled");
        $scope.get_data_rekening(itemPage, currentPage, 1);


    })

    btnPrev.addEventListener("click", (evt) => {
        if (currentPage == 0 || currentPage == 1 || currentPage < 0) {
            currentPage = 1;
        }
        currentPage -= 1;
        $scope.get_data_rekening(itemPage, currentPage, 1);
    })

    if (prevnextPage == 0) {
        $(btnPrev).attr("disabled", true);
    }


    $scope.get_data_rekening = (a, b, c) => {
        new RekeningService($http).getAll(a, b, res => {
            const { data, totalPages } = res;
            totalDataPage = totalPages
            $scope.rekening = data;
            $(tbody).show();

            if (c == 0) {
                const elementPagination = lib.initPagination(totalPages, null);
                const pageNumberElement = $(elementPagination).find(".page-number");


                if (pageNumberElement.length == 1) {
                    $(btnNext).attr("disabled", true);
                } else {
                    $(btnNext).removeAttr("disabled");
                }
                $(pageNumberElement).on("click", (evt) => {
                    prevnextPage = currentPage;
                    currentPage = parseInt($(evt.target).text());
                    if (currentPage == 1 || currentPage == 0) {
                        $(btnPrev).attr("disabled", true);
                        $(btnNext).removeAttr("disabled");
                    }
                    if (currentPage == totalPages) {
                        $(btnNext).attr("disabled", true);
                        $(btnPrev).removeAttr("disabled");
                    }
                    const isPageActive = $(evt.target).hasClass("active-pagination");
                    if (!isPageActive) {
                        $scope.get_data_rekening(itemPage, currentPage, 1);
                    }
                });
            } else if (c === 1) {
                const pageNumberElement = document.querySelectorAll(".page-number");
                $(pageNumberElement).removeClass("active-pagination");
                $(pageNumberElement).eq(currentPage - 1).addClass("active-pagination");
                if (currentPage == 0 || currentPage == 1) {
                    $(btnPrev).attr("disabled", true);
                }
            }
        });
    }

    $scope.get_data_rekening(itemPage, currentPage, 0);

    $scope.clearText = () => {
        elementBank.each((index, element) => {
            $(element).val('');
        })
    }
    elementBank.each((index, element) => {
        $(element).attr("name", colomn[index]);
        $(element).attr("id", colomn[index]);
    });

    elementBank.on("input", (event) => {
        const element = event.target;
        $(element).removeClass("error");
    });


    $scope.openForm = () => {
        $scope.ket = "Menambahkan Data Bank";
        $scope.clearText();;
        $scope.aksi = true;
    }

    $scope.processForm = () => {
        let check = true;
        let dataForm = {};
        elementBank.each((index, element) => {
            const value = $(element).val();
            const key = $(element).attr("id");
            dataForm[key] = value;
            if (value === '') {
                swal({
                    text: key + " masih kosong",
                    icon: "warning"
                });
                $(element).addClass("error");
                check = false;
                return false;
            }
        });
        if (check) {
            const id_pengguna = $("#id_pengguna").val();
            dataForm.id_pengguna = id_pengguna;
            new RekeningService($http).create(dataForm, (res) => {
                const { success } = res;
                if (success) {
                    swal({
                        text: "Simpan data Bank berhasil",
                        icon: "success"
                    });
                    $scope.get_data_rekening(itemPage, currentPage, 0);
                    $scope.clearText();
                    return;
                }
                swal({
                    text: "Simpan data Bank gagal",
                    icon: "error"
                });
            })
        }
    }

    $scope.editData = (row) => {
        $scope.aksi = false;
        id = row.id;
        $scope.ket = "Memperbarui Data Bank";
        elementBank.each((index, element) => {
            $(element).val(row[colomn[index]]);
        })
    }

    $scope.updateForm = () => {
        let check = true;
        let dataForm = {};
        elementBank.each((index, element) => {
            const value = $(element).val();
            const key = $(element).attr("id");
            dataForm[key] = value;
            if (value === '') {
                swal({
                    text: key + " masih kosong",
                    icon: "warning"
                });
                $(element).addClass("error");
                check = false;
                return false;
            }
        });
        if (check) {
            new RekeningService($http).update(dataForm, id, (res) => {
                const { success } = res;
                if (success) {
                    swal({
                        text: "Perbarui data Rekening berhasil",
                        icon: "success"
                    });
                    $scope.get_data_rekening(itemPage, currentPage, 0);
                    $scope.clearText();
                    return;
                }
                swal({
                    text: "Perbarui data Rekening gagal",
                    icon: "error"
                });
            })
        }
    }

    $scope.hapusData = (id) => {
        new RekeningService($http).delete(id, (res) => {
            const { success } = res;
            if (success) {
                swal({
                    text: "Hapus data berhasil",
                    icon: "success"
                });
                currentPage = 0;
                $scope.get_data_rekening(itemPage, currentPage, 0);
                $scope.clearText();
                return;
            }
            swal({
                text: "Hapus data gagal",
                icon: "error"
            });
        })
    }

});
