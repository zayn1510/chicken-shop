import * as lib from "../../helpers/lib.js";
import ProductsService from "../../services/products.js";
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
    const productFoto = document.querySelector(".product-foto-form");
    const price = document.getElementById("harga");
    var toast = document.getElementById("toast");
    let totalPagesTemp = 0;
    let aksi = 0;
    var tempidproduk = 0;
    let add = true;


    const getProduct = () => {
        new ProductsService($http).getAll(pageSize, PageNumber, res => {
            const { data, totalPages } = res;
            totalPagesTemp = totalPages;
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


    const resetUploadFoto = () => {
        document.getElementById('uploadBox').style.display = 'block';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('uploadedImage').src = "";
    }
    document.addEventListener("click", res => {
        const dataaction = res.target.getAttribute("data-action");
        const dataid = res.target.getAttribute("data-value");

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
            detailProduct(dataid);
        } else if (dataaction === 'hapus-product') {
            hapusProduct(dataid);
        } else if (dataaction === 'foto-product') {
            tableElement.classList.add("hide");
            productFoto.classList.remove("hide")
            document.getElementById("open-form").classList.remove("btn-primary");
            document.getElementById("open-form").classList.add("btn-danger");
            document.getElementById("open-form").innerHTML = "Kembali";
            add = false;
            getDataPhoto(dataid);
        } else if (dataaction === 'removeupload') {
            resetUploadFoto();
        } else if (dataaction === 'uploadfoto') {
            var fileinput = document.getElementById("fileInput");
            var formData = new FormData();
            formData.append("produk", tempidproduk);
            formData.append("idfoto", 0);
            formData.append("foto", fileinput.files[0]);


            new ProductsService($http).createPhoto(formData, res => {

                const { success } = res;
                if (success) {
                    swal({
                        text: "Tambah Foto Berhasil !",
                        icon: "success"
                    });
                    $('#modalFoto').modal('hide');
                    getDataPhoto(tempidproduk);
                    resetUploadFoto();
                } else {
                    swal({
                        text: "Tambah Foto Gagal !",
                        icon: "error"
                    });
                }

            });

        } else if (dataaction === 'hapus-foto') {
            deletePhoto(dataid);
        } else if (dataaction === 'preview-foto') {
            window.open("api/v1/photo/" + res.target.getAttribute("data-value"), "_blank");
        }
    });

    const getDataPhoto = (produkid) => {
        tempidproduk = produkid;
        new ProductsService($http).getPhoto(10, 0, produkid, res => {
            const { data } = res;
            createTablePhoto(data);
        });
    }

    const hapusProduct = (dataid) => {
        new ProductsService($http).delete(dataid, res => {
            const { success } = res;
            console.info(success);
            if (!success) {
                OpenToast("Hapus data gagal !", "danger");
                return;
            }
            OpenToast("Hapus data berhasil !", "success");
            getProduct();
        });
    }

    const detailProduct = (dataid) => {
        new ProductsService($http).getAllById(dataid, res => {
            const { data } = res;

            if (data) {
                const json = data;
                id = json.id;
                aksi = 1;
                openElementForm();
                product.forEach(element => {
                    element.classList.add("font-12");
                });
                const keys = [
                    "nama_produk", "ukuran_ayam", "bagian_ayam", "deskripsi", "harga", "stok",
                    "diskon", "berat_rata_rata", "umur_ayam",
                    "tanggal_masuk", "tanggal_produksi", "tanggal_kadaluarsa"
                ];
                keys.forEach((key, index) => {
                    product[index].value = json[key];
                });

            }
        });
    }

    const createTablePhoto = (data) => {
        const tableFoto = document.getElementById("table-foto");
        let tbodyfoto = document.createElement("tbody");
        let existingTbody = tableFoto.getElementsByTagName("tbody")[0];
        if (existingTbody) {
            existingTbody.remove();
        }
        tbodyfoto.innerHTML = "";
        tableFoto.append(tbodyfoto);
        const numRowsToDisplay = Math.min(data.length, 10);
        for (let i = 0; i < numRowsToDisplay; i++) {
            const skeletonRow = createSkeletonRow(3);
            tbodyfoto.appendChild(skeletonRow);
        }
        setTimeout(() => {
            tbodyfoto.innerHTML = "";
            if (data.length === 0) {
                tbodyfoto.innerHTML = `
                        <tr class='text-center'>
                            <td colspan="3">Tidak ada data yang tersedia</td>
                        </tr>
                    `;
            } else {
                tbodyfoto.innerHTML += data.map((row, index) => `
                        <tr class='text-center'>
                            <td>${index + 1}</td>
                            <td>${row.media_url}</td>
                            <td>
                                <button class="btn btn-warning" data-action="preview-foto" data-value=${row.id}>Preview Foto</button>
                                <button class="btn btn-danger" data-action="hapus-foto" data-value=${row.id}>Hapus Foto</button>
                            </td>
                        </tr>
                    `).join('');
            }

            tbodyfoto.innerHTML += `
                <tr class='text-center'>
                    <td>
                        ${data.length + Number(1)}
                    </td>
                    <td style="color:red">Belum ada foto</td>
                    <td>
                        <button class="btn btn-success"  data-toggle="modal" data-target="#modalFoto">Tambah Foto</button>
                    </td>
                </tr>
            `;
        }, 1000)
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
                        <button class="btn btn-success" data-action="foto-product" data-value=${row.id}>Foto Produk</button>
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
        new ProductsService($http).getAll(pageSize, PageNumber + 1, res => {
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

    getProduct();

    const resetElement = () => {
        tableElement.classList.remove("hide")
        productForm.classList.add("hide");
        openForm.classList.remove("hide");
        aksi = 0;

    }

    const openElementForm = () => {
        if (!add) {
            tableElement.classList.remove("hide");
            productFoto.classList.add("hide")
            document.getElementById("open-form").classList.add("btn-primary");
            document.getElementById("open-form").classList.remove("btn-danger");
            document.getElementById("open-form").innerHTML = "Tambah Data";
            add = true;
        } else {
            tableElement.classList.add("hide");
            openForm.classList.add("hide");
            productForm.classList.remove("hide");
        }


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
        // const fileInput = document.getElementById("foto");
        // const files = fileInput.files;
        // const existingErrorMessage = fileInput.nextElementSibling;
        // if (existingErrorMessage && existingErrorMessage.classList.contains("text-red")) {
        //     existingErrorMessage.remove();
        // }

        // if (files.length === 0) {
        //     const newMessage = "The file is required.";
        //     const errorMessage = document.createElement('span');
        //     errorMessage.textContent = newMessage;
        //     errorMessage.classList.add("text-red");
        //     fileInput.parentNode.insertBefore(errorMessage, fileInput.nextSibling);
        //     return false;
        // }

        // for (let i = 0; i < files.length; i++) {
        //     const file = files[i];
        //     const fileType = file.type;

        //     if (fileType !== "image/jpeg" && fileType !== "image/png") {
        //         const newMessage = "the format file is jpg,jpeg,png,and pneg";
        //         const errorMessage = document.createElement('span');
        //         errorMessage.textContent = newMessage;
        //         errorMessage.classList.add("text-red");
        //         fileInput.parentNode.insertBefore(errorMessage, fileInput.nextSibling);
        //         return false;
        //     }
        // }

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
        formdata.delete("harga");
        let formattedValue = price.value;
        let originalValue = formattedValue.replace(/[^,\d]/g, '').replace(',', '.');
        formdata.append("harga", originalValue);
        if (!validationForm(message)) {
            return;
        }

        new ProductsService($http).create(formdata, res => {
            const { success } = res;
            if (!success) {
                OpenToast("Simpan data gagal ", "danger");
                console.info(toast);
                return;
            }
            OpenToast("Simpan data berhasil !", "success");
            clearForm();
            getProduct();
        })
    }
    const OpenToast = (message, status) => {
        toast.classList.add("show", status);
        toast.textContent = message;
        setTimeout(function () {
            toast.classList.remove("show", status);
        }, 2000);
    }

    const updateProduct = () => {
        var formdata = [];
        product.forEach((element, index) => {
            const elementid = element.getAttribute("id");
            const elementmessage = splitCamelCase(elementid) + " is required";
            formdata.push({
                [elementid]: element.value
            });

        });
        const mergedObject = Object.assign({}, ...formdata);


        let formattedValue = price.value;
        let originalValue = formattedValue.replace(/[^,\d]/g, '').replace(',', '.');
        mergedObject.harga = originalValue;
        new ProductsService($http).update(mergedObject, id, res => {
            const { success } = res;
            if (!success) {
                OpenToast("Simpan data gagal", "danger");
                return;
            }
            OpenToast("Simpan data berhasil", "success");
            clearForm();
            getProduct();
        })
    }

    const deletePhoto = (idfoto) => {
        new ProductsService($http).deletePhoto(idfoto, tempidproduk, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Hapus foto gagal !",
                    icon: "error"
                });
            }
            getDataPhoto(tempidproduk);
            resetUploadFoto();
        });
    }
});
