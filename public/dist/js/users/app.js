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


    const mobileMenu = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");



    // mobileMenu.addEventListener("click", () => {
    //     const widthWindows = window.innerWidth;
    //     navList.style.left = "-233px";
    //     navList.classList.toggle("nav-active");
    // });


    const createProductCard = (url, caption, harga, id, desc, diskon) => {

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');


        const discountBadge = document.createElement('div');
        const discount = diskon * 100;
        discountBadge.classList.add('discount-badge');
        discountBadge.textContent = "Diskon " + discount + "%";


        const productImage = document.createElement('img');
        productImage.src = window.location.href + "produk/" + id + "/" + url;
        productImage.alt = caption;
        productImage.classList.add('product-image');


        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');


        const productTitle = document.createElement('h4');
        productTitle.classList.add('product-title');
        productTitle.textContent = caption;


        const productDescription = document.createElement('p');
        productDescription.classList.add('product-description');
        productDescription.textContent = desc;


        const priceInfo = document.createElement('div');
        priceInfo.classList.add('price-info');


        const hargadiskon = harga-((diskon) * harga);

        const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(harga);
        const oldPrice = document.createElement('span');
        oldPrice.classList.add('old-price');
        oldPrice.textContent = formattedPrice;

        const formattedDiskon = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(hargadiskon);
        const newPrice = document.createElement('span');
        newPrice.classList.add('new-price');
        newPrice.textContent = formattedDiskon;

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.textContent = 'Pesan Sekarang';
        addToCartButton.setAttribute("data-action", "pesan");


        priceInfo.appendChild(oldPrice);
        if (diskon > 0) {
            oldPrice.classList.add("garis");
            priceInfo.appendChild(newPrice);
        }

        productInfo.appendChild(productTitle);
        productInfo.appendChild(productDescription);
        productInfo.appendChild(priceInfo);
        productInfo.appendChild(addToCartButton);

        productCard.appendChild(discountBadge);
        productCard.appendChild(productImage);
        productCard.appendChild(productInfo);

        return productCard;
    }

    document.addEventListener("input", evt => {
        const data_action = evt.target.getAttribute("data-action");
        if (data_action === 'search-order') {

        }
    });

    document.addEventListener("click", evt => {
        const data_action = evt.target.getAttribute("data-action");
        if (data_action === 'pesan') {
            window.location.href = "pesan";
        }
    });
    // Panggil fungsi untuk menambahkan elemen produk ke halaman
    createProductCard();

    const getDataAyam = () => {
        new AyamaService($http).getDataAyam(pageSize, PageNumber, res => {
            const { data } = res;
            const elementProduk = document.querySelector(".cont");
            for (var index = 0; index < data.length; index++) {
                let str = data[index].keterangan;
                if (str.length > 50) {
                    str = str.substring(0, 50) + '...';
                }
                const productCard = createProductCard(data[index].produk_media[0].media_url, data[index].jenis, data[index].harga,
                    data[index].id, str, data[index].diskon);
                elementProduk.append(productCard);
            }
        });
    }

    getDataAyam();
});
