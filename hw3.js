// ********************************
// Домашняя работа к уроку 3
// ********************************
const menuItemCatalogV3 = document.createElement("li");
menuItemCatalogV3.classList.add("header__menu-item");
menuItemCatalogV3.innerHTML = "Каталог (HW3)";
menuItemCatalogV3.addEventListener("click", renderCatalogPageV3);
headerMenu.append(menuItemCatalogV3);

function renderCatalogPageV3() {
    breadcrumbMap.innerHTML = ` / ${menuItemCatalogV3.innerHTML}`;
    pageContent.innerHTML = "";
    pageHeader.innerHTML = menuItemCatalogV3.innerHTML;

    const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'; 
    let productList = new ProductPage(".page__content", API);
    let cart = new CartPro();
}

class ProductPage{
    constructor(container = ".page__content", api) {
        this.containerElement = this._renderContainerElement(container);
        this.goods = [];
        this.goodsElements = [];
        this._fetchProducts(api)
            .then(data => {
                this.goods = [...data];
                this._render();
            });
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

    _render() {
        for (let product of this.goods) {
            const productElement = new ProductElement(product).getElement();
            this.containerElement.insertAdjacentElement("beforeend", productElement);
            productElement.onclick = e => {
                if (e.target.dataset.title) {
                    console.log(e.target.id);
                    console.log(e.target.dataset.title);
                    console.log(e.target.dataset.price);
                }
            }
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
    constructor() {
        this.goods = [];         //товары в корзине
        this.goodsElements = []; //верстка товаров в корзине
        this.total = 0;           // сумма корзины
        this.quantity = 0;       // количество элементов корзины

        this.renderButton();
    }
    
    add(product) {
        this.goods.push(product);
        this.goods[this.goods.length - 1].quantity = 1;
    }

    remove(productID) {
        
    }

    modifyQuantitity(productID) {
        
    }

    renderButton() {
        // let cartButton = document.createElement("div");
        // cartButton.classList.add("header__cart");
        // document.querySelector(".header__top-right").insertBefore(cartButton,document.querySelector(".header__hamb"));
        // cartButton.insertAdjacentHTML("beforeend", `
        //         <img src="img/cart.png" alt="Корзина">
        //         <span class="header__cart-count">0</span>
        //     `);
        // cart.button.onclick(() => {
            
        // })
    }

    render() {
        
    }

    getTotal() {
        let result = 0;
        for (let product of goods) {
            result += product.price * product.quantity;
        }
        this.total = result;
        return result;
    }

    

}

class ProductCart{
    constructor(product,cartProductQuantity=0) {
        this.product = product;
        this.quantity = cartProductQuantity; //количество товара в корзине 
    }

    render() {
        return `
            <div>${this.product.name}</div>
            <div>${this.product.price}</div>
            <input type="number" value="${this.quantity}">
            <div>${this.product.price * this.quantity}</div>
            <button>Удалить</button>
        `;
    }
}
