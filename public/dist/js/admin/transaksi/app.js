import * as lib from "../../helpers/lib.js";
import TransaksiiService from "../../services/transaksi.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;
    const openForm = document.getElementById("open-form");
    const jenisData = document.querySelectorAll(".jenis")
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const tableElement = document.querySelector(".table-transaksi");
    const tableDetail = document.querySelector(".detail-transaksi-table");
    const productFoto = document.querySelector(".product-foto-form");
    const productStok = document.querySelector(".product-stok");
    const price = document.getElementById("harga");
    var toast = document.getElementById("toast");
    let totalPagesTemp = 0;
    let aksi = 0;
    var tempidproduk = 0;
    let add = true;
    let tempidjenis = 0;


    const getDataTransaksi = () => {
        new TransaksiiService($http).getDataTransaksi(pageSize, PageNumber, res => {
            const { data, totalPages } = res;
            totalPagesTemp = totalPages;
            initData(data, totalPages);
        });
    }

    getDataTransaksi();
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

    document.addEventListener("input", evt => {
        const dataaction = evt.target.getAttribute("data-action");
        if (dataaction === 'search-name') {
            const value = evt.target.value;
            if (value.length > 0) {

                new JenisService($http).filterDataJenis(pageSize, PageNumber, value, res => {
                    const { data, totalPages } = res;
                    initData(data, totalPages);
                });
            } else {
                getDataJenis();
            }
        } else if (dataaction === 'price-action') {

            convertToRupiah()
        }

    });

    const setFotoPembayaran = (data,metode,bank) => {

        const tbody = document.getElementById("tbodykonfirmasi");
        tbody.innerHTML = "";
        const numRowsToDisplay = Math.min(data.length, 10);


        for (let i = 0; i < numRowsToDisplay; i++) {
            const skeletonRow = createSkeletonRow(10);
            tbody.appendChild(skeletonRow);
        }

        const options = {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta'
        };
        const status = ["", "menunggu", "proses", "pengantaran", "selesai"];
        setTimeout(() => {
            tbody.innerHTML = "";
            tbody.innerHTML = data.map((row, index) =>
                `
            <tr class='text-center'>
              <td>${index + 1}</td>
              <td>${metode}</td>
              <td>${bank}</td>
              <td>
                <button class="btn btn-primary" data-action="preview-foto-pembayaran" data-id=${row.id}>Foto Pembayaran</button>
              </td>
             <td>${new Date(row.created_at).toLocaleString('id-ID', options)}</td>
            </tr > `);
        }, 1000)

    }
    const setDetailTransaksi = (data) => {

        const tbody = document.getElementById("tbodydetail");
        tbody.innerHTML = "";
        const numRowsToDisplay = Math.min(data.length, 10);


        for (let i = 0; i < numRowsToDisplay; i++) {
            const skeletonRow = createSkeletonRow(10);
            tbody.appendChild(skeletonRow);
        }

        const options = {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta'
        };
        const status = ["", "menunggu", "proses", "pengantaran", "selesai"];
        setTimeout(() => {
            tbody.innerHTML = "";
            tbody.innerHTML = data.map((row, index) =>
                `
            <tr class='text-center'>
              <td>${index + 1}</td>
              <td>${row.ayam.jenis}</td>
              <td>${row.jumlah}</td>
              <td>${formattedPrice(row.harga)}</td>
              <td>${formattedPrice(row.harga*row.jumlah)}</td>
            </tr > `);
        }, 1000)

    }

    const formattedPrice = (n) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(n);
    }
    document.addEventListener("click", evt => {
        const dataaction = evt.target.getAttribute("data-action");
        if (dataaction === 'detail-transaksi') {
            tableElement.classList.add("hide");
            tableDetail.classList.remove("hide");
            const id = evt.target.getAttribute("data-id");
            
            const nomor_order = evt.target.getAttribute("data-nomor");
            const idnomor = nomor_order + "" + id;
            new TransaksiiService($http).detailDataTransaksi(idnomor,id.length, res => {
                const { data } = res;
                const status = ["tidak ada", "menunggu", "proses", "pengantaran", "selesai"];
                const orders = data.orders;
                const customers = orders.customers;
                const detail_orders = orders.order_details;
                const konfirmasi_pembayaran=data.konfirmasi_pembayaran;
                setDetailTransaksi(detail_orders);
                const metode=data.metode.nama_metode;
                const bank=data.bank.nama_bank;
                setFotoPembayaran(konfirmasi_pembayaran,metode,bank);
                document.getElementById("nomor_orders").textContent = idnomor;
                document.getElementById("status").textContent = status[orders.status];
                document.getElementById("customers").textContent = customers.nama_lengkap;
                const formattedPrice = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(data.total);
                document.getElementById("total").textContent = formattedPrice;

            });
        }
        else if(dataaction==='preview-foto-pembayaran') {
            const idfoto=evt.target.getAttribute("data-id");
            window.location="../api/v1/foto-pembayaran/"+idfoto;
        }
    });

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
        }
    });

    const splitCamelCase = (text) => {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            if (text[i] === text[i].toUpperCase() && i !== 0) {
                result += " ";
            }
            result += text[i];
        }
        return result;
    }

    const setSkeltonRow = (data) => {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        const numRowsToDisplay = Math.min(data.length, 10);


        for (let i = 0; i < numRowsToDisplay; i++) {
            const skeletonRow = createSkeletonRow(10);
            tbody.appendChild(skeletonRow);
        }

        const options = {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta'
        };
        const status = ["", "menunggu", "proses", "pengantaran", "selesai"];
        setTimeout(() => {
            tbody.innerHTML = "";
            tbody.innerHTML = data.map((row, index) =>
                `
            <tr class='text-center'>
              <td>${row.orders.nomor_order}</td>
              <td>${row.total}</td>
              <td>${row.metode.nama_metode}</td>
              <td>${row.orders.customers.phone}</td>
              <td>${row.orders.customers.alamat}</td>
              <td>${new Date(row.created_at).toLocaleString('id-ID', options)}</td>
              <td>${status[row.orders.status]}</td>
              <td>
                        <button class="btn btn-warning" data-action="detail-transaksi" data-id=${row.id} data-nomor=${row.orders.nomor_order}>Detail</button>
                        <button class="btn btn-danger" data-action="hapus-jenis" data-value=${row.id}>Hapus Data</button>
              </td>
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
        new JenisService($http).getDataJenis(pageSize, PageNumber + 1, res => {
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
    const resetElement = () => {
        tableElement.classList.remove("hide")
        productForm.classList.add("hide");
        openForm.classList.remove("hide");
        aksi = 0;

    }


    const clearForm = () => {
        jenisData.forEach(input => {
            input.value = "";
            input.classList.add("font-12");
        });
        aksi = 0;
    }

    const OpenToast = (message, status) => {
        toast.classList.add("show", status);
        toast.textContent = message;
        setTimeout(function () {
            toast.classList.remove("show", status);
        }, 2000);
    }

});
