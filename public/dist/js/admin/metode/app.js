import * as lib from "../../helpers/lib.js";
import JenisService from "../../services/jenis.js";
import MetodeService from "../../services/metode.js";
var app = angular.module("homeApp", ['ngRoute']);
app.controller("homeController", ($scope, $http) => {

    let id = 0;
    let pageSize = 10;
    let PageNumber = 0;
    const openForm = document.getElementById("open-form");
    const metodeData = document.querySelectorAll(".metode")
    const prevPage = document.getElementById("prevPage");
    var toast = document.getElementById("toast");
    let totalPagesTemp = 0;
    let tempidmetode = 0;
    let add = true;




    const getDataMetode = () => {
        new MetodeService($http).getDataMetode(pageSize, PageNumber, res => {
            const { data, totalPages } = res;
            totalPagesTemp = totalPages;
            initData(data, totalPages);
        });
    }

    getDataMetode();
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
        else if (dataaction === 'save-metode') {
            addBank();
        }
        else if (dataaction === 'detail-metode') {
            add = true;
            tempidmetode = dataid;
            detailMetode(dataid);
        } else if (dataaction === 'hapus-metode') {
            deleteMetode(dataid);
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
              <td>${row.nama_metode}</td>
              <td>${row.deskripsi}</td>
               <td>
                        <button class="btn btn-warning" data-action="detail-metode" data-value=${row.id} data-toggle="modal" data-target="#metodeModal">Detail Data</button>
                        <button class="btn btn-danger" data-action="hapus-metode" data-value=${row.id}>Hapus Data</button>
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
        new MetodeService($http).getDataMetode(pageSize, PageNumber + 1, res => {
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
        for (var index = 0; index < metodeData.length; index++) {
            metodeData[index].value = "";
        }
    }
    const addBank = () => {
        var formData = {};
        if (validationForm()) {
            metodeData.forEach(element => {
                formData[element.getAttribute("id")] = element.value;
            })
            if (add) {
                new MetodeService($http).updateDataMetode(formData, tempidmetode, res => {
                    const { success } = res;
                    if (!success) {
                        swal({
                            text: "Perbarui data metode gagal",
                            icon: "error"
                        });
                        return;
                    }
                    getDataMetode();
                })
                return;
            }
            new MetodeService($http).createDataMetode(formData, res => {
                const { success } = res;
                if (!success) {
                    swal({
                        text: "Simpan data metode gagal",
                        icon: "error"
                    });
                    return;
                }

                getDataMetode();
                clearData();
            })
        }

    }

    const detailMetode = (id) => {
        new MetodeService($http).detailDataMetode(id, res => {
            const { data } = res;
            metodeData[0].value = data.nama_metode;
            metodeData[1].value = data.deskripsi;

        });
    }
    const deleteMetode = (id) => {
        new MetodeService($http).deleteDataMetode(id, res => {
            const { success } = res;
            if (!success) {
                swal({
                    text: "Hapus data gagal !",
                    icon: "error"
                });
                return;
            }
            getDataMetode();
        });
    }

    const changeBorder = () => {
        const metodeElement = document.querySelectorAll('.metode');
        metodeElement.forEach(element => {
            element.addEventListener("input", res => {
                const target = res.target;
                const value = target.value;
                element.classList.remove("error-border")
            });
        });
    }
    changeBorder();
    const validationForm = (messages) => {
        for (let i = 0; i < metodeData.length; i++) {
            if (metodeData[i].value === "" || metodeData[i].value == null) {
                metodeData[i].classList.add("error-border");
                var fieldName = metodeData[i].getAttribute("name");
                fieldName = fieldName.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase());

                metodeData[i].placeholder = `${fieldName} wajib diisi`;
                // addMessage(messages[i], bankData[i]);
                return false;
            }
        }

        return true;
    }
});
