// ********************************
// Домашняя работа к уроку 1
// ********************************

// создание меню для Каталога товаров
const menuItemCatalog = document.createElement("li");      // РЕШЕНИЕ п.1 Добавляем меню стили в css-файле 
menuItemCatalog.classList.add("header__menu-item");
menuItemCatalog.innerHTML = "Каталог (HW1)";
menuItemCatalog.addEventListener("click", renderCatalogPage);
headerMenu.append(menuItemCatalog);

// Переход к Каталогу товаров (ДЗ №1)
function renderCatalogPage() {
    breadcrumbMap.innerHTML = ` / ${menuItemCatalog.innerHTML}`;
    pageContent.innerHTML = "";
    pageHeader.innerHTML = menuItemCatalog.innerHTML;

    const products = [
        { id: 1, title: 'Notebook', price: 2000 },
        { id: 2, title: 'Mouse', price: 20 },
        { id: 3, title: 'Keyboard', price: 200 },
        { id: 4, title: 'Gamepad', price: 50 },
    ];
    //Функция для формирования верстки каждого товара
    //Добавить в выводе изображение
    // *************************
    // РЕШЕНИЕ п.2. Добавляем параметры по умолчанию.
    //  Для сокращения записи arrow function убираем фиругные скобки и return
    const renderProduct = (title = "Товар", price = 0) => `
                <div class="product-item">
                <div class="product-item-in">
                    <h3 class="product-header">${title}</h3>
                    <div class="product-img">
                        <img src="img/${title}.png" alt="рисунок-${title}">
                    </div>
                    <p class="product-price">${price}$</p>
                </div>
                <div class="product-button">
                    <div class="product-button-buy buy-btn">
                    <img src="img/cart.png">
                    Купить</div>
                </div>
                </div>`;

    const renderPage = list => {
        const productsList = list.map(item => renderProduct(item.title, item.price));
        pageContent.innerHTML = "<div class='product-box'>" +
            productsList.join("")                       // РЕШЕНИЕ п.3 - добавляем в конец -  join();
            + "</div>";
    };
    renderPage(products);
}