import * as lib from "../../helpers/lib.js";
import ProdukService from "../../services/produk.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {



    let id = 0;

    let itemProdukPage = 10;
    let currentProdukPage = 0;
    var totalProdukPage = 0;

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

    document.addEventListener("change", (event) => {
        const dataaction = event.target.getAttribute("data-action");
        if (dataaction === 'status') {
            const value = event.target.value;
            const datatarget = event.target.getAttribute("data-target");
            const obj = {
                id: datatarget,
                publikasi: value
            };
            new ProdukService($http).updateStatus(obj, res => {
                $scope.get_data_produk(itemProdukPage, currentProdukPage);
            });
        }
    })
    itemPageelement.addEventListener("change", (event) => {
        itemProdukPage = $(event.target).val();
        $scope.get_data_produk(itemProdukPage, currentProdukPage);

    })

    const searchProduk = document.getElementById("searchProduk");
    searchProduk.addEventListener("input", (event) => {

        let filter = document.getElementById("filterProduk");
        const searchData = $(event.target).val()
        if (searchData !== '') {
            new PelapakService($http).filterProduk(itemProdukPage,
                currentProdukPage, id_lapak, filter.value, searchData, res => {
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


        currentProdukPage--;

        if (currentProdukPage == 1) {
            $(btnPrevProduk).attr("disabled", true);
        }
        if (currentProdukPage <= totalProdukPage) {
            $(btnNextProduk).removeAttr("disabled");
        }

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

        if (totalProdukPage == currentProdukPage) {
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
                        totalProdukPage = res.totalPages;
                        $scope.produk = data;
                    });
                }

            });
        })
    }
    $scope.get_data_produk(itemProdukPage, currentProdukPage);
    $scope.detailData = (row) => {

        const datafoto = row.foto;
        if (datafoto.length == 0) {
            swal({
                text: "Tidak ada foto pada produk ini !",
                icon: "warning"
            });
            return true;
        }
        $(".data-produk").hide();
        $(".detail-produk").show();
        $scope.kategori = row.kategori;
        $scope.nama_produk = row.produk;
        $scope.desc = row.deskripsi;
        $scope.harga_awal = row.harga_awal;
        const url = URL_FILE_PRODUK + row.id + "/" + datafoto[0].foto;
        $("#load_image").attr("src", url);
    }
    $scope.openFoto = (a, row) => {
        const datafoto = row.foto;

        if (datafoto.length > 0) {
            const url = URL_FILE_PRODUK + row.id + "/" + datafoto[a].foto;
            window.open(url, "_blank");
        }
    }
    $scope.batal = () => {
        $(".detail-produk").hide();
        $(".data-produk").show();
    }

});
