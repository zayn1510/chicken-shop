import * as lib from "../../helpers/lib.js";
import ProdukService from "../../services/produk.js";
import PenawaranService from "../../services/penawaran.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {



    let id = 0;

    let itemProdukPage = 5;
    let currentProdukPage = 0;
    var totalProdukPage = 0;

    let itemPenawarPage = 5;
    let currentPenawarPage = 0;
    var totalPenawarPage = 0;
    var data_penawaran = [];



    let lastPage = 0;

    const tbody = document.querySelector("tbody");
    $scope.aksi = true;
    var id_produk = 0;

    // variabel handle pagination
    let prevnextPage = 0;
    var btnPrevProduk = document.getElementById("prevPageProduk");
    var btnNextProduk = document.getElementById("nextPageProduk");

    $scope.publis = 0;

    $(".detail-produk").hide();

    const itemPageelement = document.getElementById("itemPage");
    itemPageelement.addEventListener("change", (event) => {
        itemPage = $(event.target).val();
        $scope.get_data_produk(itemPage, currentPage);

    })

    const searchProduk = document.getElementById("searchProduk");
    searchProduk.addEventListener("input", (event) => {

        let filter = document.getElementById("filterProduk");
        const searchData = $(event.target).val()
        if (searchData !== '') {
            new PenawaranService($http).filterProduk(itemProdukPage,
                currentProdukPage, filter.value, searchData, res => {
                    const { data, totalPages } = res;
                    $scope.produk = data;
                    const pageElement = document.getElementsByClassName("produk-pagination");
                    $(pageElement).empty();
                    lib.initPagination(totalPages, null);

                });
        } else {
            $scope.get_data_produk(itemProdukPage, currentProdukPage, id_lapak);
        }
    })

    btnPrevProduk.addEventListener("click", (evt) => {
        if (currentProdukPage == 0 || currentProdukPage == 1 || currentProdukPage < 0) {
            currentProdukPage = 1;
        }
        currentProdukPage -= 1;

        new ProdukService($http).getProduk(itemProdukPage, currentProdukPage, res => {
            const { data } = res;
            $scope.produk = data;

            const element = document.getElementsByClassName("produk-pagination");
            const pageNumbers = $(element).find(".page-number");
            for (var i = 0; i < pageNumbers.length; i++) {
                const pageNumber = pageNumbers[i];
                $(pageNumber).removeClass("active-pagination");
            }
            $(pageNumbers).eq(currentProdukPage - 1).addClass("active-pagination");
        });

    })


    btnNextProduk.addEventListener("click", (evt) => {
        if (currentProdukPage == 0 || currentProdukPage == 1) {
            currentProdukPage = 1;
        }
        currentProdukPage += 1;
        lastPage = currentProdukPage;
        if (lastPage == currentProdukPage) {
            $(btnNextProduk).attr("disabled", true);
        }
        $(btnPrevProduk).removeAttr("disabled");

        new ProdukService($http).getProduk(itemProdukPage, currentProdukPage, res => {
            const { data } = res;
            $scope.produk = data;
            const element = document.getElementsByClassName("produk-pagination");
            const pageNumbers = $(element).find(".page-number");
            for (var i = 0; i < pageNumbers.length; i++) {
                const pageNumber = pageNumbers[i];
                $(pageNumber).removeClass("active-pagination");
            }
            $(pageNumbers).eq(currentProdukPage - 1).addClass("active-pagination");
        });
    })

    $scope.get_data_produk = async (a, b) => {
        $scope.publikasi = 0;
        new ProdukService($http).getProduk(a, b, res => {
            const { data } = res;
            $scope.produk = data;
            totalProdukPage = res.totalPages;
            const elementPagination = lib.initPagination(totalProdukPage, "produk-pagination");
            const pageNumberElement = $(elementPagination).find(".page-number");

            if (pageNumberElement.length == 1) {
                $(btnNextProduk).attr("disabled", true);
                $(btnPrevProduk).attr("disabled", true);
            } else if (pageNumberElement.length > 1) {
                $(btnNextProduk).removeAttr("disabled");
                $(btnPrevProduk).removeAttr("disabled");
            }

            $(pageNumberElement).on("click", (evt) => {
                prevnextPage = currentProdukPage;
                currentProdukPage = parseInt($(evt.target).text());
                if (currentProdukPage == 1 || currentProdukPage == 0) {
                    $(btnPrevProduk).attr("disabled", true);
                    $(btnNextProduk).removeAttr("disabled");
                }
                if (currentProdukPage == totalProdukPage) {
                    $(btnNextProduk).attr("disabled", true);
                    $(btnPrevProduk).removeAttr("disabled");
                }
                const isPageActive = $(evt.target).hasClass("active-pagination");

                if (!isPageActive) {
                    for (var i = 0; i < pageNumberElement.length; i++) {
                        const pageNumber = pageNumberElement[i];
                        $(pageNumber).removeClass("active-pagination")
                    }
                    $(evt.target).addClass("active-pagination");
                    new ProdukService($http).getProduk(itemProdukPage, currentProdukPage, res_2 => {
                        const { data } = res_2;
                        totalProdukPage = res_2.totalPages;
                        $scope.produk = data;
                    });
                }

            });
        })
    }
    $scope.get_data_produk(itemProdukPage, currentProdukPage);
    $scope.detailData = (row) => {
        $(".data-produk").hide();
        $(".detail-produk").show();
        $scope.kategori = row.kategori;
        $scope.nama_produk = row.nama_produk;
        $scope.desc = row.deskripsi;
        $scope.harga_awal = row.harga_awal;

        data_penawaran = [];
        new PenawaranService($http).penawaranById(itemPenawarPage, currentPenawarPage, row.id, res => {
            const { data, totalPages } = res;
            data_penawaran = data;
            $scope.harga_tertinggi = data[0].harga_penawaran;
            $scope.name = data[0].name;
            $scope.datapenawaran = data;
        });
    }
    $scope.update_publikasi = (a, event) => {
        const element = event.target
        const obj = {
            id: a.id,
            publikasi: element.value
        };
        new ProdukService($http).updateStatus(obj, res => {
            swal({
                text: "Success",
                icon: "success"
            });
            $scope.get_data_produk(itemProdukPage, currentProdukPage);
        });
    }

    $scope.openFoto = (a, row) => {
        const datafoto = row.foto;

        if (datafoto.length > 0) {
            const url = URL_FILE_PRODUK + row.id + "/" + datafoto[a].foto;
            window.open(url, "_blank");
        }
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
