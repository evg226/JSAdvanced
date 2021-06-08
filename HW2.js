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



// п.3 Гамбургер

const menuItemHamburger = document.createElement("li");
menuItemHamburger.classList.add("header__menu-item");
menuItemHamburger.innerHTML = "Гамбургер";
menuItemHamburger.addEventListener("click", renderHamburger);
headerMenu.append(menuItemHamburger);

function renderHamburger() {
     breadcrumbMap.innerHTML = ` / ${menuItemHamburger.innerHTML}`;
    pageContent.innerHTML = "";
    pageHeader.innerHTML = menuItemHamburger.innerHTML;

    let hamb = new Hamburger("small", "cheese");
    hamb.insertAdditional("spice");
    console.log(hamb);
    
}

class Hamburger{
    constructor(size,filling) {
        this.price = 0;
        this.caloricValue = 0;
        this.make(size);
        this.insertFilling(filling);
    }
    make(size) {
        let hambBase = new HambBase().get(size);
        this.size = hambBase.size;
        this.price += hambBase.price;
        this.caloricValue+=hambBase.caloricValue;
    }
    insertFilling(filling) {
        let hambFilling = new HambFilling().get(filling);
        this.filling=hambFilling.filling
        this.price += hambFilling.price;
        this.caloricValue+=hambFilling.caloricValue;

    }
    insertAdditional(additional) {
        let hambAdditional = new HambAdditional().get(additional);
        this.additional = hambAdditional.additional;
        this.price += hambAdditional.price;
        this.caloricValue+=hambAdditional.caloricValue;

    }
}

class HambBase{
    constructor() {
        this.types = [];
        this._fetchHambTypes();
    }
    _fetchHamb() {
        this.types=[
            { size: "small", price: 50, caloricValue: 20},
            { size: "big", price: 100, caloricValue: 20 }
        ];
    }
    get(size) {
        for (let item of this.types) {
            if (size == item.size) {
                return item;
            } 
        }
        return "Неправильный тип";
    }
}

class HambFilling{
    constructor() {
        this.fillingTypes = [];
        this._fetchHambFillings();
    }
    _fetchHambFillings() {
        this.fillingTypes = [
            { filling: "cheese", price: 10, caloricValue: 20 },
            { filling: "salad", price: 20, caloricValue: 5 },
            { filling: "potato", price: 15, caloricValue: 10 },
        ];

    }
    get(filling) {
        for (let item of this.fillingTypes) {
            if (filling == item.filling) {
                return item;
            } 
        }
        return "Неправильный наполнитель";
    }
}

class HambAdditional{
    constructor() {
        this.additionalTypes = [];
        this._fetchHambAdditionals();
    }
    _fetchHambAdditionals() {
        this.fillingTypes = [
            { additional: "spice", price: 15, caloricValue: 0 },
            { additional: "mainonaise", price: 20, caloricValue: 5 },
        ];

    }
    get(additional) {
        for (let item of this.fillingTypes) {
            if (additional == item.additional) {
                return item;
            } 
        }
        return "Неправильная добавка";
    }
}













