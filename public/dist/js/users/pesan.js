import AyamaService from "../services/users/home.js";

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
            const priceElement = card.querySelector('p[data-price]');
            const quantity = parseInt(quantityInput.value);
            const price = parseFloat(priceElement.getAttribute('data-price'));
            const temptotal = price * quantity;
            const product = {
                ayam: quantityInput.id.split('_')[1],
                harga: price,
                jumlah: quantity,
            };
            total += temptotal;
            products.push(product);
        });
        const order = {
            user_id: parseInt(userid),
            total: total,
            status: 1,
            detail_orders: products,
            bank: document.getElementById("bankList").value,
            metode: document.getElementById("paymentMethod").value
        };

        return order;
    }

    const createProductActions = (productId, id) => {

        const productActions = document.createElement('div');
        productActions.classList.add('product-actions');


        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = function () {
            changeQuantity(productId, -1);
        };


        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.id = productId + "_" + id;
        quantityInput.value = 1;
        quantityInput.min = 1;


        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = function () {
            changeQuantity(productId, id, 1);
        };


        productActions.appendChild(minusButton);
        productActions.appendChild(quantityInput);
        productActions.appendChild(plusButton);

        return productActions;
    }

    const changeQuantity = (productId, id, change) => {
        const input = document.getElementById(productId + "_" + id);
        let currentValue = parseInt(input.value);
        currentValue += change;
        if (currentValue < 1) currentValue = 1; // Mencegah nilai negatif
        input.value = currentValue;
    }



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
        price.setAttribute("data-price", harga);
        price.textContent = harga;

        // Menambahkan img, h4, dan p ke dalam div utama
        productCard.appendChild(img);
        productCard.appendChild(title);
        productCard.appendChild(price);
        const elementActions = createProductActions("ayam", id);
        productCard.appendChild(elementActions);
        return productCard;
    }

    const getDataAyam = () => {
        new AyamaService($http).getDataAyam(pageSize, PageNumber, res => {
            const { data } = res;
            const elementProduk = document.querySelector(".product-list");
            for (var index = 0; index < data.length; index++) {
                const productCard = createProductCard(data[index].produk_media[0].media_url, data[index].jenis, data[index].harga, data[index].id);
                elementProduk.append(productCard);
            }
        });
    }

    getDataAyam();
});
