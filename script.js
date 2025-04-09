document.addEventListener("DOMContentLoaded", () => {
    const books = document.querySelectorAll(".book");
    const highlightBtn = document.querySelector("#highlightButton");
    const resetBtn = document.querySelector("#resetButton");
    const clearBtn = document.querySelector("#clearButton");

    // ----- LOAD BOOKS -----
    const container = document.getElementById('book-container');
    const template = document.querySelector('.card-template');

    container.innerHTML = '';

    fetch('books.json')
      .then(response => response.json())
      .then(books => {
        books.forEach(book => {

     const colDiv = template.cloneNode(true);
     colDiv.style.display = 'block';
     colDiv.classList.remove('card-template'); 

     const card = colDiv.querySelector('.book');
     const titleLink = card.querySelector('.book-title');
     const authorPara = card.querySelector('.book-author');
     const coverImg = card.querySelector('.book-cover');

     titleLink.textContent = book.title;
     titleLink.href = book.goodreads_url;
     authorPara.textContent = 'by ' + book.author;

     coverImg.src = book.cover_image;
     coverImg.alt = book.title + " cover";

     container.appendChild(colDiv);
         });
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
  

    // ----- EVENTS -----
    highlightBtn.addEventListener("click", () => {
      books.forEach(book => {
        const title = book.querySelector("h2").textContent;
        if (title.length > 20) {
          book.classList.remove("border-primary");
          book.classList.add("border-danger", "border-3");
        }
      });
    });
  
    resetBtn.addEventListener("click", () => {
      books.forEach(book => {
        book.classList.remove("border-danger", "border-3", "bg-info", "text-white", "d-none");
        book.classList.add("border-primary");
      });
      searchInput.value = "";
    });
  
    books.forEach(book => {
      book.addEventListener("click", () => {
        book.classList.add("bg-info", "text-white");
        setTimeout(() => {
          book.classList.remove("bg-info", "text-white");
        }, 1000);
      });
    });
  
    // ----- SEARCH LOGIC -----
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      books.forEach(book => {
        const title = book.querySelector("h2").textContent.toLowerCase();
        book.closest(".col").classList.toggle("d-none", !title.includes(query));
      });
    });
  
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      books.forEach(book => {
        book.closest(".col").classList.remove("d-none");
      });
    });
  });
  