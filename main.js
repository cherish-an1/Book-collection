
const myLibrary = [];
const booksContainer = document.querySelector(".booksContainer");
const modal = document.getElementById("myModal");
const addBookButton = document.getElementById("addBookButton");
const modalSpan = document.getElementsByClassName("close")[0];
const addBookForm = document.getElementById("addBookForm");
const formInput = document.getElementsByClassName("formInput");
const deleteButton = document.getElementsByClassName(".deleteButton");

function Book(id, title, author, numOfPages, status){
    this.id = id;
    this.title = title,
    this.author = author,
    this.numOfPages = numOfPages,
    this.status = status
}

Book.prototype.changeStatus = function(){
    
    this.status = this.status ? false : true;
    
    displayBooks();
};

function addBookToLibrary(book){
    myLibrary.push(book);

    displayBooks();
}

function displayBooks(){
    booksContainer.innerHTML = "";

    for(let item of myLibrary){
        const container = document.createElement("div");
        container.classList.add("bookContainer");

        const status = document.createElement("button");
        status.classList.add("status");
        const statusNode = document.createTextNode(`${item.status ? "Read" : "Not Read"}`);
        status.classList.add(item.status ? "read" : "notRead");
        status.appendChild(statusNode);

        status.addEventListener("click", function(){
            item.changeStatus();
        })
        
        const header = document.createElement("h1");
        header.classList.add("header");
        const headerNode = document.createTextNode(`${item.title}`);
        header.appendChild(headerNode);

        const author = document.createElement("p");
        author.classList.add("author");
        const authorNode = document.createTextNode(`by ${item.author}.`);
        author.appendChild(authorNode);

        const pages = document.createElement("p");
        pages.classList.add("pages");
        const pagesNode = document.createTextNode(`${item.numOfPages} pages`);
        pages.appendChild(pagesNode);

        const deleteButtonContainer = document.createElement("div");
        deleteButtonContainer.classList.add("deleteButtonContainer");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        const deleteButtonNode = document.createTextNode(`Delete Book`);
        deleteButton.appendChild(deleteButtonNode);
        
        // Delete Book Handler
        deleteButton.addEventListener("click", function(){
            myLibrary.splice(myLibrary.findIndex(currLibrary => {
                return currLibrary.id === item.id;
            }), 1);

            displayBooks();
        })

        container.appendChild(status);
        container.appendChild(header);
        container.appendChild(author);
        container.appendChild(pages);
        deleteButtonContainer.appendChild(deleteButton);
        container.appendChild(deleteButtonContainer);

        booksContainer.appendChild(container);
    }
}


// Modal Handlers
addBookButton.onclick = () => {
    modal.style.display = "block";
};

modalSpan.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if(e.target == modal){
        modal.style.display = "none";
        for(let item of formInput){
            item.value = "";
        }
    }
};

// Form Handler
addBookForm.addEventListener("submit", function(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);

    const bookTitle = formData.get('bookTitle');
    const bookAuthor = formData.get('bookAuthor');
    const bookPages = formData.get('bookPages');
    const readStatus = formData.get("status");

    const goat = `${new Date().getTime()}-${bookTitle.split(' ').join('')}`;

    const newBook = new Book(goat, bookTitle, bookAuthor, bookPages, readStatus === "read" ? true : false);
    addBookToLibrary(newBook);

    modal.style.display = "none";

    for(let item of formInput){
        item.value = "";
    }
} );

