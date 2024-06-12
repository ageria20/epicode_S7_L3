const cardCont = document.getElementById("cardCont");
const row = document.getElementById("row");
let arrCart = [];

const cart = document.getElementById("cart");

const getBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((obj) => {
      if (obj.ok) {
        return obj.json();
      } else {
        throw new Error(`Status error: ${obj.status}`);
      }
    })

    .then((booksObj) => {
      booksObj.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("col-4");
        card.classList.add("col-md-3");
        card.classList.add("p-0");
        row.appendChild(card);
        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.classList.add("img-fluid");
        image.classList.add("h-75");
        image.classList.add("object-fit-cover");

        card.appendChild(image);
        image.src = book.img;
        image.setAttribute("alt", `${book.title}`);
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardBody.appendChild(cardTitle);
        cardTitle.innerText = `${book.title}  
        -
        €${book.price}`;
        const price = document.createElement("p");
        price.classList.add("card-text");
        cardBody.appendChild(cardTitle);
        price.innerText = book.price;

        const cardBtn = document.createElement("div");
        cardBtn.classList.add("d-flex");
        cardBtn.classList.add("justify-content-between");
        cardBody.appendChild(cardBtn);
        const discard = document.createElement("button");
        discard.classList.add("btn", "btn-danger");
        cardBtn.appendChild(discard);
        const addCart = document.createElement("button");
        addCart.classList.add("btn", "btn-primary");
        cardBtn.appendChild(addCart);
        addCart.innerText = "Add to cart";
        discard.innerText = "Discard";
        discard.onclick = () => {
          row.removeChild(card);
        };

        addCart.onclick = () => {
          const cartItem = document.createElement("li");
          cartItem.classList.add("dropdown-item");
          cart.appendChild(cartItem);
          cartItem.innerText = `${book.title}  
          € ${book.price}`;
          const { title, price } = book;
          arrCart.push({ title, price });
          console.log(arrCart);
          localStorage.setItem("storedCart", JSON.stringify(arrCart));

          const delBtn = document.createElement("button");
          delBtn.classList.add("btn", "btn-danger");
          cartItem.appendChild(delBtn);
          delBtn.innerText = "Remove";
          delBtn.onclick = () => {
            cart.removeChild(cartItem);
          };
        };
      });
    })
    .catch((err) => console.log("An error occurred"));
};

window.addEventListener("DOMContentLoaded", () => {
  const savedItems = localStorage.getItem("storedCart");
  if (savedItems) {
    const parsedItems = JSON.parse(savedItems);
    console.log(parsedItems);
    arrCart = parsedItems;
    arrCart.forEach((item) => {
      console.log(arrCart);
      const cartItem = document.createElement("li");
      cartItem.classList.add("dropdown-item");
      cart.appendChild(cartItem);
      cartItem.innerText = `${item.title} - €${item.price}`;
      const delBtn = document.createElement("button");
      delBtn.classList.add("btn", "btn-danger");
      cartItem.appendChild(delBtn);

      delBtn.innerText = "Remove";
      delBtn.onclick = () => {
        cart.removeChild(cartItem);

        console.log(cartItem.innerText);
        const itemIndex = arrCart.findIndex((elem) => cartItem.innerText === elem.title);
        console.log(itemIndex);
        console.log(arrCart);
        if (itemIndex !== -1) {
          arrCart.splice(itemIndex, 1);
          //   localStorage.setItem("storedCart", JSON.stringify(arrCart));
        }
      };
    });
  }
  getBooks();
});
