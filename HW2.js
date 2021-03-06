// ********************************
// Домашняя работа к уроку 2
// ********************************
// Решение с помощью классов

// п.1 - строка 96-147
// п.2 - строка 34,54-61
// п.3 - строка 154+

const menuItemCatalogV2 = document.createElement("li");
menuItemCatalogV2.classList.add("header__menu-item");
menuItemCatalogV2.innerHTML = "Каталог (HW2)";
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
        document.querySelector(container).insertAdjacentHTML("beforeend","<div class='product__total'>ИТОГО: "+this.getTotal()+"$");
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

    getTotal() {
        let total = 0;
        console.log(this.goodsElement);
        for( let item of this.goodsElement){
            total += item.price;
        }
        console.log(total);
        return total;

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

// ****************************
// п.1 ДЗ
// ****************************
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



// ****************************
// п.3 Гамбургер
// **************************
const menuItemHamburger = document.createElement("li");
menuItemHamburger.classList.add("header__menu-item");
menuItemHamburger.innerHTML = "Гамбургер (HW2)";
menuItemHamburger.addEventListener("click", renderHamburger);
headerMenu.append(menuItemHamburger);

function renderHamburger() {
    breadcrumbMap.innerHTML = ` / ${menuItemHamburger.innerHTML}`;
    pageContent.innerHTML = "";
    pageHeader.innerHTML = menuItemHamburger.innerHTML;

    let hamb = new HamburgerPage(".page__content");
}

class HamburgerPage{
    constructor(targetContainer) {
        this.options = [];
        this.renderCaptions(targetContainer);
        this._fetchOptions();
        this.renderBox();
        this.hamburger = new Hamburger(); //на странице возможен один гамбургер для  включения в заказ
    }

    _fetchOptions() { //загрузка перечня опций гамбургера (в будущем из бэкэнда)
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

    renderCaptions(targetContainer) { //отрисовка формы с заголовком и итогами
        let targetContainerElement=document.querySelector(targetContainer);
        this.container = document.createElement("form");
        this.container.name = "hamb";
        this.container.classList.add("hamburger__container");
        targetContainerElement.insertAdjacentHTML("beforeend", `
                        <div class="hamburger__desc">
                            Сформируй свой бургер<span>&dArr;</span>
                        </div>`);
        targetContainerElement.insertAdjacentElement("beforeend", this.container);
        targetContainerElement.insertAdjacentHTML("beforeend", `
                        <div class="hamburger__total">
                            <div class="hamburger__total-price">Итого: <span id="totalPrice"></span> </div>
                            <div class="hamburger__total-calories">Калорий: <span id="totalCalories"></span></div>
                            <div class="hamburger__total-order">Заказать</div>
                        </div>`);
    }

    renderBox() { //отрисовка бокса с выбором опций гамбургера
        for (let index in this.options) {
            let optionGroup = document.createElement("div"); //группа опций
            optionGroup.classList.add("hamburger__group");
            this.container.append(optionGroup);
            for (let optionItem of this.options[index]) {  //опция гамбургера
                let optionItemElement = new OptionItem(optionItem).getElement();
                optionGroup.insertAdjacentElement("beforeend", optionItemElement);
                optionItemElement.addEventListener("change", () => this.hamburger = new Hamburger()); //создается новый гамбургер
                optionItemElement.addEventListener("click", this.changeInput);
            }
        }
    }

    changeInput(e) { //при нажатии на блок с рисуноком меняется input
        let input = document.querySelector(`input[value=${this.getAttribute("value")}]`);
        let inputBeforeChecked = input.checked;
        if (input.type == "radio") {
            input.checked = true;
        } else {
            if (e.target != input) {
                input.checked = !input.checked;
            }
        }
        if (input.checked != inputBeforeChecked) {
            this.dispatchEvent(new Event("change"));
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

    getElement() { //отрисовка элемента с опцией гамбургера
        let element = document.createElement("div");
        element.classList.add("hamburger__element");
        element.setAttribute("value", `${this.name}`);
        element.insertAdjacentHTML("beforeend",`        
            <input
                class="${this.type}"
                type="${this.type == 'adds' ? 'checkbox' : 'radio'}" 
                name="${this.type}" ${this.checked ? 'checked' : ''}
                price="${this.price}"
                caloricValue="${this.caloricValue}"
                value="${this.name}">
            <img src="img/${this.name}.png" alt="${this.fullname}" value="${this.name}">
            <!-- <span value="${this.name}" class="hamburger__element-caption">${this.fullname}</span> -->
            <div class="hamburger__element-params">
                <span value="${this.name}">Цена: ${this.price}$</span>
                <span value="${this.name}">ККал: ${this.caloricValue}</span>
            </div>`);
        return element;
    }
}

class Hamburger{  //гамбургер
    constructor() {
        this.price = 0;
        this.caloricValue = 0;
        this.calculate();
    }

    calculate() { //расчет итоговых значений гамбургера и запись на страницу
        for (let currentInput of document.forms["hamb"].elements) {
            currentInput.checked && (this.price += +currentInput.getAttribute("price"),this.caloricValue += +currentInput.getAttribute("caloricValue"));
        }
        document.querySelector("#totalCalories").innerHTML = this.caloricValue;
        document.querySelector("#totalPrice").innerHTML = this.price + "Р";
        console.log("создан гамбургер!");
    }
}