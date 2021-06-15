// ********************************
// Домашняя работа к уроку 3,4
// ********************************
const menuItemCatalogV3 = document.createElement("li");
menuItemCatalogV3.classList.add("header__menu-item");
menuItemCatalogV3.innerHTML = "Каталог <span>(HW3,4)</span>";
menuItemCatalogV3.addEventListener("click", renderCatalogPageV3);
headerMenu.append(menuItemCatalogV3);

function renderCatalogPageV3() {
    breadcrumbMap.innerHTML = ` / ${menuItemCatalogV3.innerHTML}`;
    pageContent.innerHTML = "";
    pageHeader.innerHTML = menuItemCatalogV3.innerHTML;

    const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'; 
    let myCart = new CartPro("#cart",API);
    let productList = new ProductPage(".page__content", API,myCart);
}

class ProductPage{
    constructor(container = ".page__content", api,cart) {
        this.containerElement = this._renderContainerElement(container);
        this.goods = [];
        // this.goodsElements = [];
        this.currentCart = cart;
        this._init(api);
    }

    _init(api) {
        this._fetchProducts(api)
            .then(data => {
                this.goods = [...data];
                this.render(this.goods);
            });
        document.forms["search"][0].value = "";                             //    урок 4. Форма поиска по каталогу
        document.forms["search"].addEventListener("submit", (e) => {
            e.preventDefault();
            e.target[0].value = e.target[0].value.trim().toLowerCase();
            this._filter(e.target[0].value);
        });
    }

    _filter(filterText) {
        const regExp = new RegExp(filterText,"i");                            //   урок 4. Поиск по каталогу
        let filteredGoods=(filterText) ? this.goods.filter((product) => regExp.test(product.product_name)) : this.goods;
        this.render(filteredGoods);
    }

    _fetchProducts(api) {  
        return fetch(`${api}/catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    _renderContainerElement(container) {
        let resultElement = document.createElement("div");
        resultElement.classList.add("product-box");
        document.querySelector(container).insertAdjacentElement("beforeend", resultElement);
        return resultElement;
    }

    render(goods) {
        this.containerElement.innerHTML = "";
        for (let product of goods) {
            const productElement = new ProductElement(product).getElement();
            this.containerElement.insertAdjacentElement("beforeend", productElement);
            productElement.onclick = this.addToCart;
        }
    }

    addToCart = (e) => {
        if (e.target.dataset.title) {
            this.currentCart.add({ id_product: e.target.id, product_name: e.target.dataset.title, price: e.target.dataset.price });
        }
    }

}

class ProductElement {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = `img/${product.title}.png`;
    }
    getElement() {
        let element = document.createElement("div");
        element.classList.add("product-item");
        element.insertAdjacentHTML("beforeend", `
                <div class="product-item-in">
                    <h3 class="product-header">${this.title}</h3>
                    <div class="product-img">
                        <img src="img/${this.id}.png" alt="рисунок-${this.title}">
                    </div>
                    <p class="product-price">${this.price}$</p>
                </div>
                <div class="product-button">
                    <div class="product-button-buy buy-btn" id="${this.id}" data-title="${this.title}" data-price="${this.price}">
                    <img src="img/cart.png">
                    Купить</div>
                </div>
        `);
        return element;
    }
}

class CartPro{
    constructor(container = "#cart", api) {
        this.containerElement = document.querySelector(container);
        this.api = api;
        this.totalEl = document.querySelector("#cart__total");
        this.quantityEl = document.querySelector("#cart__quantity");
        this.quantityIcon = document.querySelector(".header__cart-count");
        
        this.cartState = {};
        this._fetchCart(api) //получение товаров корзины. Функционал модернизирован из-за невозможности добавления в корзину на сервере.
            .then(data => {
                this.cartState = {...data};
                this.render();    
            });
        this.buyButton = document.querySelector(".cart__total-button");
    }

    _fetchCart(api) {       //получение товаров корзины 
        return fetch(`${api}/getBasket.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    render() {
        for (let item of this.cartState.contents) {
            this.add(item);
        }
    }
    
    add = (product) => {
        let quantity = (product.quantity)?product.quantity:1;
        let findElement = document.querySelector(`.cart__element[data-id="${product.id_product}"]`);
        if (this.quantityIcon.innerHTML == "0") this.containerElement.innerHTML = "";
        if (findElement) {
            quantity = +findElement.children[2].value+1;
            findElement.children[2].value =  quantity;
            findElement.children[3].innerText =quantity*product.price;
        } else {
            // this.containerElement.innerText = "";
            let cartElement = new CartElement({ ...product, quantity }).getElement();
            this.containerElement.insertAdjacentElement("beforeend", cartElement);
            cartElement.children[4].addEventListener("click", this.remove);
            cartElement.addEventListener("change", this.modify);
        }
        this.setTotal();  
    }

    remove = (e) => {
        let findElement = document.querySelector(`.cart__element[data-id="${e.target.dataset.id}"]`);
        findElement.remove();
        this.setTotal();
    }

    modify = (e) => {
        let findElement = document.querySelector(`.cart__element[data-id="${e.target.dataset.id}"]`)
        findElement.children[3].innerText = findElement.children[1].innerText * findElement.children[2].value;
        if (e.target.value <= 0) this.remove(e);
        this.setTotal();

    }   

    setTotal = () => {
        let total = 0;
        let quantity = 0;
        for (let item of this.containerElement.children) {
            total += +item.children[3].innerText;
            quantity += +item.children[2].value;
        }
        this.quantityIcon.innerText = quantity;
        this.quantityEl.innerText = quantity+"шт";
        this.totalEl.innerText = total+"руб";
    }
    
    
    

}

class CartElement{
    constructor(product) {
        this.product = product;
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
    }

    getElement() {
        let element = document.createElement("div");
        element.classList.add("cart__element");
        element.classList.add("cart__grid");
        element.dataset.id=this.id_product;
        element.innerHTML=`
            <div class="cart__name">${this.product_name}</div>
            <div class="cart__price">${this.price}</div>
            <input class="cart__quantity" type="number" data-id="${this.id_product}" value="${this.quantity}">
            <div class="cart__sum">${this.price*this.quantity}</div>
            <button class="cart__remove" data-id="${this.id_product}">X</button>
        `;
        return element;
    }
}
