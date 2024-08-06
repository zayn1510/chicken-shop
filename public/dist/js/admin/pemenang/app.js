import * as lib from "../../helpers/lib.js";
import PemenangService from "../../services/pemenang.js";
import PenawaranService from "../../services/penawaran.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {


    let id = 0;
    let itemPage = 10;
    let currentPage = 0;
    let totalDataPage = 0;

    let lastPage = 0;

    let itemPenawarPage = 100;
    let currentPenawarPage = 0;
    var totalPenawarPage = 0;
    var data_penawaran = [];
    const tbody = document.querySelector("tbody");
    $scope.aksi = true;


    $(".detail-produk").hide();
    // variabel handle pagination
    let prevnextPage = 0;
    var btnPrev = document.getElementById("prevPage");
    var btnNext = document.getElementById("nextPage");

    document.addEventListener("change", (event) => {
        const dataaction = event.target.getAttribute("data-action");

        if (dataaction === 'status') {
            const value = event.target.value;
            const datatarget = event.target.getAttribute("data-target");
            const datavalue = event.target.getAttribute('data-value');
            const split = datatarget.split(".");
            const id = split[0];
            const id_penawaran = split[1];
            const id_lapak = split[2];
            const obj = {
                id_penawaran: id_penawaran,
                status: value,
                idpemenang: id,
                idpelapak: id_lapak,
                statuspembayaran: 0,
                total: datavalue,
                read:0,
                read_pembeli:0
            }
            new PemenangService($http).updateStatus(obj, id, res => {
                const { success } = res;
                if (success) {
                    swal({
                        text: "Update data berhasil",
                        icon: "success"
                    });
                    currentPage = 0;
                    $scope.get_data_pemenang(itemPage, currentPage, 0);
                    return;
                }
                swal({
                    text: "Update data gagal",
                    icon: "error"
                });
            });
        }
    })


    const itemPageelement = document.getElementById("itemPage");
    itemPageelement.addEventListener("change", (event) => {
        itemPage = $(event.target).val();
        $scope.get_data_pemenang(itemPage, currentPage, 0);
    })

    const searchElement = document.getElementById("search");
    searchElement.addEventListener("input", (event) => {
        const filter = document.getElementById("filter");
        const searchData = $(event.target).val()
        if (searchData !== '') {
            new PemenangService($http).filterPemenang(itemPage,
                currentPage, $(filter).val(), searchData, res => {
                    const { data, totalPages } = res;
                    $scope.pemenang = data;
                    const pageElement = document.getElementsByClassName("pages");
                    $(pageElement).empty();
                    lib.initPagination(totalPages, null);
                });
        }
    })


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
        $scope.get_data_pemenang(itemPage, currentPage, 1);


    })

    btnPrev.addEventListener("click", (evt) => {
        if (currentPage == 0 || currentPage == 1 || currentPage < 0) {
            currentPage = 1;
        }
        currentPage -= 1;
        $scope.get_data_pemenang(itemPage, currentPage, 1);
    })

    if (prevnextPage == 0) {
        $(btnPrev).attr("disabled", true);
    }


    $scope.get_data_pemenang = (a, b, c) => {
        new PemenangService($http).getPemenang(a, b, res => {
            const { data, totalPages } = res;
            totalDataPage = totalPages
            $scope.pemenang = data;
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
                        $scope.get_data_pemenang(itemPage, currentPage, 1);
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

    $scope.get_data_pemenang(itemPage, currentPage, 0);


    $scope.detailData = (row) => {
        $(".data-produk").hide();
        $(".detail-produk").show();
        $scope.kategori = row.kategori;
        $scope.nama_produk = row.nama_produk;
        $scope.desc = row.deskripsi;
        $scope.harga_awal = row.harga_awal;
        $scope.name = row.pemenang;
        data_penawaran = [];
        const id_produk = row.id_produk;
        new PenawaranService($http).penawaranById(itemPenawarPage, currentPenawarPage, id_produk, res => {
            const { data, totalPages } = res;
            data_penawaran = data;
            $scope.harga_tertinggi = data[0].harga_penawaran;
            $scope.datapenawaran = data;
        });
    }


    $scope.hapusData = (id, id_produk) => {
        new PemenangService($http).deletePemenang(id, id_produk, (res) => {
            const { success } = res;
            if (success) {
                swal({
                    text: "Hapus data berhasil",
                    icon: "success"
                });
                currentPage = 0;
                $scope.get_data_pemenang(itemPage, currentPage, 0);
                $scope.clearText();
                return;
            }
            swal({
                text: "Hapus data gagal",
                icon: "error"
            });
        })
    }


    $scope.sorting = () => {
        const sorting = document.getElementById("sorting");
        if (sorting.value == 0) {
            data_penawaran.sort(function (a, b) {
                return a.harga_penawaran - b.harga_penawaran;
            });
        } else {
            data_penawaran.sort(function (a, b) {
                return b.harga_penawaran - a.harga_penawaran;
            });
        }
    }
    $scope.batal = () => {
        $(".detail-produk").hide();
        $(".data-produk").show();
    }

});
