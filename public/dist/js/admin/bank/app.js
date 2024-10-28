import * as lib from "../../helpers/lib.js";
import BankService from "../../services/bank.js";
import JenisService from "../../services/jenis.js";
import StokService from "../../services/stok_masuk.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;
    const openForm = document.getElementById("open-form");
    const bankData = document.querySelectorAll(".bank")
    const prevPage = document.getElementById("prevPage");
    var toast = document.getElementById("toast");
    let totalPagesTemp = 0;
    let tempidbank = 0;
    let add = true;




    const getDataBank = () => {
        new BankService($http).getDataBank(pageSize, PageNumber, res => {
            const { data, totalPages } = res;
            totalPagesTemp = totalPages;
            initData(data, totalPages);
        });
    }

    getDataBank();
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
        // const dataaction = evt.target.getAttribute("data-action");

    });


    document.addEventListener("click", res => {
        const dataaction = res.target.getAttribute("data-action");
        const dataid = res.target.getAttribute("data-value");

        if (dataaction === 'open-form') {
            add = false;
            clearData();
        }
        else if (dataaction === 'save-bank') {
            addBank();
        }
        else if (dataaction === 'detail-bank') {
            add = true;
            tempidbank = dataid;
            detailBank(dataid);
        } else if (dataaction === 'hapus-bank') {
            deleteBank(dataid);
        }
    });


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
              <td>${row.nama_bank}</td>
              <td>${row.nomor_rekening}</td>
              <td>${row.atas_nama}</td>
               <td>
                        <button class="btn btn-warning" data-action="detail-bank" data-value=${row.id} data-toggle="modal" data-target="#bankModal">Detail Data</button>
                        <button class="btn btn-danger" data-action="hapus-bank" data-value=${row.id}>Hapus Data</button>
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
        new BankService($http).getDataBank(pageSize, PageNumber + 1, res => {
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

    const clearData = () => {
        for (var index = 0; index < bankData; index++) {
            bankData[index].value = "";
        }
    }

    const addBank = () => {
        var formData = {};
        if (validationForm()) {
            bankData.forEach(element => {
                formData[element.getAttribute("id")] = element.value;
            })
            if (add) {
                new BankService($http).updateDataBank(formData, tempidbank, res => {
                    const { success } = res;
                    if (!success) {
                        swal({
                            text: "Perbarui data bank gagal",
                            icon: "error"
                        });
                        return;
                    }

                    getDataBank();
                    clearData();
                })
                return;
            }
            new BankService($http).createDataBank(formData, res => {
                const { success } = res;
                if (!success) {
                    swal({
                        text: "Simpan data bank gagal",
                        icon: "error"
                    });
                    return;
                }

                getDataBank();
            })
        }

    }

    const detailBank = (id) => {
        new BankService($http).detailDataBank(id, res => {
            const { data } = res;
            bankData[0].value = data.nama_bank;
            bankData[1].value = data.nomor_rekening;
            bankData[2].value = data.atas_nama;
        });
    }
    const deleteBank = (id) => {
        new BankService($http).deleteDataBank(id, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Hapus data gagal !",
                    icon: "error"
                });
                return;
            }
            getDataBank();
        });
    }

    const changeBorder = () => {
        const suplierElement = document.querySelectorAll('.bank');
        suplierElement.forEach(element => {
            element.addEventListener("input", res => {
                const target = res.target;
                const value = target.value;
                element.classList.remove("error-border")
            });
        });
        const stokElement = document.querySelectorAll(".stok");
        stokElement.forEach(element => {
            element.addEventListener("input", res => {
                element.classList.remove("error-border");
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
        for (let i = 0; i < bankData.length; i++) {
            if (bankData[i].value === "" || bankData[i].value == null) {
                bankData[i].classList.add("error-border");
                var fieldName = bankData[i].getAttribute("name");
                fieldName = fieldName.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase());

                bankData[i].placeholder = `${fieldName} wajib diisi`;
                // addMessage(messages[i], bankData[i]);
                return false;
            }
        }

        return true;
    }
});
