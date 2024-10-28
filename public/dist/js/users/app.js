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


    const createProductCard = (url, caption, harga, id, desc) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const imageContainer = document.createElement("div");
        imageContainer.className = "product-card__image";
        const img = document.createElement("img");
        img.src = window.location.href + "produk/" + id + "/" + url;
        img.alt = caption;
        imageContainer.appendChild(img);

        const infoContainer = document.createElement("div");
        infoContainer.className = "product-card__info";
        const title = document.createElement("h2");
        title.className = "product-card__title";
        title.textContent = caption;
        const description = document.createElement("p");
        description.className = "product-card__description";
      
        description.textContent = desc;

        const priceRow = document.createElement("div");
        priceRow.className = "product-card__price-row";
        const price = document.createElement("span");

        const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(harga);
        price.className = "product-card__price";
        price.textContent = formattedPrice;

        priceRow.appendChild(price);
        infoContainer.appendChild(title);
        infoContainer.appendChild(description);
        infoContainer.appendChild(priceRow);
        productCard.appendChild(imageContainer);
        productCard.appendChild(infoContainer);

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
            const elementProduk = document.querySelector(".cont");
            for (var index = 0; index < data.length; index++) {
                let str=data[index].keterangan;
                if(str.length>50){
                    str=str.substring(0, 50) + '...';
                }
                console.info(str);
                const productCard = createProductCard(data[index].produk_media[0].media_url, data[index].jenis, data[index].harga,
                     data[index].id, str);
                elementProduk.append(productCard);
            }
        });
    }

    getDataAyam();
});
