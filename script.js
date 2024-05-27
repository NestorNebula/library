const myLibrary = [];

const openform = document.querySelector("#openform");
const dialog = document.querySelector("#dialog");
const submit = document.querySelector("#submit");

const container = document.querySelector(".container");

openform.addEventListener("click", () => {
    dialog.showModal();
})

submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (read.checked) {
        read.value = "read";
    } else {
        read.value = "not read";
    }
    addBookToLibrary(title.value, author.value, pages.value, read.value);
    displayBooks();
    dialog.close();

})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.changeReadStatus = function() {
        if (this.read === "read") {
            this.read = "not read";
        } else {
            this.read = "read";
        }
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    container.textContent = '';
    let count = 0;
    myLibrary.forEach((book) => {
        const bookdiv = document.createElement("div");
        bookdiv.setAttribute("class", "book");
        bookdiv.setAttribute("id", count);
        for (info in book) {
            const book_info = document.createElement("div");
            if (info === "title") {
                book_info.setAttribute("class", "title");
                book_info.textContent = "Title: "
            } else if (info === "author") {
                book_info.setAttribute("class", "author");
                book_info.textContent = "Author: "
            } else if (info === "pages") {
                book_info.setAttribute("class", "pages");
                book_info.textContent = "Pages: "
            } else {
                book_info.setAttribute("class", "read");
                book_info.textContent = "Read Status: "
            }
            book_info.textContent += book[info];
            bookdiv.append(book_info);
        }
        const cancel_button = document.createElement("button");
        cancel_button.setAttribute("class", "cancel");
        cancel_button.textContent = "Remove";
        cancel_button.addEventListener("click", () => {
            myLibrary.splice(bookdiv.id, 1);
            displayBooks();
        })

        const read_status = document.createElement("button");
        read_status.setAttribute("class", "read-status");
        read_status.textContent = "Change Read Status";
        read_status.addEventListener("click",() => {
            myLibrary[bookdiv.id].changeReadStatus();
            displayBooks();
        })

        bookdiv.append(cancel_button);
        bookdiv.append(read_status);
        container.append(bookdiv);
        count++;
    })
}