// ********************************
// Домашняя работа к уроку 2
// ********************************
// Решение с помощью классов

// п.1 - строка 80-120

const menuItemCatalogV2 = document.createElement("li");
menuItemCatalogV2.classList.add("header__menu-item");
menuItemCatalogV2.innerHTML = "Каталог (ver2)";
menuItemCatalogV2.addEventListener("click", renderCatalogPageV2);
headerMenu.append(menuItemCatalogV2);


function renderCatalogPageV2() {
    breadcrumbMap.innerHTML = ` / ${menuItemCatalogV2.innerHTML}`;
    pageContent.innerHTML = "";
    pageHeader.innerHTML = menuItemCatalogV2.innerHTML;

    let productList = new ProductList(".page__content");
}

class ProductList{
    constructor(container=".container") {
        this.container = document.createElement("div");
        this.container.classList.add("product-box");
        document.querySelector(container).insertAdjacentElement("beforeend",this.container);
        this.goods = [];
        this.goodsElement = [];
        this._fetchProducts();
        this.render();
    }

    _fetchProducts() {
        this.goods= [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }

    render() {
        for (let product of this.goods) {
            let productElement = new ProductItem(product);
            this.goodsElement.push(productElement);
            this.container.insertAdjacentHTML("beforeend", productElement.render());
        }
    }
}

class ProductItem{
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = `img/${product.title}.png`;
    }
    render() {
        return `
            <div class="product-item">
                <div class="product-item-in">
                    <h3 class="product-header">${this.title}</h3>
                    <div class="product-img">
                        <img src="${this.img}" alt="рисунок-${this.title}">
                    </div>
                    <p class="product-price">${this.price}$</p>
                </div>
                <div class="product-button">
                    <div class="product-button-buy buy-btn">
                    <img src="img/cart.png">
                    Купить</div>
                </div>
            </div>
        `;
    }
}


class Cart{
    constructor() {
        this.goods = [];         //товары в корзине
        this.goodsElements = []; //верстка товаров в корзине
        this.total = 0;           // сумма корзины
        this.quantity = 0;       // количество элементов корзины
    }
    
    add(product) {
        this.goods.push(product);
        this.goods[this.goods.length - 1].quantity = 1;
    }

    remove(productID) {
        
    }

    modifyQuantitity(productID) {
        
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

class CartProduct{
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










