import * as lib from "../../helpers/lib.js";
import ProdukService from "../../services/produk.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {
    let itemPage = 10;
    let currentPage = 0;
    let lastPage = 0;
    let totalDataPage = 0;
    const tbody = document.querySelector("tbody");
    $scope.aksi = true;

    // variabel handle pagination
    let prevnextPage = 0;
    var btnPrev = document.getElementById("prevPage");
    var btnNext = document.getElementById("nextPage");

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
        $scope.get_data_produk(itemPage, currentPage, 1);


    })

    btnPrev.addEventListener("click", (evt) => {
        if (currentPage == 0 || currentPage == 1 || currentPage < 0) {
            currentPage = 1;
        }
        currentPage -= 1;
        $scope.get_data_produk(itemPage, currentPage, 1);
    })

    if (prevnextPage == 0) {
        $(btnPrev).attr("disabled", true);
    }


    $scope.get_data_produk = (a, b, c) => {
        new ProdukService($http).getProduk(a, b, res => {
            const { data, totalPages } = res;
            totalDataPage = totalPages
            $scope.produk = data;
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
                        $scope.get_data_produk(itemPage, currentPage, 1);
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
    $scope.get_data_produk(itemPage, currentPage, 0);
});
