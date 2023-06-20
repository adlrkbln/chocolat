let shop=document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("prod")) || [];
let generateShop = () => {
    return (shop.innerHTML = shopItemsDataInt
        .map((x) => {
            let {id,name,price,img} =x;
            return `
            <div id=product-id-${id} class="card text-center text-bg-primary">
                <img height="160" src=${img} class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h4 class="card-title">${name}</h4>
                    <p class="card-text">$ ${price}</p>
                    <button onclick="increment(${id})" class="button">
                        <a style="color:white;">Order now</a>
                    </button>
                </div>
            </div>
            `;
        }).join(""));
};
generateShop();
let increment = (it) => {
    let selectedItem = it;
    let search = basket.find((x) => x.id === selectedItem);
    if(search === undefined){
        basket.push({
            id: selectedItem,
            item:1,
        });
    }
    else {
        search.item += 1;
    }
    update(selectedItem);
    localStorage.setItem("prod", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    calculation();
  };
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
calculation();
