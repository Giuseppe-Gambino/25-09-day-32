const apiBooks = "https://striveschool-api.herokuapp.com/books";

function getBooks() {
  fetch(apiBooks)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore: ${response.status}`);
      }
      return response.json();
    })

    .then((arraybooks) => {
      const row = document.querySelector("div .row");

      arraybooks.forEach((book) => {
        const cardBookCol = document.createElement("div");
        cardBookCol.classList.add("col");

        const card = document.createElement("div");
        card.innerHTML = `<div class="card">
                <img src="${book.img}" class="card-img-top" alt="libro" />
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">${book.price}$</p>
                  <button href="#" class="btn btn-primary add mb-1 me-2">Add to Cart</button><button href="#" class="btn btn-danger pass mb-1 me-2">Remove</button>
                </div>
              </div>`;

        row.appendChild(cardBookCol);
        cardBookCol.appendChild(card);

        cardBookCol.querySelector(".pass").addEventListener("click", () => {
          cardBookCol.remove();
        });

        cardBookCol.querySelector(".add").addEventListener("click", () => {
          addToCart(book);
        });
      });
    })
    .catch((error) => {
      console.error("Errore nella richiesta:", error);
    });
}

getBooks();

const h1Cart = document.querySelector("h1");

function addToCart(book) {
  const ul = document.querySelector("ul");

  const li = document.createElement("li");
  li.innerHTML = `<li class="list-group-item d-flex justify-content-between">${book.title}<span>${book.price}$<i role="button" class="bi bi-trash ms-3 passCart"></i></span></li>`;

  ul.appendChild(li);

  li.querySelector(".passCart").addEventListener("click", () => {
    li.remove();

    const ulLi = document.querySelector("ul li");

    if (!ulLi) {
      h1Cart.classList.remove("d-block");
    }
  });

  h1Cart.classList.add("d-block");
}
