import * as lib from "../../helpers/lib.js";
import JenisService from "../../services/jenis.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;
    const openForm = document.getElementById("open-form");
    const jenisData = document.querySelectorAll(".jenis")
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const tableElement = document.querySelector(".table-jenis");
    const price = document.getElementById("harga");
    var toast = document.getElementById("toast");
    let totalPagesTemp = 0;
    let aksi = 0;
    var tempidproduk = 0;
    let add = true;


    const getDataJenis = () => {
        new JenisService($http).getDataJenis(pageSize, PageNumber, res => {
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


    document.addEventListener("click", res => {
        const dataaction = res.target.getAttribute("data-action");
        const dataid = res.target.getAttribute("data-value");

        if (dataaction === 'open-form') {
            clearForm();
        } else if (dataaction === 'save-form') {
            if (aksi == 1) {
                updateDataJenis();
                return;
            }
            addJenisAyam();
        } else if (dataaction === 'cancel-form') {
            resetElement();
        } else if (dataaction === 'detail-jenis') {
            detailJenis(dataid);
        } else if (dataaction === 'hapus-product') {
            hapusProduct(dataid);
        } else if (dataaction === 'hapus-jenis') {
            deleteJenis(dataid);
        } else if (dataaction === 'preview-foto') {
            window.open("api/v1/photo/" + res.target.getAttribute("data-value"), "_blank");
        }
    });


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

    const detailJenis = (dataid) => {
        new JenisService($http).detailDataJenis(dataid, res => {
            const { data } = res;
            if (data) {
                const json = data;
                id = json.id;
                aksi = 1;
                jenisData.forEach(element => {
                    element.classList.add("font-12");
                });
                const keys = ["jenis", "keterangan", "berat", "harga"];
                keys.forEach((key, index) => {
                    jenisData[index].value = json[key];
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
              <td>${row.jenis}</td>
              <td>${row.keterangan}</td>
              <td>${row.berat}</td>
              <td>${row.harga}</td>
              <td>
                        <button class="btn btn-warning" data-action="detail-jenis" data-value=${row.id} data-toggle="modal" data-target="#jenisModal">Detail Data</button>
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

    getDataJenis();

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

    const addMessage = (messages, jenisData) => {
        const errorMessage = document.createElement('span');
        errorMessage.textContent = messages;
        errorMessage.classList.add("text-red");
        errorMessage.classList.add("font-12");

        let checkInputGroup = jenisData.closest(".input-group");
        let insertAfterElement = checkInputGroup ? checkInputGroup : jenisData;

        const existingErrorMessage = insertAfterElement.parentNode.querySelector(".text-red");
        if (existingErrorMessage) {
            existingErrorMessage.remove();
        }
        insertAfterElement.parentNode.insertBefore(errorMessage, insertAfterElement.nextSibling);
    }
    const validationForm = (messages) => {
        for (let i = 0; i < jenisData.length; i++) {
            if (jenisData[i].value === "" || jenisData[i].value == null) {
                jenisData[i].classList.add("error-border");
                addMessage(messages[i], jenisData[i]);
                return false;
            }
        }

        return true;
    }
    const addJenisAyam = () => {
        const message = [];
        let formdata = {};

        jenisData.forEach((element) => {
            const elementid = element.getAttribute("id");
            const elementvalue = element.value || "";
            formdata[elementid] = elementvalue;
        });
        let formattedValue = price.value;
        let originalValue = formattedValue.replace(/[^,\d]/g, '').replace(',', '.');
        formdata.harga = originalValue;
        if (!validationForm(message)) {
            return;
        }

        new JenisService($http).createDataJenis(formdata, res => {
            const { success } = res;
            if (!success) {
                OpenToast("Simpan data gagal ", "danger");
                console.info(toast);
                return;
            }
            OpenToast("Simpan data berhasil !", "success");
            getDataJenis();
            clearForm();
        })
    }

    const OpenToast = (message, status) => {
        toast.classList.add("show", status);
        toast.textContent = message;
        setTimeout(function () {
            toast.classList.remove("show", status);
        }, 2000);
    }

    const updateDataJenis = () => {
        let formdata = {};
        jenisData.forEach((element) => {
            const elementid = element.getAttribute("id");
            const elementvalue = element.value || "";
            formdata[elementid] = elementvalue;
        });
        let formattedValue = price.value;
        let originalValue = formattedValue.replace(/[^,\d]/g, '').replace(',', '.');
        formdata.harga = originalValue;
        new JenisService($http).updateDataJenis(formdata, id, res => {
            const { success } = res;
            if (!success) {
                OpenToast("Simpan data gagal", "danger");
                return;
            }
            OpenToast("Simpan data berhasil", "success");
            getDataJenis
        })
    }

    const deleteJenis = (dataid) => {
        new JenisService($http).deleteDataJenis(dataid, res => {
            const { success } = res;
            if (!success) {
                OpenToast("Hapus data gagal", "danger");
                return;
            }
            OpenToast("Hapus data berhasil", "success");
            getDataJenis();
        })
    }
});
