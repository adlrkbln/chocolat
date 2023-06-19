let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let inform = document.getElementById("info");
let basket = JSON.parse(localStorage.getItem("prod")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsDataInt.find((y) => y.id === id) || [];
        return `
      <div class="cart-item row">
        <img class="col-12 col-md-3" width="300" src=${search.img} style="border-radius:10px;"alt="" />
        <div class="col-12 col-md-8 details">
          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>$ ${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <center><h3>Cart is Empty</h3>
    <a href="Catalog.html">
      <button class="HomeBtn">Back to catalog</button>
    </a></center><br><br><br><br><br><br><br>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  console.log("increment");
  if(search === undefined){
      basket.push({
          id: selectedItem,
          item:1,
      });
  }
  else {
      search.item += 1;
  }
  generateCartItems();
  update(selectedItem);
  info();
  localStorage.setItem("prod", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined) return;
  else if (search.item === 0) {location.reload();return;}
  else if (search.item===1) {search.item-=1;location.reload(); }
  else {
    search.item -= 1;
  }
  update(selectedItem);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  info();
  localStorage.setItem("prod", JSON.stringify(basket));
  
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
  info();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  generateCartItems();
  info();
  localStorage.setItem("prod", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  info();
  location.reload();
  localStorage.setItem("prod", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsDataInt.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
    <h3 style="display:flex;justify-content:space-between"><div style="margin-left:20px;">Total Bill</div><div> $ ${amount}</div></h3>
    <center><button onclick="clearCart()" class="removeAll">Clear Cart</button></center>
    `;
  } else return;
};

TotalAmount();
let orderNow = () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("phone").value;
  if (!name || !email || !phoneNumber) {
    inform.innerHTML = `
    <h1 style="margin-top:30px">Personal info</h1>
  <div style="margin-bottom:50px">
                  <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Name</label>
                      <input id="name" class="form-control" id="exampleFormControlInput1">
                    </div>
                  <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Email address</label>
                      <input id="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Phone number</label>
                      <input id="phone" class="form-control" id="exampleFormControlInput1" placeholder="+7-(***)-***-****">
                    </div>
                  <h1 style="margin-top:30px;margin-bottom:20px">Delivery</h1>
                  <select class="form-select" aria-label="Default select example">
                      <option value="Astana">Astana</option>
                      <option value="Almaty">Almaty</option>
                      <option value="Karaganda">Karaganda</option>
                      <option value="Semei">Semey</option>
                  </select>
              </div>
              <p>Please fill out all the fields.</p>
    <button type="button" onclick="orderNow()" style="background-color:brown" class="btn btn-secondary">Order now</button>`;
  } else {
    console.log('Name:' + name + '\nEmail:' + email + '\nPhone:' + phoneNumber +'\n'
    + basket.map((x) => console.log("id:" + x.id + "amount:" + x.item + '\n')));
    inform.innerHTML = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h4 style="margin-left:50px">Order is being processed!</h4>
      </div>
    </div>
    `
    modall();
  }
};
let info = () => {
  if(basket.length !==0){
  inform.innerHTML = `
  <h1 style="margin-top:30px">Personal info</h1>
  <div style="margin-bottom:50px">
                  <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Name</label>
                      <input id="name" class="form-control" id="exampleFormControlInput1">
                    </div>
                  <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Email address</label>
                      <input id="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Phone number</label>
                      <input id="phone" class="form-control" id="exampleFormControlInput1" placeholder="+7-(***)-***-****">
                    </div>
                  <h1 style="margin-top:30px;margin-bottom:20px">Delivery</h1>
                  <select class="form-select" aria-label="Default select example">
                      <option value="Astana">Astana</option>
                      <option value="Almaty">Almaty</option>
                      <option value="Karaganda">Karaganda</option>
                      <option value="Semei">Semey</option>
                  </select>
              </div>
    <button type="button" id="myBtn" onclick="orderNow()" style="background-color:brown" class="btn btn-secondary">Order now</button>
  `;}
};
let modall = () => {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
  modal.style.display = "none";
  clearCart();
  }
  window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    clearCart();
  }
  }
}
info();
