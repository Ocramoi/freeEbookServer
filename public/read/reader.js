const reader = document.getElementById("reader"),
      leftBut = document.getElementById("leftBut"),
      rightBut = document.getElementById("rightBut"),
      bookTitle = new URLSearchParams(window.location.search).get('book');

let book = ePub(`${window.location.origin}/EBOOKS/${bookTitle}.epub`),
    render = book.renderTo("reader", {
        flow: "paginated",
        width: "100%", 
        height: "100%"
    }),
    displayed = render.display();

displayStart();

leftBut.addEventListener("click", (e) => {
    render.prev();
});

rightBut.addEventListener("click", (e) => {
    render.next();
});

function displayStart() {
    if (!displayed) {
        alert("There was a problem while loading the content, please try again!");
        return;
    }
}
