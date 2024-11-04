import * as lib from "../../helpers/lib.js";
import JenisService from "../../services/jenis.js";
import StokService from "../../services/stok_masuk.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    var toast = document.getElementById("toast");
    let totalPagesTemp = 0;
    var jenisSelect = document.getElementById("jenis");

    const startdate = document.getElementById('startdate');
    const enddate = document.getElementById('enddate');
    const getDataStokMasuk = () => {
        new StokService($http).getDataStokBy(pageSize, PageNumber, 0, 1, res => {
            const { data, totalPages } = res;
            totalPagesTemp = totalPages;
            initData(data, totalPages);
        });
    }

    const getDataJenisAyam = () => {
        new JenisService($http).getDataJenis(100, 0, res => {
            const { data } = res;

            for (var index = 0; index < data.length; index++) {
                const elemetOption = document.createElement("option");
                elemetOption.value = data[index].id;
                elemetOption.text = data[index].jenis;

                jenisSelect.append(elemetOption);
            }
        });
    }
    getDataStokMasuk();
    getDataJenisAyam();
    const createSkeletonRow = (rows) => {
        const row = document.createElement("tr");
        row.classList.add("skeleton-row");
        for (let i = 0; i < rows; i++) {
            const cell = document.createElement("td");
            cell.classList.add("skeleton-loading");
            row.appendChild(cell);
        }
        return row;
    }

    document.addEventListener("change", evt => {
        const dataaction = evt.target.getAttribute("data-action");
        if (dataaction === 'openfile') {
            const file = evt.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('uploadBox').style.display = 'none';
                    document.getElementById('imagePreview').style.display = 'block';
                    document.getElementById('uploadedImage').src = e.target.result;
                };
                reader.readAsDataURL(file);  // Read file as Data URL
            }
        } else if (dataaction === 'search-jenis') {
            const value = evt.target.value;
            if (value.length > 0) {
                new StokService($http).getDataStokBy(pageSize, PageNumber, value, 1, res => {
                    const { data, totalPages } = res;
                    initData(data, totalPages);
                });
            } else {
                getDataStokMasuk();
            }
        }
    });


    document.addEventListener("click", res => {
        const dataaction = res.target.getAttribute("data-action");

        if (dataaction === 'cetak-laporan') {

            const start = new Date(startdate.value);
            const end = new Date(enddate.value);

            if (startdate.value.length == 0 && (enddate.value.length == 0)) {
                swal({
                    text: "Pilih awal dan akhir tanggal dulu !",
                    icon: "warning"
                });
            } else if (end < start) {
                swal({
                    text: "Tanggal akhir tidak boleh lebih kecil dari tanggal awal!",
                    icon: "warning"
                });
            } else {
                let newvalue = null;
                if (jenisSelect.value.length == 0) {
                    newvalue = 'all';
                } else {
                    newvalue = jenisSelect.value;
                }

                window.location.href = '../cetak-laporan/' + newvalue + '/' + startdate.value + "/" + enddate.value+"/"+2;
            }
        }


    });

    const setSkeltonRow = (data) => {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        const numRowsToDisplay = Math.min(data.length, 10);


        for (let i = 0; i < numRowsToDisplay; i++) {
            const skeletonRow = createSkeletonRow(4);

            tbody.appendChild(skeletonRow);
        }

        setTimeout(() => {
            tbody.innerHTML = "";
            tbody.innerHTML = data.map((row, index) => `
            <tr class='text-center'>
              <td>${index + 1}</td>
              <td>${row.jenis}</td>
              <td>${row.jumlah}</td>
              <td>${lib.formatDate(row.created_at)}</td>
            </tr > `);
        }, 1000)

    }
    const initData = (data, totalPages) => {
        setSkeltonRow(data);
        lib.initPagination(totalPages, null);
        const newPageSize = pageSize + 1;
        if (pageSize == 0) {
            prevPage.setAttribute("disabled", true);
        }
        if (newPageSize == totalPages) {
            nextPage.setAttribute("disabled", true);
        } else {
            nextPage.removeAttribute("disabled");
        }

        const elementPageNumber = document.querySelectorAll(".page-number");
        if (elementPageNumber) {
            elementPageNumber.forEach(element => {
                element.addEventListener("click", evt => {
                    const txtelement = evt.target.textContent;
                    PageNumber = txtelement - 1
                    nextPage.disabled = (PageNumber + 1 === totalPagesTemp);
                    document.querySelector(".active-pagination").classList.remove("active-pagination");
                    document.getElementsByClassName("page-number")[PageNumber].classList.add("active-pagination");
                    prevPage.disabled = (PageNumber === 0);
                    getDataByPagination();
                });
            });
        }
    };

    const checkPageActive = (check) => {
        PageNumber += check ? 1 : -1;
        nextPage.disabled = (PageNumber + 1 === totalPagesTemp);
        document.querySelector(".active-pagination").classList.remove("active-pagination");
        document.getElementsByClassName("page-number")[PageNumber].classList.add("active-pagination");
        prevPage.disabled = (PageNumber === 0);
        getDataByPagination();
    }
    const getDataByPagination = () => {
        new StokService($http).getDataStokBy(pageSize, PageNumber + 1, 0, res => {
            setSkeltonRow(res.data);
        });
    }

    prevPage.addEventListener("click", evt => {
        checkPageActive(false);
    });

    nextPage.addEventListener("click", evt => {
        prevPage.removeAttribute("disabled");
        checkPageActive(true);
    });
});
