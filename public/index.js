const searchBox = document.getElementById("searchBox"),
      searchButton = document.getElementById("searchButton"),
      bookDisplay = document.getElementById("bookDisplay"),
      pages = document.getElementById("pages"),
      currentPage = document.getElementById("currentPage"),
      page = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;

searchBox.addEventListener("keyup", e => {
    searchBook(searchBox.value);
});

searchButton.addEventListener("click", e => {
    searchBook(searchBox.value);
});

currentPage.innerHTML = page;
if (page == 1)
    pages.getElementsByTagName("a")[0].style = "color: grey; cursor: not-allowed !important;";

pages.getElementsByTagName("a")[0].href = `?page=${page - 1}`;
pages.getElementsByTagName("a")[1].href = `?page=${page + 1}`;

function searchBook(title) 
{
    bookDisplay.innerHTML = "";
    let bookReq = new XMLHttpRequest();
    bookReq.open("GET", `books?search=${title}`, true);
    bookReq.send();
    bookReq.responseType = "json";
    bookReq.onload = e => {
        if(bookReq.status == 200)
            loadBooks(bookReq.response);
    };
}

function loadBooks(bookList)
{
    bookList.forEach(book => {
        let bookElem = document.createElement("div");
        bookElem.className = "books";
        bookElem.innerHTML = generateBookElement(book.title, book.link);
        bookDisplay.appendChild(bookElem);
    });
}

function generateBookElement(title, link) {
    return `<span id="bookTitle" style="grid-area: title;">${title}</span>
            <a href=./read?book=${title} style="grid-area: readBut;">Read</a>
            <a href=./${link} download style="grid-area: downloadBut;">Download</a>`;
}

searchBook("");