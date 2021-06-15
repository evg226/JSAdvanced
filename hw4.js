// ********************************
// Домашняя работа к уроку 4
// ********************************
const menuItemCatalogV4 = document.createElement("li");
menuItemCatalogV4.classList.add("header__menu-item");
menuItemCatalogV4.innerHTML = "Связаться с нами <span>(HW4)</span>";
menuItemCatalogV4.addEventListener("click", renderCatalogPageV4);
headerMenu.append(menuItemCatalogV4);

function renderCatalogPageV4() {
    breadcrumbMap.innerHTML = ` / ${menuItemCatalogV4.innerHTML}`;
    pageContent.innerHTML = "";
    pageHeader.innerHTML = menuItemCatalogV4.innerHTML;

    // п.1,2 выводятся в консоли
    let text = `
        One: 'Hi Mary.' Two: 'Oh, hi.'
        One: 'How are you doing?'
        Two: 'I'm doing alright. How about you?'
        One: 'Not too bad. The weather is great isn't it?'
        Two: 'Yes. It's absolutely beautiful today.'
        One: 'I wish it was like this more frequently.'
        Two: 'Me too.'
        One: 'So where are you going now?'
        Two: 'I'm going to meet a friend of mine at the department store.'
        One: 'Going to do a little shopping?'
        Two: 'Yeah, I have to buy some presents for my parents.'
        One: 'What's the occasion?'
        Two: 'It's their anniversary.'
        One: 'That's great. Well, you better get going. You don't want to be late.'
        Two: 'I'll see you next time.'
        One: 'Sure. Bye.'    
    `;  
    
    console.log("Решение п.1");
    let result = text.replace(/'/g, `"`);
    console.log(result);
    
    console.log("Решение п.2");
    result = text.replace(/\s'/g, ` "`);
    result = result.replace(/'(?=\s)/g, `"`);
    console.log(result);

}




