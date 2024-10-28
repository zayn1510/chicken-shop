export const createElement = (element, column) => {
    element.setAttribute("name", column);
    element.setAttribute("id", column);
}

export const createPagination = () => {
    const pageNumber = document.createElement("div");
    $(pageNumber).addClass("page-number");
    return pageNumber;
}

export const initPagination = (totalPages, a) => {
    var objek = "pages";
    if (a !== null) {
        objek = a;
    }
    const pageElement = document.getElementsByClassName(objek);
    $(pageElement).empty();
    for (let i = 1; i <= totalPages; i++) {
        const paginationElement = createPagination(i);
        $(paginationElement).text(i);

        $(pageElement).append(paginationElement);
        if (i == 1) {
            $(paginationElement).addClass("active-pagination");
        }
    }
    return pageElement;
}

export const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number);
}
export const formatDate = (date) => {
    const format = new Date(date);
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta'
    };
    return format.toLocaleString('id-ID', options);
}
