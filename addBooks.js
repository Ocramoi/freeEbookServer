const fs = require('fs'),
      path = require("path"),
      dir = "BOOKS";

let books = [];

addFromDir();

async function addFromDir() {
    fs.readdir(path.join(__dirname, "public", dir), (err, files) => {
        if (err) {
            throw err;
        }

        addFiles(files);
    });
}

async function addFiles(files) {
    for (const file of files) {
        await addFile(file);
    }

    books.sort((a, b) => (a.title > b.title) ? 1 : -1 )
    fs.writeFileSync('./books.json', JSON.stringify(books), 'utf-8');
}

async function addFile(file) 
{
    if (file.slice(file.length - 5) == ".epub") {
        let book = {
            "title": file.slice(0, file.length - 5),
            "link": dir + "/" + file
        };
        books.push(book);
    }
}