import * as lib from "../../helpers/lib.js";
import TransaksiService from "../../services/transaksi.js";
import PenawaranService from "../../services/penawaran.js"

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let itemPage = 10;
    let currentPage = 0;
    let totalDataPage = 0;

    let lastPage = 0;


    const tbody = document.querySelector("tbody");
    $scope.aksi = true;


    // variabel handle pagination
    let prevnextPage = 0;
    var btnPrev = document.getElementById("prevPage");
    var btnNext = document.getElementById("nextPage");


    const itemPageelement = document.getElementById("itemPage");
    itemPageelement.addEventListener("change", (event) => {
        itemPage = $(event.target).val();
        $scope.get_data_transaksi(itemPage, currentPage, 0);

    })

    const searchElement = document.getElementById("search");
    searchElement.addEventListener("input", (event) => {

        const filter = document.getElementById("filter");
        const searchData = $(event.target).val()
        if (searchData !== '') {
            new TransaksiService($http).filterDataByColumn(itemPage,
                currentPage, $(filter).val(), searchData, res => {
                    const { data, totalPages } = res;
                    $scope.transaksi = data;
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
        $scope.get_data_transaksi(itemPage, currentPage, 1);


    })

    btnPrev.addEventListener("click", (evt) => {
        if (currentPage == 0 || currentPage == 1 || currentPage < 0) {
            currentPage = 1;
        }
        currentPage -= 1;
        $scope.get_data_transaksi(itemPage, currentPage, 1);
    })

    if (prevnextPage == 0) {
        $(btnPrev).attr("disabled", true);
    }


    $scope.get_data_transaksi = (a, b, c) => {
        new TransaksiService($http).getAll(a, b, res => {
            const { data, totalPages } = res;
            totalDataPage = totalPages
            $scope.transaksi = data;
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
                        $scope.get_data_transaksi(itemPage, currentPage, 1);
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

    $scope.get_data_transaksi(itemPage, currentPage, 0);



    $scope.edit_status = (row) => {
        $scope.aksi = false;
        id = row.id;
        $scope.ket = "Memperbarui Data Kategori";
        elementKategori.each((index, element) => {
            $(element).val(row[colomn[index]]);
        })
    }

    $scope.detailData = (row, event) => {
        $(".data-produk").hide();
        $(".detail-produk").show();
        $scope.kategori = row.kategori;
        $scope.nama_produk = row.nama_produk;
        $scope.desc = row.deskripsi;
        $scope.harga_awal = row.harga_awal;
        $scope.harga_terjual = row.harga_terjual;
        $scope.nama_pemenang = row.nama_pemenang
        var selectElement = $(event.target).closest('tr').find('select');
        var selectedOptionText = $(selectElement).find('option:selected').text();
        $scope.status = selectedOptionText
        $scope.fotopembayaran = row.fotopembayaran
        $scope.urlfoto = window.location.origin + "/transaksi/invoice/" + row.id + "/" + row.fotopembayaran
        $scope.urlulasan = window.location.origin + "/transaksi/ulasan/" + row.id + "/" + row.foto_doc;
        $scope.ulasan = row.ulasan;
    }

    $scope.batal = () => {
        $(".data-produk").show();
        $(".detail-produk").hide();
    }

    $scope.update_status = (row, evt) => {
        if (row.idmetode == 0) {
            swal({
                text: "metode pmebayaran belum diatur !",
                icon: "error"
            });
            return;
        }
        const statuspembayaran = evt.target.value;
        const obj = {
            idpemenang: row.idpemenang,
            idpelapak: row.idpelapak,
            statuspembayaran: statuspembayaran,
            idproduk: row.idproduk,
            read_pembeli: 0,
            read: 0
        }


        new TransaksiService($http).updateStatus(obj, row.id, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "update status pembayaran gagal !",
                    icon: "error"
                });
                return;
            }

        });
    }

});
