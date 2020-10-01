const express = require('express'),
      path = require("path"),
      app = express(),
      port = 451,
      fs = require('fs'),
      BOOK_FOLDER = "EBOOKS";
let books;

try {
    books = JSON.parse(fs.readFileSync("./books.json", 'utf-8'));
}
catch {
    console.log("Add books to database with (addBooks.js) before starting the server!");
    return 1;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.htm"));
});

app.get('/read', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "read/index.htm"));
});

app.get('/books', (req, res) => {
    let keyword = req.query.search,
        maxSearch = req.query.maxSearch || 5,
        pag = req.query.page || 1;
    
    if(keyword == null) {
        res.status(200)
           .json(books.slice((((pag - 1) * maxSearch) % books.length)*maxSearch, 
                 (((pag - 1) * maxSearch) % books.length)*maxSearch + maxSearch));
    }
    else {
        let busca = books.filter((e) => e.title.includes(keyword));
        res.status(200)
           .json(busca.slice((((pag - 1) * maxSearch) % busca.length)*maxSearch, 
                 (((pag - 1) * maxSearch) % busca.length)*maxSearch + maxSearch));
    }
});

app.listen(port, () => {
    app.use(express.static(path.join(__dirname, 'public')));
    console.log(`Server at localhost:${port}`);
});