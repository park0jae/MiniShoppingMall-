'use strict';

// Fetch the items from the JSON file
function loadItems(){
    return fetch('data.json')
    .then(response => response.json())
    .then( json=> json.items);
}

// update the list with the given items
function displayItems(items){
    const container = document.querySelector('.items');
    // map 으로 배열형태로 만든뒤에 join으로 문자열형태로 변환해줌 
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// create HTMl list item from the given data item 
function createHTMLString(items){
    return `
    <li class="item">
        <img src="${items.image}" alt="${items.type}" class="item_thumnail">
        <span class="item_description">${items.gender} , ${items.size}</span>
    </li>
    `;
}

function onButtonClick(event, items){
    console.log(items);
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null){
        return;
    }
    displayItems(items.filter(item => item[key] === value))

}

// event handling 
function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.button');
    logo.addEventListener('click',() =>displayItems(items));
    buttons.addEventListener('click' , event => onButtonClick(event, items));
}


loadItems()
.then(items =>{
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);