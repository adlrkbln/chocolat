let shop=document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("prod")) || [];
let generateShop = () => {
    return (shop.innerHTML = shopItemsDataInt
        .map((x) => {
            let {id,name,price,img} =x;
            if((id>=1&&id<=4)||(id>=9&&id<=12)||(id>=17&&id<=20)||(id>=25&&id<=28)){
                if(id===1) {return `<h1 class="col-12"><a class="heading" href="Catalog.html">Cakes</a></h1><br>
                <div id=product-id-${id} class="card text-center text-bg-primary">
                <img height="160" src=${img} class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h4 class="card-title">${name}</h4>
                    <p class="card-text">$ ${price}</p>
                    <button onclick="increment(${id})" class="button">
                        <a style="color:white;">Order now</a>
                    </button>
                </div>
            </div>`;}
            else if(id===9) {return `<h1 class="col-12"><a class="heading" href="Catalog.html">Cookies</a></h1>
            <div id=product-id-${id} class="card text-center text-bg-primary">
            <img height="160" src=${img} class="card-img-top" alt="${name}">
            <div class="card-body">
                <h4 class="card-title">${name}</h4>
                <p class="card-text">$ ${price}</p>
                <button onclick="increment(${id})" class="button">
                    <a style="color:white;">Order now</a>
                </button>
            </div>
        </div>`;}
        else if(id===17){ return`<h1 class="col-12"><a class="heading" href="Catalog.html">Candies</a></h1>
        <div id=product-id-${id} class="card text-center text-bg-primary">
        <img height="160" src=${img} class="card-img-top" alt="${name}">
        <div class="card-body">
            <h4 class="card-title">${name}</h4>
            <p class="card-text">$ ${price}</p>
            <button onclick="increment(${id})" class="button">
                <a style="color:white;">Order now</a>
            </button>
        </div>
    </div>`;}
    else if(id===25) {return `<h1 class="col-12"><a class="heading" href="Catalog.html">Other</a></h1>
    <div id=product-id-${id} class="card text-center text-bg-primary">
    <img height="160" src=${img} class="card-img-top" alt="${name}">
    <div class="card-body">
        <h4 class="card-title">${name}</h4>
        <p class="card-text">$ ${price}</p>
        <button onclick="increment(${id})" class="button">
            <a style="color:white;">Order now</a>
        </button>
    </div>
</div>`; }
else {return `
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
            `;}
            }
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
