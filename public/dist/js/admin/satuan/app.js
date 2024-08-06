import * as lib from "../../helpers/lib.js";
import SatuanService from "../../services/satuan.js";

var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    const colomn = [
        "name"
    ];

    const messages = [
        "name is required"
    ]

    let id = 0;
    let pageSize = 0;
    let PageNumber = 10;
    const openForm = document.getElementById("open-form");
    const saveForm = document.getElementById("save-form");
    const satuan = document.getElementsByClassName("satuan");
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    let aksi = 0;


    const getSatuan = () => {
        new SatuanService($http).getAll(pageSize, PageNumber, res => {
            const { data, totalPages } = res;
            initData(data, totalPages);
        });

    }
    const createSkeletonRow = () => {
        const row = document.createElement("tr");
        row.classList.add("skeleton-row");
        for (let i = 0; i < 4; i++) {
            const cell = document.createElement("td");
            cell.classList.add("skeleton-loading");
            row.appendChild(cell);
        }
        return row;
    }


    document.addEventListener("click", res => {
        const dataaction = res.target.getAttribute("data-action");
        if (dataaction === 'detail-satuan') {
            const value = res.target.getAttribute("data-value");
            new SatuanService($http).getAllById(value, res => {
                const { data } = res;
                satuan[0].value = data[0].name;
                id = parseInt(data[0].id);
                aksi = 1;
            });
        } else if (dataaction === 'hapus-satuan') {
            const value = res.target.getAttribute("data-value");
            new SatuanService($http).delete(value, res => {
                const { success } = res;
                if (!success) {
                    swal({
                        text: "Hapus data gagal !",
                        icon: "error"
                    });
                    return;
                }
                getSatuan();
            });
        }
    });


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
              <td>${index + 1}</td >
              <td>${row.name}</td>
              <td>
                        <button class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" data-action="detail-satuan" data-value=${row.id}>Detail Data</button>
                        <button class="btn btn-danger" data-action="hapus-satuan" data-value=${row.id}>Hapus Data</button>
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
        new SatuanService($http).getAll(pageSize, PageNumber, res => {
            setSkeltonRow(res.data);
        });
    }

    prevPage.addEventListener("click", evt => {
        pageSize--;
        ch
    });

    nextPage.addEventListener("click", evt => {
        prevPage.removeAttribute("disabled");
        pageSize++;
        checkPageActive();
    });

    getSatuan();

    const clearForm = () => {
        satuan[0].value = "";
    }

    const changeBorder = () => {
        const kategoriChange = document.querySelectorAll('.satuan');
        kategoriChange.forEach(element => {
            element.addEventListener("input", res => {
                const target = res.target;
                const value = target.value;
                element.classList.remove("error-border")
                if (value !== '') {
                    const errorMessageElement = element.nextElementSibling;
                    if (errorMessageElement) {
                        errorMessageElement.remove();
                    }
                }
            });
        });
    }

    changeBorder();

    const validationForm = () => {
        const errorMessage = document.createElement('p');
        for (let i = 0; i < satuan.length; i++) {
            if (satuan[i].value === "" || satuan[i].value == null) {
                satuan[i].classList.add("error-border")
                errorMessage.textContent = messages[i];
                errorMessage.classList.add("text-red");
                errorMessage.classList.add("font-12");
                satuan[i].parentNode.insertBefore(errorMessage, satuan[i].nextSibling);
                return false;
            } else {
                errorMessage.classList.remove("text-red");
            }
        }
        return true;
    }

    openForm.addEventListener("click", evt => {
        aksi = 0;
        clearForm();
    });

    saveForm.addEventListener("click", evt => {
        if (aksi == 0) {
            postSatuan();
            return;
        }
        updateSatuan();
    });

    const postSatuan = () => {
        if (!validationForm()) {
            return;
        }
        const data = {
            "name": satuan[0].value
        }
        new SatuanService($http).create(data, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Simpan data gagal !",
                    icon: "error"
                });
                return;
            }
            getSatuan();
        })
    }

    const updateSatuan = () => {
        const data = {
            "name": satuan[0].value
        }
        new SatuanService($http).update(data, id, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Update data gagal !",
                    icon: "error"
                });
                return;
            }
            getSatuan();
        })
    }
});
