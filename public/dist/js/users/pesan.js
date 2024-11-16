import AyamaService from "../services/users/home.js";
import * as lib from "../helpers/lib.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    var toast = document.getElementById("toast");

    var paymentSelect = document.getElementById("paymentMethod");
    const orderNow = document.getElementById("pesan-sekarang");

    const userid = localStorage.getItem("userid");

    if (!userid) {
        window.location.href = "login-user";
    }
    orderNow.addEventListener("click", e => {
        const productData = getProductData();

        // console.info(productData);
        // return;
        new AyamaService($http).orderProducts(productData, res => {
            const { success, nomor, digit } = res;
            if (success) {
                window.location = "/user-transaksi/" + nomor + "/" + digit;
            }
        });
    });

    const getDataBank = () => {
        document.querySelector(".bank-dropdown").classList.remove("hide");
        new AyamaService($http).getDataBank(pageSize, PageNumber, res => {
            const { data } = res;
            var bankSelect = document.getElementById("bankList");
            for (var index = 0; index < data.length; index++) {
                const optionPayment = document.createElement("option");
                optionPayment.value = data[index].id;
                optionPayment.text = data[index].nama_bank;
                bankSelect.append(optionPayment);
            }
        })
    }

    const getDataMetode = () => {
        new AyamaService($http).getDataMetode(pageSize, PageNumber, res => {
            const { data } = res;

            for (var index = 0; index < data.length; index++) {
                const optionPayment = document.createElement("option");
                optionPayment.value = data[index].id;
                optionPayment.text = data[index].nama_metode;
                paymentSelect.append(optionPayment);
            }
        })
    }
    paymentSelect.addEventListener("change", e => {
        if (e.target.value == 1) {
            getDataBank();
        }
    })
    getDataMetode();

    const getProductData = () => {
        const productCards = document.querySelectorAll('.product-card');
        const products = [];


        let total = 0;


        productCards.forEach(card => {

            const quantityInput = card.querySelector('input[type="number"]');
            const priceElement = card.getAttribute("data-price");
          
            const quantity = parseInt(quantityInput.value);
            const price = parseFloat(priceElement);
            const temptotal = quantity * price;
          

            if (quantity > 0) {
                const product = {
                    ayam: quantityInput.id.split('_')[1],
                    harga: price,
                    jumlah: quantity,
                };
                total += temptotal;
                products.push(product);

            }
        });
        let bank = document.getElementById("bankList");
        let newbank = 0;
        if (bank.value.length !== 0) {
            newbank = bank.value;
        }
        const order = {
            user_id: parseInt(userid),
            total: total,
            status: 1,
            detail_orders: products,
            bank: newbank,
            metode: parseInt(document.getElementById("paymentMethod").value)
        };
        return order;
    }

    const createProductActions = (productId, id, stok) => {

        const productActions = document.createElement('div');
        productActions.classList.add('product-actions');


        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = function () {
            changeQuantity(productId, id, -1, stok);
        };


        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.id = productId + "_" + id;
        quantityInput.className = "ayam_" + id;
        quantityInput.value = 0;
        quantityInput.min = 0;



        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = function () {
            changeQuantity(productId, id, 1, stok);
        };


        productActions.appendChild(minusButton);
        productActions.appendChild(quantityInput);
        productActions.appendChild(plusButton);

        return productActions;
    }

    const changeQuantity = (productId, id, change, stok) => {
        const input = document.getElementById(productId + "_" + id);
        let currentValue = parseInt(input.value);
        currentValue += change;
        if (currentValue < 0) currentValue = 0;
        if (currentValue > stok) {
            currentValue = stok;
        }
        input.value = currentValue;
    }



    const createProductCard = (url, caption, harga, id, stok, diskon) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const discountBadge = document.createElement('div');
        const discount = diskon * 100;
        discountBadge.classList.add('discount-badge');
        discountBadge.textContent = "Diskon " + discount + "%";


        const productImage = document.createElement('img');
        productImage.src = window.location.origin + "/produk/" + id + "/" + url;
        productImage.alt = caption;
        productImage.classList.add('product-image');


        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');


        const productTitle = document.createElement('h3');
        productTitle.classList.add('product-title');
        productTitle.textContent = caption;
        const priceInfo = document.createElement('div');
        priceInfo.classList.add('price-info');


        const hargadiskon = harga - ((diskon) * harga);
        productCard.setAttribute("data-price",hargadiskon);
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


        const stock = document.createElement('p');
        stock.setAttribute("data-stok", stok);
        stock.textContent = "Stok tersedia " + stok;
        stock.className = "poppins";

        priceInfo.appendChild(oldPrice);
        if (diskon > 0) {
            oldPrice.classList.add("garis");
            priceInfo.appendChild(newPrice);
        }

        productInfo.appendChild(productTitle);
        productInfo.appendChild(priceInfo);
        productInfo.appendChild(stock);

        productCard.appendChild(discountBadge);
        productCard.appendChild(productImage);
        productCard.appendChild(productInfo);
        const elementActions = createProductActions("ayam", id, stok);
        productCard.appendChild(elementActions);
        return productCard;
    }

    const getDataAyam = () => {
        new AyamaService($http).getDataAyam(pageSize, PageNumber, res => {
            const { data } = res;
            const elementProduk = document.querySelector(".product-list");
            for (var index = 0; index < data.length; index++) {
                const productCard = createProductCard(data[index].produk_media[0].media_url, data[index].jenis,
                    data[index].harga, data[index].id, data[index].stok, data[index].diskon);
                elementProduk.append(productCard);
            }
        });
    }

    getDataAyam();
});
