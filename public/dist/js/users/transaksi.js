import AyamaService from "../services/users/home.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;


    var idtransaksi = 0;



    document.addEventListener("change", evt => {
        const dataaction = evt.target.getAttribute("data-action");
        if (dataaction === 'preview-image') {
            previewImage(evt);
        }
    });

    document.addEventListener("click", evt => {
        const dataaction = evt.target.getAttribute("data-action");
        if (dataaction === 'upload-foto-pembayaran') {
            uploadFotoPembayaran();
        }
    });

    const uploadFotoPembayaran = () => {
        var fileinput = document.getElementById("file-image");
        var formData = new FormData();
        formData.append("transaksi", idtransaksi);
        formData.append("status", 1);
        formData.append("foto", fileinput.files[0]);
        new AyamaService($http).createPhoto(formData, res => {
            const { success } = res;
            if (success) {
                swal({
                    text: "Foto Pembayaran telah terkirim !",
                    icon: "success"
                });
                location.reload();
            } else {
                swal({
                    text: "Format foto pembayaran tidak sesuai !",
                    icon: "error"
                });
            }

        });
    }
    const createTransaksiItem = (caption, harga, quantity) => {
        const transactionItem = document.createElement('div');
        transactionItem.classList.add('transaction-item');

        const productName = document.createElement('span');
        productName.textContent = caption;

        const productPrice = document.createElement('span');
        const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(harga);

        productPrice.textContent = `${formattedPrice} x ${quantity}`;
        transactionItem.appendChild(productName);
        transactionItem.appendChild(productPrice);
        return transactionItem;
    }

    const getDetailTransaksiPembayaran = () => {
        const nomor = document.getElementById("nomor_order");
        const digit = document.getElementById("digit")
        let flow = document.querySelectorAll(".step");
        new AyamaService($http).getDataTransaksi(nomor.value, digit.value, res => {
            const { data } = res;
            document.getElementById("nomor_transaksi").textContent = nomor.value;
            const status = ["", "Menunggu", "Sedang Di Proses", "Pengiriman", "Selesai"];
            document.getElementById("status").textContent = status[data.status];
            const date = new Date(data.created_at);
            const detail_orders = data.orders.order_details;
            idtransaksi = data.id;
            const konfirmasi_pembayaran = data.konfirmasi_pembayaran;
            const metode = data.metode;
            if (konfirmasi_pembayaran.length > 0) {
                const dataTerakhir = konfirmasi_pembayaran.sort((a, b) => a.id - b.id).pop();

                document.querySelector(".payment-summary").classList.add("hide");
                document.querySelector(".upload-section").classList.add('hide');
                const status_pembayaran = document.createElement("p");
                console.info(data.status);
                if (dataTerakhir.status === 1 && data.status == 1) {
                    flow[1].classList.add("in-progress");
                    status_pembayaran.textContent = "Pembayaran Sedang Di Proses";
                } else if (dataTerakhir.status == 2 && data.status == 2) {
                    flow[1].classList.add("completed");
                    status_pembayaran.textContent = "Pembayaran sudah diterima";
                } else if (dataTerakhir.status == 2 && data.status == 3) {
                    flow[1].classList.add("completed");
                    flow[2].classList.add("in-progress");
                    status_pembayaran.textContent = "Pengiriman ayam potong sedang diproses";
                } else if (dataTerakhir.status == 2 && data.status == 4) {
                    flow[1].classList.add("completed");
                    flow[2].classList.add("completed");
                    flow[3].classList.add("completed");
                    status_pembayaran.textContent = "Pengiriman ayam potong selesai";
                }
                document.querySelector(".status_pembayaran").append(status_pembayaran);
            }

            const newday = date.setDate(date.getDate() + 1);
            const formattedTotal = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(data.total);

            document.getElementById("total").textContent = formattedTotal;
            for (var index = 0; index < detail_orders.length; index++) {
                const row = detail_orders[index];
                const item = createTransaksiItem(row.ayam.jenis, row.harga, row.jumlah);
                document.querySelector(".transaction-list").append(item);
            }

            const options = {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                timeZone: 'Asia/Jakarta'

            };

            const formattedDate = date.toLocaleString('id-ID', options);
            document.getElementById("tanggal").textContent = formattedDate;

            const countdown = document.getElementById('countdown');
            const hoursSpan = document.getElementById('hours');
            const minutesSpan = document.getElementById('minutes');

            if (metode.id == 1) {
                const updateCountdown = () => {
                    const now = new Date();
                    const totalSeconds = Math.floor((newday - now) / 1000);
                    if (totalSeconds <= 0) {
                        hoursSpan.innerText = "00";
                        minutesSpan.innerText = "00";
                        clearInterval(interval);
                        return;
                    }

                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);

                    hoursSpan.innerText = String(hours).padStart(2, '0');
                    minutesSpan.innerText = String(minutes).padStart(2, '0');
                };

                const interval = setInterval(updateCountdown, 1000);
            } else {
                document.querySelector(".payment-summary").classList.add("hide");
                document.querySelector(".upload-section").classList.add("hide");
                document.querySelectorAll(".step")[1].remove();
                document.querySelectorAll(".connector")[1].remove();
                document.querySelectorAll(".step")[1].querySelector(".circle").textContent = 2;
                document.querySelectorAll(".step")[2].querySelector(".circle").textContent = 3;
                document.querySelector(".status_pembayaran").classList.add("hide");
            }

        });
    }


    getDetailTransaksiPembayaran();
    const previewImage = (event) => {
        const file = event.target.files[0];
        const imgElement = document.getElementById('uploaded-image');

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgElement.src = e.target.result;
                imgElement.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            imgElement.src = '';
            imgElement.style.display = 'none';
        }
    }
});
