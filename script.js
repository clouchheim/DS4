document.addEventListener("DOMContentLoaded", () => {
    const books = document.querySelectorAll(".book");
    const titleSort = document.querySelector("#titleSort");
    const authorSort = document.querySelector("#authorSort");
    const pubSort = document.querySelector("#pubSort");
    const lengthSort = document.querySelector("#lengthSort");

    const clearBtn = document.querySelector("#clearButton");

    // ----- LOAD BOOKS -----
    const container = document.getElementById('book-container');
    const template = document.querySelector('.card-template');

    container.innerHTML = '';

    function resetTitleSort () {
      titleSort.textContent = "Sort by title";
    }
    function resetAuthorSort () {
      authorSort.textContent = "Sort by author";
    }
    function resetPubSort () {
      pubSort.textContent = "Sort by publication date";
    }
    function resetLengthSort () {
      lengthSort.textContent = "Sort by length";
    }

    function displayBooks (books, additional_info = "None") {
      books.forEach(book => {
        const colDiv = template.cloneNode(true);
        colDiv.style.display = 'block';
        colDiv.classList.remove('card-template'); 
        
        const card = colDiv.querySelector('.book');
        const titleLink = card.querySelector('.book-title');
        const authorPara = card.querySelector('.book-author');
        const additional = card.querySelector('.book-additional');
        const coverImg = card.querySelector('.book-cover');
        const button = card.querySelector('button');
        
        titleLink.textContent = book.title;
        titleLink.href = book.goodreads_url;
        authorPara.textContent = 'by ' + book.author;

        if (additional_info === "None") {
          additional.style.display = "none";
        } else if (additional_info === "Date") {
          additional.style.display = "block";
          additional.textContent = "Published: " + book.year_published;
        } else if (additional_info === "Pages") {
          additional.style.display = "block";
          additional.textContent = "Length: " + book.pages;
        } else if (additional_info === "Genres") {
          additional.style.display = "block";
          additional.textContent = "Genres: " + book.genres.join().replace(/,/g, ', ');
        }
        
        coverImg.src = book.cover_image;
        coverImg.alt = book.title + " cover";
        
        // data for the Modal Button
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#learn-more-modal');
        button.addEventListener('click', () => {
          document.getElementById('modalTitle').textContent = book.title;
          document.querySelector('.modal-body .book-author').textContent = 'Author: ' + book.author;
          document.querySelector('.modal-body .book-genre').textContent = 
            'Genre: ' + (Array.isArray(book.genres) ? book.genres.join(', ') : 'N/A');
          document.querySelector('.modal-body .book-date').textContent = 'Published: ' + book.year_published;
          document.querySelector('.modal-body .book-pages').textContent = 'Length: ' + book.pages + ' pages';
          document.querySelector('.modal-body .book-description').textContent = book.description;
          document.getElementById('good-reads-link').href = book.goodreads_url;
        });
        
        container.appendChild(colDiv);
        });  
    }

    fetch('books.json')
      .then(response => response.json())
      .then(books => {

        books.sort((a, b) => a.title.localeCompare(b.title)); // had them populate alphabetically on default
        titleSort.textContent = "Sort by title (A → Z)";
        displayBooks(books);
              
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
  

    // ----- EVENTS -----
    titleSort.addEventListener("click", () => {
      resetAuthorSort();
      resetPubSort();
      resetLengthSort();
      const text = titleSort.textContent;

      container.innerHTML = '';
      fetch('books.json')
      .then(response => response.json())
      .then(books => {
        if (text.includes("(Z → A)")) {
          books.sort((a, b) => a.title.localeCompare(b.title));
          titleSort.textContent = "Sort by title (A → Z)";

        } else if (text.includes("(A → Z)")) {
          books.sort((a, b) => b.title.localeCompare(a.title));
          titleSort.textContent = "Sort by title (Z → A)";
        } else { //not set yet
          books.sort((a, b) => a.title.localeCompare(b.title));
          titleSort.textContent = "Sort by title (A → Z)";
        }
        displayBooks(books);
              
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
    });

    authorSort.addEventListener("click", () => {
      resetTitleSort();
      resetPubSort();
      resetLengthSort();
      const text = authorSort.textContent;
      
      container.innerHTML = '';
      fetch('books.json')
      .then(response => response.json())
      .then(books => {
        if (text.includes("(Z → A)")) {
          books.sort((a, b) => a.author.localeCompare(b.author));
          authorSort.textContent = "Sort by author (A → Z)";

        } else if (text.includes("(A → Z)")) {
          books.sort((a, b) => b.author.localeCompare(a.author));
          authorSort.textContent = "Sort by author (Z → A)";
        } else { //not set yet
          books.sort((a, b) => a.author.localeCompare(b.author));
          authorSort.textContent = "Sort by author (A → Z)";
        }
        displayBooks(books);
              
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
    });

    pubSort.addEventListener("click", () => {
      resetTitleSort();
      resetAuthorSort();
      resetLengthSort();
      const text = pubSort.textContent;

      container.innerHTML = '';
      fetch('books.json')
      .then(response => response.json())
      .then(books => {
        if (text.includes("(latest → earliest)")) {
          books.sort((a, b) => a.year_published - b.year_published);
          pubSort.textContent = "Sort by publication date (earliest → latest)";

        } else if (text.includes("(earliest → latest)")) {
          books.sort((a, b) => b.year_published - a.year_published);
          pubSort.textContent = "Sort by publication date (latest → earliest)";
        } else { //not set yet
          books.sort((a, b) => a.year_published - b.year_published);
          pubSort.textContent = "Sort by publication date (earliest → latest)";
        }
        
        displayBooks(books, "Date");
              
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
    });

    lengthSort.addEventListener("click", () => {
      resetTitleSort();
      resetAuthorSort();
      resetPubSort();
      const text = lengthSort.textContent;

      container.innerHTML = '';
      fetch('books.json')
      .then(response => response.json())
      .then(books => {
        if (text.includes("(longest → shortest)")) {
          books.sort((a, b) => a.pages - b.pages);
          lengthSort.textContent = "Sort by length (shortest → longest)";

        } else if (text.includes("(shortest → longest)")) {
          books.sort((a, b) => b.pages - a.pages);
          lengthSort.textContent = "Sort by length (longest → shortest)";
        } else { //not set yet
          books.sort((a, b) => a.pages - b.pages);
          lengthSort.textContent = "Sort by length (shortest → longest)";
        }
        
        displayBooks(books, "Pages");
              
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
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
      
      resetTitleSort();
      resetAuthorSort();
      resetPubSort();
      resetLengthSort();

      container.innerHTML = '';
      fetch('books.json')
      .then(response => response.json())
      .then(books => {
        const selectedBooks = [];
        books.forEach(book => {
          const title = book.title.toLowerCase()
          const author = book.author.toLowerCase()
          const genres = book.genres.join().toLowerCase()
          if (title.includes(query)) {
            selectedBooks.push(book);
          } else if (author.includes(query)) {
            selectedBooks.push(book);
          } else if (genres.includes(query)) {
            selectedBooks.push(book);
          }
        });
        
        displayBooks(selectedBooks, "Genres");
              
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
    });
  
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      container.innerHTML = '';
      
      resetTitleSort();
      resetAuthorSort();
      resetPubSort();
      resetLengthSort();

      fetch('books.json')
      .then(response => response.json())
      .then(books => {

        books.sort((a, b) => a.title.localeCompare(b.title)); // had them populate alphabetically on default
        displayBooks(books);
              
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
    });

    const genreForm = document.getElementById("genreForm");
    const clearGenre = document.getElementById("clearGenre");

    genreForm.addEventListener("change", () => {
    const selectedGenre = document.querySelector("input[name='genreRadio']:checked").value.toLowerCase();
  
    resetTitleSort();
    resetAuthorSort();
    resetPubSort();
    resetLengthSort();

    container.innerHTML = '';
    fetch('books.json')
    .then(response => response.json())
    .then(books => {
      const filtered = books.filter(book => 
        book.genres.some(genre => genre.toLowerCase().includes(selectedGenre))
      );
      displayBooks(filtered, "Genres");
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
    });

    clearGenre.addEventListener("click", () => {
    const checked = document.querySelector("input[name='genreRadio']:checked");
    if (checked) checked.checked = false;

    resetTitleSort();
    resetAuthorSort();
    resetPubSort();
    resetLengthSort();

    searchInput.value = "";
    container.innerHTML = '';
    fetch('books.json')
    .then(response => response.json())
    .then(books => {
      books.sort((a, b) => a.title.localeCompare(b.title));
      displayBooks(books);
      })
      .catch(error => {
        console.error('Error loading books:', error);
      });
    });
  });
  