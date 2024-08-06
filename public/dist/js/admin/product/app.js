import * as lib from "../../helpers/lib.js";
import ProductsService from "../../services/products.js";
import KategoriService from "../../services/kategori.js";
import SatuanService from "../../services/satuan.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;
    const openForm = document.getElementById("open-form");
    const saveForm = document.getElementById("save-form");
    const product = document.querySelectorAll(".product")
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const productForm = document.querySelector(".product-form");
    const tableElement = document.querySelector(".table-product");
    const price = document.getElementById("price");

    let aksi = 0;


    const getProduct = () => {
        new ProductsService($http).getAll(pageSize, PageNumber, res => {
            const { data, totalPages } = res;
            initData(data, totalPages);
        });
    }
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
                new ProductsService($http).getAllByName(value, pageSize, PageNumber, res => {
                    const { data, totalPages } = res;
                    initData(data, totalPages);
                });
            } else {
                getProduct();
            }
        } else if (dataaction === 'price-action') {

            convertToRupiah()
        }
    });

    const convertToRupiah = () => {
        var value = price.value.replace(/[^,\d]/g, '').toString(); // Hapus karakter selain angka dan koma
        value = value.replace(/,/g, '');

        let split = value.split('.');
        let sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        let separator;
        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        price.value = 'Rp. ' + rupiah;
    }
    document.addEventListener("click", res => {
        const dataaction = res.target.getAttribute("data-action");
        if (dataaction === 'open-form') {
            clearForm();
        } else if (dataaction === 'save-form') {
            if (aksi == 1) {
                updateProduct();
                return;
            }
            postProduct();
        } else if (dataaction === 'cancel-form') {
            resetElement();
        } else if (dataaction === 'detail-product') {
            const dataid = res.target.getAttribute("data-value");
            detailProduct(dataid);
        } else if (dataaction === 'hapus-product') {
            const dataid = res.target.getAttribute("data-value");
            hapusProduct(dataid);
        }
    });

    const hapusProduct = (dataid) => {
        new ProductsService($http).delete(dataid, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Hapus data gagal !",
                    icon: "error"
                });
                return;
            }
            getSuplier();
        });
    }

    const detailProduct = (dataid) => {
        new ProductsService($http).getAllById(dataid, res => {
            const { data } = res;
            if (data.length > 0) {
                const json = data[0];
                id = json.id;
                aksi = 1;
                openElementForm();
                const imageName = json.qrcode.split("/").pop();
                const imageNameWithoutExtension = imageName.split('.').slice(0, -1).join('.');
                product[0].value = imageNameWithoutExtension;
                product[1].value = json.name;
                product[2].value = json.idkategori;
                product[3].value = json.description;
                product[4].value = json.price;
                product[5].value = json.stock;
                product[6].value = json.idsatuan;
                product.forEach(element => {
                    element.classList.add("font-12");
                });

            }
        });
    }

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

        setTimeout(() => {
            tbody.innerHTML = "";
            tbody.innerHTML = data.map((row, index) => `
            <tr class='text-center'>
              <td>${index + 1}</td>
              <td>${row.nama_produk}</td>
              <td>${row.stok}</td>
              <td>${row.harga}</td>
              <td>${row.ukuran_ayam}</td>
              <td>${row.bagian_ayam}</td>
              <td>${row.diskon}</td>
              <td>${row.tanggal_masuk}</td>
              <td>${row.tanggal_produksi}</td>
              
              <td>
                        <button class="btn btn-warning" data-action="detail-product" data-value=${row.id}>Detail Data</button>
                        <button class="btn btn-danger" data-action="hapus-product" data-value=${row.id}>Hapus Data</button>
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
                    pageSize = txtelement - 1;
                    checkPageActive();
                });
            });
        }
    };

    const checkPageActive = () => {
        const pageActive = document.querySelector(".active-pagination")
        pageActive.classList.remove("active-pagination");
        const pageNumber = document.getElementsByClassName("page-number");
        pageNumber[pageSize].classList.add("active-pagination");
        if (pageSize === 0) {
            prevPage.setAttribute("disabled", true);
        } else if (pageSize > 0) {
            prevPage.removeAttribute("disabled");
        }
        new SuplierService($http).getAll(pageSize, PageNumber, res => {
            setSkeltonRow(res.data);
        });
    }

    prevPage.addEventListener("click", evt => {
        pageSize--;
        checkPageActive();
    });

    nextPage.addEventListener("click", evt => {
        prevPage.removeAttribute("disabled");
        pageSize++;
        checkPageActive();
    });

    getProduct();

    const resetElement = () => {
        tableElement.classList.remove("hide")
        productForm.classList.add("hide");
        openForm.classList.remove("hide");
        aksi = 0;
    }

    const openElementForm = () => {
        tableElement.classList.add("hide");
        openForm.classList.add("hide");
        productForm.classList.remove("hide");
    }
    const clearForm = () => {
        product.forEach(input => {
            input.value = "";
            input.classList.add("font-12");
        });
        openElementForm();
        aksi = 0;
    }

    const changeBorder = () => {
        const suplierElement = document.querySelectorAll('.product');
        suplierElement.forEach(element => {
            element.addEventListener("input", res => {
                const target = res.target;
                const value = target.value;
                element.classList.remove("error-border")
                let errorMessageElement = target.nextElementSibling;
                let parent = target.parentNode
                if (parent.classList.contains('input-group')) {
                    errorMessageElement = parent.nextElementSibling;
                }
                if (value !== '') {

                    if (errorMessageElement) {
                        errorMessageElement.remove();
                    }
                }
            });
        });
    }
    changeBorder();

    const addMessage = (messages, product) => {
        const errorMessage = document.createElement('span');
        errorMessage.textContent = messages;
        errorMessage.classList.add("text-red");

        let checkInputGroup = product.closest(".input-group");
        let insertAfterElement = checkInputGroup ? checkInputGroup : product;

        const existingErrorMessage = insertAfterElement.parentNode.querySelector(".text-red");
        if (existingErrorMessage) {
            existingErrorMessage.remove();
        }
        insertAfterElement.parentNode.insertBefore(errorMessage, insertAfterElement.nextSibling);
    }
    const validationForm = (messages) => {
        for (let i = 0; i < product.length; i++) {
            if (product[i].value === "" || product[i].value == null) {
                product[i].classList.add("error-border");
                addMessage(messages[i], product[i]);
                return false;
            }
        }
        const fileInput = document.getElementById("foto");
        const files = fileInput.files;
        const existingErrorMessage = fileInput.nextElementSibling;
        if (existingErrorMessage && existingErrorMessage.classList.contains("text-red")) {
            existingErrorMessage.remove();
        }

        if (files.length === 0) {
            const newMessage = "The file is required.";
            const errorMessage = document.createElement('span');
            errorMessage.textContent = newMessage;
            errorMessage.classList.add("text-red");
            fileInput.parentNode.insertBefore(errorMessage, fileInput.nextSibling);
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileType = file.type;

            if (fileType !== "image/jpeg" && fileType !== "image/png") {
                const newMessage = "the format file is jpg,jpeg,png,and pneg";
                const errorMessage = document.createElement('span');
                errorMessage.textContent = newMessage;
                errorMessage.classList.add("text-red");
                fileInput.parentNode.insertBefore(errorMessage, fileInput.nextSibling);
                return false;
            }
        }

        return true;
    }
    const postProduct = () => {
        const message = [];
        var formdata = new FormData();
        product.forEach(element => {
            const elementid = element.getAttribute("id");
            const elementmessage = splitCamelCase(elementid) + " is required";
            message.push(elementmessage);
            formdata.append(elementid, element.value);
        });
        formdata.delete("price");
        let formattedValue = price.value;
        let originalValue = formattedValue.replace(/[^,\d]/g, '').replace(',', '.');
        formdata.append("price", originalValue);
        if (!validationForm(message)) {
            return;
        }

        var file = document.getElementById("foto");
        formdata.append("foto", file.files[0]);
        new ProductsService($http).create(formdata, res => {
            const { success } = res;
            if (!success) {
                swal({
                    "text": "Simpan data gagal !",
                    "icon": "error"
                });
                return;
            }
            clearForm();
            getProduct();
        })

    }

    const updateProduct = () => {
        var formdata = new FormData();
        product.forEach(element => {
            const elementid = element.getAttribute("id");
            const elementmessage = splitCamelCase(elementid) + " is required";
            formdata.append(elementid, element.value);
        });

        const emptyBlob = new Blob([], { type: 'application/octet-stream' });
        const emptyFile = new File([emptyBlob], "empty.bin");
        var file = document.getElementById("foto");
        var fileToUpload;

        if (file.files.length === 0) {
            fileToUpload = emptyFile
        } else {
            fileToUpload = file.files[0];
        }

        formdata.append("foto", fileToUpload);
        formdata.append("id",)
        new ProductsService($http).update(formdata, res => {
            const { success } = res;
            if (!success) {
                swal({
                    "text": "Simpan data gagal !",
                    "icon": "error"
                });
                return;
            }
            clearForm();
            getProduct();
        })
    }
});
