import AyamaService from "../services/users/home.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    var toast = document.getElementById("toast");
    let totalPagesTemp = 0;


    const createProductCard = (url, caption, harga, id) => {
        var productCard = document.createElement('div');
        productCard.className = 'product-card';

        const urlbase = window.location.origin + "/produk/" + id + "/" + url;

        const img = document.createElement('img');
        img.src = urlbase;
        img.alt = caption

        const title = document.createElement('h4');
        title.textContent = caption

        // Membuat elemen p untuk harga
        const price = document.createElement('p');
        price.textContent = harga;

        // Menambahkan img, h4, dan p ke dalam div utama
        productCard.appendChild(img);
        productCard.appendChild(title);
        productCard.appendChild(price);
        return productCard;
    }

    document.addEventListener("input", evt => {
        const data_action = evt.target.getAttribute("data-action");
        if (data_action === 'search-order') {
            
        }
    });
    // Panggil fungsi untuk menambahkan elemen produk ke halaman
    createProductCard();

    const getDataAyam = () => {
        new AyamaService($http).getDataAyam(pageSize, PageNumber, res => {
            const { data } = res;
            const elementProduk = document.querySelector(".product-cards");
            for (var index = 0; index < data.length; index++) {
                const productCard = createProductCard(data[index].produk_media[0].media_url, data[index].jenis, data[index].harga, data[index].id);
                elementProduk.append(productCard);
            }
        });
    }

    getDataAyam();
});
