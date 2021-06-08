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

    let hamb = new Hamburger(".page__content");
}

class Hamburger{
    constructor(container=".container") {
        this.container = document.createElement("form");
        this.container.name = "hamb";
        this.container.classList.add("hamburger__container");
        // this.container.classList.add("product-box");
        document.querySelector(container).insertAdjacentElement("beforeend",this.container);
        this.options = [];
        this.price = 0;
        this.caloricValue = 0;
        this._fetchOptions();
        this.render();
        this.calculatePrice();
    }

    _fetchOptions() {
        this.options[0] = [
            { type: "base", name: "small", fullname: "Маленький", price: 50, caloricValue: 20, checked: false },
            { type: "base", name: "big", fullname: "Большой", price: 100, caloricValue: 40, checked: true },
        ];
        this.options [1]= [
            { type: "fill", name: "cheese", fullname: "Сыр", price: 10, caloricValue: 20, checked: true },
            { type:"fill", name: "salad",fullname: "Салат", price: 20, caloricValue: 5, checked:false },
            { type:"fill", name: "potato",fullname: "Картофель", price: 15, caloricValue: 10, checked:false },
        ];
        this.options [2]= [
            { type: "adds", name: "spice", fullname: "Перец", price: 15, caloricValue: 0, checked: false },
            { type:"adds", name: "mainonaise",fullname: "Майонез", price: 20, caloricValue: 5, checked:false }
        ];
    }

    render() {
        for (let index in this.options) {
            let optionGroup = document.createElement("div");
            optionGroup.classList.add("hamburger__group");
            this.container.append(optionGroup);
            optionGroup.onclick = this.setCheck;
            for (let optionItem of this.options[index]) {
                let optionItemElement = new OptionItem(optionItem);
                optionGroup.insertAdjacentHTML("beforeend", optionItemElement.render());
                optionGroup.addEventListener("change", this.calculatePrice);
            }
        }
        this.container.insertAdjacentHTML("beforeend", `<div class="hamburger__total">
                        <div class="total__price">Стоимость: <span id="totalPrice"></span> </div>
                        <div class="total__calories">Калорийность: <span id="totalCalories"></span> </div>
                        </div>`);
    }
    calculatePrice() {
        this.price = 0;
        this.caloricValue = 0;
        for (let currentInput of document.forms["hamb"].elements) {
            if (currentInput.checked) {
                this.price += +currentInput.getAttribute("price");
                this.caloricValue += +currentInput.getAttribute("caloricValue");
            }
        }
        document.querySelector("#totalCalories").innerHTML = this.caloricValue;
        document.querySelector("#totalPrice").innerHTML = this.price + "$";
    }

    setCheck(e) {
        let attr = e.target.getAttribute("value");
        if (attr) {
            let input = document.querySelector(`input[value=${attr}]`);
            if (input.type == "checkbox") {
                input.checked = !input.checked;
            }
            else {
                input.checked = true;
            }
            // this.calculatePrice(); Дублирующий код функция не запускается
            this.price = 0;
            this.caloricValue = 0;
            for (let currentInput of document.forms["hamb"].elements) {
                if (currentInput.checked) {
                    this.price += +currentInput.getAttribute("price");
                    this.caloricValue += +currentInput.getAttribute("caloricValue");
                }
            }
            document.querySelector("#totalCalories").innerHTML = this.caloricValue;
            document.querySelector("#totalPrice").innerHTML = this.price + "$";
        }
    }
}

class OptionItem{
    constructor(currrentOption) {
        this.type = currrentOption.type;
        this.name = currrentOption.name;
        this.fullname = currrentOption.fullname;
        this.price = currrentOption.price ;
        this.caloricValue = currrentOption.caloricValue ;
        this.checked = currrentOption.checked ;
    }
    render() {
        return `
        <div class="hamburger__element" value="${this.name}">
            <input
                class="${this.type}"
                type="${this.type == 'adds' ? 'checkbox' : 'radio'}" 
                name="${this.type}" ${this.checked ? 'checked' : ''}
                price="${this.price}"
                caloricValue="${this.caloricValue}"
                value="${this.name}">
            <span value="${this.name}" class="hamburger__element-caption">${this.fullname}</span>
            <div class="hamburger__element-params">
                <span value="${this.name}">Цена: ${this.price}$</span>
                <span value="${this.name}">ККал: ${this.caloricValue}</span>
            </div>
        </div>
        `;
    }
}