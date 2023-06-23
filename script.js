let dishes = ['Spaghetti Bolognese', 'Gnocchi mit Gorgonzolasauce', 'Tagliatelle di Puttanesca', 'Tagliatelle con Salmone',
    'Spaghetti Spinaci é Gamberetti', 'Ravioli ai funghi porcini'
];


let description = ['Aus frischem Rindfleisch und Tomaten aus Italien. Pasta selbst gemacht.', 'Weißweinsoße und frischer Lachs, perfekt zu unseren berühmten Tagliatelle.',
    'Selbst gemachte Gnocchis, gebräunt in Nussbutter.', 'Sardellen, Kapern, schwarze Oliven in einem leckeren Tomatensugo.',
    'Spinat und Garnelen, eingekochte mit leckeren Cocktailtomaten und Knoblauch.', 'Ravioli mit Steinpilzfüllung, geschwenkt in Nussbutter'
];

let amount = [1, 1, 1, 1, 1, 1];
let price = [9.70, 12.80, 12.30, 17.50, 16.70, 17.80];


let shoppingCardName = [];
let shoppingCardPrice = [];
let amountInShoppingCart = [];

let isEnoughInBasket = Boolean;

let mediaQuerie = window.matchMedia("(max-width: 880px)");


window.onscroll = function () {
    let shoppingCard = document.getElementById('shopping-card');
    if (window.scrollY > 0) {
        if (window.scrollY < 100) {
            shoppingCard.style = 100 - window.scrollY;
        } else {
            shoppingCard.style = 'top: 0';
        }

    } else {
        shoppingCard.style = 'top: 100px';
    }
}


function StartScript() {
    if (mediaQuerie.matches) {
        removeSC();
        addButtontoSC();
    } else {
        removeButtonFromSC();
        showSC();
    }
    render();
}

window.onresize = function checkMediaQuery() {
    if (mediaQuerie.matches) {
        removeSC();
        addButtontoSC();
    } else {
        removeButtonFromSC();
        showSC();
    }
}

function addButtontoSC() {
    let container = document.getElementById('sc-button-mobile-container');
    container.innerHTML = `
    <div class="close-shopping-cart" onclick="removeSC()">
        <img src="img/arrow-105-48.png" alt="arrow">
    </div>

    `;
}


function removeButtonFromSC() {
    let container = document.getElementById('sc-button-mobile-container');
    container.innerHTML = '';
}



function render() {
    let dishesContainer = document.getElementById('dishes-container');

    for (let i = 0; i < dishes.length; i++) {
        let priceRounded = price[i].toFixed(2);
        dishesContainer.innerHTML += `
    <div class="dishes-container">
        <div>
            <h4 class="dish-name" id="dish-name${i}">${dishes[i]}</h4>
            <p class="dish-description" id="dish-description${i}">${description[i]}</p>
            <h4 class="dish-price" id="dish-price${i}">${priceRounded}€</h4>
        </div>
        <img onclick="addToShoppingCard(${i})" class="plus" src="img/plus-64.png" alt="">
    </div>
    `;
    }

}


/*function addToShoppingCard(i) {
    // let index = shoppingCardName.findIndex(x => x.prop2 === dishes[i]);
    if (isDishinShoppingCart(i) === -1) { // Wenn Index nicht gefunden wird, dann wird -1 ausgelesen.
        shoppingCardName.push(dishes[i]);
        shoppingCardPrice.push(price[i]);
        amountInShoppingCart.push(amount[i]);
    } else {
        amountInShoppingCart[i]++;
    }
    renderShoppingcard();
}*/


function addToShoppingCard(i) {
    if (shoppingCardName.indexOf(dishes[i]) === -1) { // Wenn Index nicht gefunden wird, dann wird -1 ausgelesen.
        shoppingCardName.push(dishes[i]);
        shoppingCardPrice.push(price[i]);
        amountInShoppingCart.push(amount[i]);
    } else {
        let index = isDishinShoppingCart(i);
        amountInShoppingCart[index]++;
    }
    renderShoppingcard();
}


function isDishinShoppingCart(i) {
    return shoppingCardName.findIndex(x => x === dishes[i]);
}


