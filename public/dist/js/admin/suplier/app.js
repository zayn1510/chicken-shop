import * as lib from "../../helpers/lib.js";
import SuplierService from "../../services/suplier.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {


    let id = 0;
    let pageSize = 0;
    let PageNumber = 10;
    const openForm = document.getElementById("open-form");
    const saveForm = document.getElementById("save-form");
    const suplier = document.querySelectorAll(".suplier")
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const suplierForm = document.querySelector(".suplier-form");
    const tableElement = document.querySelector(".table-suplier");
    let aksi = 0;


    const getSuplier = () => {
        new SuplierService($http).getAll(pageSize, PageNumber, res => {
            const { data, totalPages } = res;
            initData(data, totalPages);
        });

    }
    const createSkeletonRow = () => {
        const row = document.createElement("tr");
        row.classList.add("skeleton-row");
        for (let i = 0; i < 7; i++) {
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
                new SuplierService($http).getAllByName(pageSize, PageNumber, value, res => {
                    const { data, totalPages } = res;
                    initData(data, totalPages);
                });
            } else {
                getSuplier();
            }
        }
    });
    document.addEventListener("click", res => {
        const dataaction = res.target.getAttribute("data-action");
        if (dataaction === 'detail-satuan') {
            const value = res.target.getAttribute("data-value");
            new SuplierService($http).getAllById(value, res => {
                const { data } = res;
                satuan[0].value = data[0].name;
                id = parseInt(data[0].id);
                aksi = 1;
            });
        } else if (dataaction === 'hapus-satuan') {
            const value = res.target.getAttribute("data-value");
            new SuplierService($http).delete(value, res => {
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
        } else if (dataaction === 'open-form') {
            clearForm();
        } else if (dataaction === 'save-form') {
            if (aksi == 1) {
                updateSuplier();
                return;
            }
            postSuplier();
        } else if (dataaction === 'cancel-form') {
            resetElement();
        } else if (dataaction === 'detail-suplier') {
            const dataid = res.target.getAttribute("data-value");
            detailSuplier(dataid);
        } else if (dataaction === 'hapus-suplier') {
            const dataid = res.target.getAttribute("data-value");
            hapusSuplier(dataid);
        }
    });

    const hapusSuplier = (dataid) => {
        new SuplierService($http).delete(dataid, res => {
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

    const detailSuplier = (dataid) => {
        new SuplierService($http).getAllById(dataid, res => {
            const { data } = res;
            if (data.length > 0) {
                const json = data[0];
                id = json.id;
                suplier[0].value = json.name;
                suplier[1].value = json.jenis_usaha;
                suplier[2].value = json.email;
                suplier[3].value = json.npwp;
                suplier[4].value = json.kota;
                suplier[5].value = json.provinsi;
                suplier[6].value = json.kode_pos;
                suplier[7].value = json.negara;
                suplier[8].value = json.alamat;
                suplier[9].value = json.phone;
                suplier[10].value = json.website;
                suplier[11].value = json.kontak_utama;
                suplier[12].value = json.kontak_jabatan;
                suplier[13].value = json.status;
                suplier[14].value = json.kontak_alamat;
                openElementForm();
                suplier.forEach(input => {
                    input.classList.add("font-12");
                });
                aksi = 1;
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
            const skeletonRow = createSkeletonRow();
            tbody.appendChild(skeletonRow);
        }

        setTimeout(() => {
            tbody.innerHTML = "";
            tbody.innerHTML = data.map((row, index) => `
            <tr class='text-center'>
              <td>${index + 1}</td>
              <td>${row.npwp}</td>
              <td>${row.name}</td>
              <td>${row.alamat}</td>
              <td>${row.email}</td>
              <td>${row.jenis_usaha}</td>
              <td>
                        <button class="btn btn-warning" data-action="detail-suplier" data-value=${row.id}>Detail Data</button>
                        <button class="btn btn-danger" data-action="hapus-suplier" data-value=${row.id}>Hapus Data</button>
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

    getSuplier();

    const resetElement = () => {
        tableElement.classList.remove("hide")
        suplierForm.classList.add("hide");
        openForm.classList.remove("hide");
        aksi = 0;
    }

    const openElementForm = () => {
        tableElement.classList.add("hide");
        openForm.classList.add("hide");
        suplierForm.classList.remove("hide");
    }
    const clearForm = () => {
        suplier.forEach(input => {
            input.value = "";
            input.classList.add("font-12");
        });
        openElementForm();
        aksi = 0;
    }

    const changeBorder = () => {
        const suplierElement = document.querySelectorAll('.suplier');
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
    const validationForm = (messages) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        for (let i = 0; i < suplier.length; i++) {
            if (suplier[i].value === "" || suplier[i].value == null) {
                suplier[i].classList.add("error-border");

                const errorMessage = document.createElement('span');
                errorMessage.textContent = messages[i];
                errorMessage.classList.add("text-red");

                let checkInputGroup = suplier[i].closest(".input-group");
                let insertAfterElement = checkInputGroup ? checkInputGroup : suplier[i];


                const existingErrorMessage = insertAfterElement.parentNode.querySelector(".text-red");
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }

                insertAfterElement.parentNode.insertBefore(errorMessage, insertAfterElement.nextSibling);

                return false;
            }
        }

        if (!emailPattern.test(suplier[2].value)) {
            suplier[2].classList.add("error-border");
            const errorMessage = document.createElement('span');
            errorMessage.textContent = "Format email tidak sesuai.";
            errorMessage.classList.add("text-red");
            let checkInputGroup = suplier[2].closest(".input-group");
            let insertAfterElement = checkInputGroup ? checkInputGroup : suplier[2];

            const existingErrorMessage = insertAfterElement.parentNode.querySelector(".text-red");
            if (existingErrorMessage) {
                existingErrorMessage.remove();
            }

            insertAfterElement.parentNode.insertBefore(errorMessage, insertAfterElement.nextSibling);
            return false;
        }
        return true;
    }
    const postSuplier = () => {
        const message = [];
        const data = {};
        suplier.forEach(element => {
            const elementid = element.getAttribute("id");
            const elementmessage = splitCamelCase(elementid) + " is required";
            message.push(elementmessage);
            data[elementid] = element.value;
        });
        if (!validationForm(message)) {
            return;
        }

        new SuplierService($http).create(data, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Simpan data gagal !",
                    icon: "error"
                });
                return;
            }
            getSuplier();
            clearForm();
        })
    }

    const updateSuplier = () => {
        const data = {};
        suplier.forEach(element => {
            const elementid = element.getAttribute("id");
            data[elementid] = element.value;
        });
        new SuplierService($http).update(data, id, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Update data gagal !",
                    icon: "error"
                });
                return;
            }
            getSuplier();
        })
    }
});
