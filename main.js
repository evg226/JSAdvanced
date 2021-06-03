// ********************************
// Домашняя работа к уроку 1
// ********************************

// создание меню для Каталога товаров
const menuItemCatalog = document.createElement("li");
menuItemCatalog.classList.add("header__menu-item");
menuItemCatalog.innerHTML = "Каталог товаров";
menuItemCatalog.addEventListener("click", renderCatalogPage);
headerMenu.append(menuItemCatalog);

// Переход к Каталогу товаров (ДЗ №1)
function renderCatalogPage() {
    breadcrumbMap.innerHTML = ` / ${menuItemCatalog.innerHTML}`;
    pageContent.innerHTML = "";
    pageHeader.innerHTML = menuItemCatalog.innerHTML;

    const products = [
        {id: 1, title: 'Notebook', price: 2000},
        {id: 2, title: 'Mouse', price: 20},
        {id: 3, title: 'Keyboard', price: 200},
        {id: 4, title: 'Gamepad', price: 50 },
    ];
    //Функция для формирования верстки каждого товара
    //Добавить в выводе изображение
    const renderProduct = (title="Товар", price=0) => { // РЕШЕНИЕ п.2 
        return `<div class="product-item">
                    <h3 class="product-header">${title}</h3>
                    <div class="product-img">
                        <img src="img/${title}.img" alt="рисунок- ${title}">
                    </div>
                    <p class="product-price">${price}$</p>
                    <div class="product-button">
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>`;
    };
    const renderPage = list => {
        const productsList = list.map(item => renderProduct(item.title, item.price));
        pageContent.innerHTML = "<div class='product-box'>"+
                                    productsList.join("") // РЕШЕНИЕ п.3 
                                +"</div>"; 
    };
    renderPage(products);
}