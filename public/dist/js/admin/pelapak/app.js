import * as lib from "../../helpers/lib.js";
import PelapakService from "../../services/pelapak.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {



    let id = 0;
    let itemPage = 10;
    let currentPage = 0;
    let totalDataPage = 0;

    let itemProdukPage = 5;
    let currentProdukPage = 0;
    var totalProdukPage = 0;

    let lastPage = 0;

    const column = [
        "name", "alamat", "nomor_telepon",
        "email", "password", "foto_ktp"
    ];

    const tbody = document.querySelector("tbody");
    $scope.aksi = true;
    var id_lapak = 0;


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

    var btnPrevProduk = document.getElementById("prevPageProduk");
    var btnNextProduk = document.getElementById("nextPageProduk");




    const itemPageelement = document.getElementById("itemPage");
    itemPageelement.addEventListener("change", (event) => {
        itemPage = $(event.target).val();
        $scope.get_data_pelapak(itemPage, currentPage, 0);

    })

    const searchElement = document.getElementById("search");
    const searchProduk = document.getElementById("searchProduk");
    searchElement.addEventListener("input", (event) => {

        const filter = document.getElementById("filter");
        const searchData = $(event.target).val()
        if (searchData !== '') {
            new PelapakService($http).filterPelapak(itemPage,
                currentPage, $(filter).val(), searchData, res => {
                    const { data, totalPages } = res;
                    $scope.lapak = data;

                    const pageElement = document.getElementsByClassName("pages");
                    $(pageElement).empty();
                    lib.initPagination(totalPages, null);

                });
        } else {
            $scope.get_data_pelapak(itemPage, currentPage, 0);
        }
    })

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
        $scope.get_data_pelapak(itemPage, currentPage, 1);


    })
    btnPrev.addEventListener("click", (evt) => {
        if (currentPage == 0 || currentPage == 1 || currentPage < 0) {
            currentPage = 1;
        }
        currentPage -= 1;
        $scope.get_data_pelapak(itemPage, currentPage, 1);
    })

    if (prevnextPage == 0) {
        $(btnPrev).attr("disabled", true);
    }


    btnPrevProduk.addEventListener("click", (evt) => {
        if (currentProdukPage == 0 || currentProdukPage == 1 || currentProdukPage < 0) {
            currentProdukPage = 1;
        }
        currentProdukPage -= 1;

        new PelapakService($http).getProdukById(itemProdukPage, currentProdukPage, id_lapak, res => {
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

        new PelapakService($http).getProdukById(itemProdukPage, currentProdukPage, id_lapak, res => {
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


    $scope.get_data_pelapak = (a, b, c) => {
        new PelapakService($http).getPelapak(a, b, res => {
            const { data, totalPages } = res;
            totalDataPage = totalPages
            $scope.lapak = data;
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
                        $scope.get_data_pelapak(itemPage, currentPage, 1);
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

    $scope.get_data_pelapak(itemPage, currentPage, 0);

    $scope.editData = (row) => {
        $scope.nama_pelapak = row.nama_pelapak;
        $scope.pemilik = row.name;
        $scope.jumlah_produk = row.jumlah_produk;
        $scope.aksi = false;
        $(".detail-lapak-produk").show();
        $(".data-lapak").hide();
        id_lapak = row.id_lapak;
        $scope.get_data_produk(itemProdukPage, currentProdukPage, row.id_lapak);

    }

    $scope.get_data_produk = (a, b, c) => {
        new PelapakService($http).getProdukById(a, b, c, res => {
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
                    new PelapakService($http).getProdukById(itemProdukPage, currentProdukPage, id_lapak, res_2 => {
                        const { data } = res_2;
                        totalProdukPage = res_2.totalPages;
                        $scope.produk = data;
                    })
                }

            });
        })
    }

    $scope.update_publikasi = (a, b) => {
        const obj = {
            id: a.id,
            publikasi: b
        };
        new PelapakService($http).updateStatus(obj, res => {
            const { success } = res;
            if (success) {
                swal({
                    text: "Success",
                    icon: "success"
                });
                $scope.get_data_produk(itemProdukPage, currentProdukPage, id_lapak);
                return true;
            }
            swal({
                text: "Gagal",
                icon: "error"
            });
        });
    }

    $scope.openFoto = (a, row) => {
        const datafoto = row.foto;

        if (datafoto.length > 0) {
            const url = URL_FILE_PRODUK + row.id + "/" + datafoto[a].foto;
            window.open(url, "_blank");
        }
    }
    $scope.batal = () => {
        $(".detail-lapak-produk").hide();
        $(".data-lapak").show();
    }

});