function renderShoppingcard() {
    let container = document.getElementById('dishes-in-shopping-card');
    container.innerHTML = '';
    if (shoppingCardName.length == 0) {
        let subtotal = 0;
        renderSum(subtotal);

        container.innerHTML =
            `
        <div class="shopping-bag-section">
            <img src="img/shopping-bag-2-64-2.png" alt="">
            <p>Wähle leckere Gerichte aus der Karte und wähle Dein Menü.</p>
        </div>
    `
    } else {
        for (i = 0; i < shoppingCardName.length; i++) {
            let mathPrice = amountInShoppingCart[i] * shoppingCardPrice[i];

            let shoppingCardPriceRounded = mathPrice.toFixed(2);
            container.innerHTML += `
        <div class="order-list">
            <div class="amount-and-name"><span><b>${amountInShoppingCart[i]}x</b></span><p class="sc-name">${shoppingCardName[i]}</p></div>
            <div class="icons-and-price" >
                <div class="plus-minus-icons" >
                    <img class="sc-icons" src="img/plus-sc.png" onclick="plusOne(${i})">
                    <img class="sc-icons" src="img/minus-sc.png" onclick="minusOne(${i})"> 
                    <img class="sc-icons trash-icon" src="img/trash.png" onclick="deleteFromBasket(${i})">
                </div>
                <div class="price-and-trash" >
                    <p><b>${shoppingCardPriceRounded}€</b></p>
                </div>
            </div>
        </div>
    `;
            renderSum(mathPrice);
            counterForMobile();
        }
    }
}


function renderSum(subtotal) {
    let subtotalContainer = document.getElementById('subtotal');
    let totalSumContainer = document.getElementById('total-sum');
    let sum = 0;
    sum += subtotal + 3;
    subtotalContainer.innerHTML = `${subtotal.toFixed(2)}€`;
    totalSumContainer.innerHTML = `${sum.toFixed(2)}€`;
    if (subtotal > 10) {
        hideMinimumOrderValue();
        return isEnoughInBasket = true;
    } else {
        showMinimumOrderValue();
        return isEnoughInBasket = false;
    }
}


function showMinimumOrderValue() {
    let textContainer = document.getElementById('minimum-text');
    let buttonContainer = document.getElementById('order-button');
    textContainer.innerHTML =
        `
            <p>JOSH'S PASTA liefert erst ab einem Mindestbestellwert von 10.00€ (exkl. Lieferkosten)</p>
        `;

    buttonContainer.innerHTML =
        `
            <div onclick="showOrderSuccess()" class="order-button">Bestellen</div>
        `;
}


function hideMinimumOrderValue() {
    let textContainer = document.getElementById('minimum-text');
    let buttonContainer = document.getElementById('order-button');
    textContainer.innerHTML = ``;
    buttonContainer.innerHTML = `
    <div onclick="showOrderSuccess()" class="order-button-active">Bestellen</div>
    `;
}



function deleteFromBasket(i) {
    shoppingCardName.splice(i, 1);
    shoppingCardPrice.splice(i, 1);
    amountInShoppingCart.splice(i, 1);

    if (amountInShoppingCart.length == 0) {
        showMinimumOrderValue();
    }

    renderShoppingcard();
}


function plusOne(i) {
    amountInShoppingCart[i]++;
    renderShoppingcard();
}


function minusOne(i) {
    if (amountInShoppingCart[i] > 1) {
        amountInShoppingCart[i]--;
    } else {
        shoppingCardName.splice(i, 1);
        shoppingCardPrice.splice(i, 1);
        amountInShoppingCart.splice(i, 1);
    }

    if (amountInShoppingCart.length == 0) {
        showMinimumOrderValue();
    }

    renderShoppingcard();
}


function showOrderSuccess() {
    if (isEnoughInBasket == false) {
        alert('Deine Bestellung reicht leider noch nicht aus, um etwas zu bestellen.');
    } else {
        let container = document.getElementById('popup');
        container.classList.remove('display-none');
        removeSC();
    }
}


function closePopup() {
    shoppingCardName = [];
    shoppingCardPrice = [];
    amountInShoppingCart = [];
    counterForMobile();
    let container = document.getElementById('popup');
    container.classList.add('display-none');

    showMinimumOrderValue();
    renderShoppingcard();
}


function counterForMobile() {
    let container = document.getElementById('show-shopping-cart');
    if (amountInShoppingCart.length > 0) {
        let total = 0;
        container.classList.remove('display-none');
        for (const number of amountInShoppingCart) {
            total += number;
            container.innerHTML = `${total}`;
        }
    } else {
        container.classList.add('display-none')
    }

}


function showButtonInSC() {

}


function showSC() {
    let container = document.getElementById('shopping-card');
    container.classList.remove('display-none');
}


function removeSC() {
    if (mediaQuerie.matches) {
        let container = document.getElementById('shopping-card');
        container.classList.add('display-none');
    }
}





