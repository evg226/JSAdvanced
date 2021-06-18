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
    pageHeader.innerHTML = menuItemCatalogV4.innerHTML+" Reg expression";

    // п.1,2 выводятся в консоли ********************
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

    // п.3 ***********************************************
    let pageCallBack = new PageCallBack();

}

class PageCallBack {
    constructor(container = ".page__content") {
        this.formElement = this.getFormElement(container);
        this.inputs = [];
        this._load();
        this.render();
    }
    _load() {
        this.inputs = [
            { type: "text", name:"userName", label:"Ваше Имя", placeholder:"Ваше Имя", pattern:["^[a-zа-я ]+$","i"]},
            { type: "tel", name:"phone", label: "Телефон", placeholder: "+7(000)000-00-00", pattern:["^\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$"]}, 
            { type: "text", name:"userEmail", label:"email", placeholder:"box@domain.com",pattern:["^([a-z0-9]+[.-])*[a-z0-9]+@([a-z0-9]+[.-])*[a-z0-9]+[.][a-z]{2,6}$"]},
            { type: "textarea",name:"message", label:"Ваше сообщение", placeholder:"Введите сообщение",pattern:[".+"]},
            { type: "submit",name:"button", label:"",placeholder:"" },
        ];
    }
    render() {
        for (let item of this.inputs) {
            let itemEl = new inputItem(item).render();
            this.formElement.insertAdjacentHTML("beforeend", itemEl);
        }
        this.formElement.addEventListener("submit", this.checkInputs);
        this.formElement["phone"].addEventListener("keyup", this._phoneCheck);
    }
    getFormElement(container) {
        let resultEl = document.createElement("form");
        resultEl.classList.add("callback__form");
        resultEl.action = "#";
        resultEl.method = "GET";
        resultEl.name = "callBack";
        document.querySelector(container).append(resultEl);
        return resultEl;
    }

    checkInputs = (e) => {
        e.preventDefault();
        let checked = true;
        for (let inputEl of e.target) {
            inputEl.value = inputEl.value.trim();
            let pattern = this.inputs.find(item => item.name == inputEl.name).pattern;
            if (!pattern) continue;
            pattern = new RegExp(pattern[0], pattern[1]);
            if (!pattern.test(inputEl.value)) {
                inputEl.style.boxShadow = "0 0 10px red";
                checked = false;
            } else {
                inputEl.style.boxShadow = "none";
            }
        }
        
        if (checked) alert("Сообщение доставлено!");
            
    }

    _phoneCheck = (e) => {
        let val = e.target.value.replace(/\+7|\D/g, '').substr(0, 10);
        let result = "";
        for (let i in val) {
            result += val[i];
            if (i == 2) result += ")";
            if (i == 5) result += "-";
            if (i == 7) result += "-";
        }
        e.target.value = "+7(" + result;;
    }
}

class inputItem{
    constructor(item) {
        this.type = item.type;
        this.label = item.label;
        this.placeholder = item.placeholder;
        this.name = item.name;
    }
    render() {
        let element;
        if (this.type == "textarea") {
            element = `<textarea name="${this.name}" placeholder="${this.placeholder}" wrap="hard"></textarea>`;
        } else if (this.type == "submit") {
            element = `<input type="${this.type}" name="${this.name}" placeholder="${this.placeholder}" value="Отправить">`;
        } else {
            element = `<input type="${this.type}" name="${this.name}" placeholder="${this.placeholder}">`;
        }
        let img = `<img src="img/${this.name}.png" alt="">`;
        return `
            <div class="callback__item">
                ${this.type!='submit'? img : ''}
                
                <div>
                    <span>${this.label}</span>
                    ${element}
                </div>
            </div>
        `;
    }
}




