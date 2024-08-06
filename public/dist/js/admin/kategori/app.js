import * as lib from "../../helpers/lib.js";
import KategoriService from "../../services/kategori.js";

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
    const kategori = document.getElementsByClassName("kategori");
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const search = document.getElementById("search");
    let aksi = 0;
    const getCategory = () => {
        new KategoriService($http).getAll(pageSize, PageNumber, res => {
            const { data, totalPages } = res;
            initData(data, totalPages);
        });

    }

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
        new KategoriService($http).getAll(pageSize, PageNumber, res => {
            $scope.kategori = res.data;
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

    search.addEventListener("input", evt => {
        const target = evt.target;
        if (target.value !== '') {
            filterCategoryByName();
        }
    });

    document.addEventListener("click", res => {
        const dataaction = res.target.getAttribute("data-action");
        if (dataaction === 'detail-kategori') {
            const value = res.target.getAttribute("data-value");
            new KategoriService($http).getAllById(value, res => {
                const { data } = res;
                kategori[0].value = data[0].name;
                id = parseInt(value);
                aksi = 1;
            });
        } else if (dataaction === 'hapus-kategori') {
            const value = res.target.getAttribute("data-value");
            new KategoriService($http).delete(value, res => {
                const { success } = res;
                if (!success) {
                    swal({
                        text: "Hapus data gagal !",
                        icon: "error"
                    });
                    return;
                }
                getCategory();
            });
        }
    });

    const filterCategoryByName = () => {
        new KategoriService($http).filterCategoryByName(search.value, pageSize, PageNumber, res => {
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
              <td>${row.name}</td>
              <td>
                        <button class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" data-action="detail-kategori" data-value=${row.id}>Detail Data</button>
                        <button class="btn btn-danger" data-action="hapus-kategori" data-value=${row.id}>Hapus Data</button>
              </td>
            </tr>`);
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

        // event click to page number
        const elementPageNumber = document.querySelectorAll(".page-number");
        let beforeElement = null; // Initialize to null
        if (elementPageNumber) {
            elementPageNumber.forEach(element => {
                element.addEventListener("click", evt => {
                    const txtelement = evt.target.textContent;
                    pageSize = txtelement - 1;
                    checkPageActive();

                });
            });
        }
    }



    getCategory();

    const clearForm = () => {
        kategori[0].value = "";
    }

    const changeBorder = () => {
        const kategoriChange = document.querySelectorAll('.kategori');
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
        for (let i = 0; i < kategori.length; i++) {
            if (kategori[i].value === "" || kategori[i].value == null) {
                kategori[i].classList.add("error-border")
                errorMessage.textContent = messages[i];
                errorMessage.classList.add("text-red");
                errorMessage.classList.add("font-12");
                kategori[i].parentNode.insertBefore(errorMessage, kategori[i].nextSibling);
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

    $scope.editData = (row) => {
        kategori[0].value = row.name;
        aksi = 1;
        id = row.id;
    }

    saveForm.addEventListener("click", evt => {
        if (aksi == 0) {
            postCategory();
            return;
        }
        updateCategory();
    });

    const postCategory = () => {
        if (!validationForm()) {
            return;
        }
        const data = {
            "name": kategori[0].value
        }
        new KategoriService($http).create(data, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Simpan data gagal !",
                    icon: "error"
                });
                return;
            }
            getCategory();
        })
    }

    const updateCategory = () => {
        const data = {
            "name": kategori[0].value
        }
        new KategoriService($http).update(data, id, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Update data gagal !",
                    icon: "error"
                });
                return;
            }
            getCategory();
        })
    }
});
