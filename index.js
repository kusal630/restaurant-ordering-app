import { menuArray } from './data.js'

const itemsList = document.getElementById('items-list')
const priceList = document.getElementById('price-list')
const priceSection = document.getElementById('price-section')


document.addEventListener("click",function(e){
    menuArray.forEach(function(item){
        if (e.target.id===`item-add-${item.id}`){
        renderPrices(item.id)
    }
    })
    if (e.target.id=`complete-order`){
        confirmOrder()
    }
    
})

function confirmOrder(){
    priceSection.style.display='block'
    priceList.innerHTML=`Thanks NAME! your order is on the way`
}

function renderPrices(id){

    const addedItems = menuArray.map(function(item){
        if (item.id===id){
            return `
            <li class='price-section'>
                <p class='added-item-name'>${item.name}</p>
                <button class='remove-btn' >remove</button>
                <p class='added-item-price'>$${item.price}</p>
            </li>`
        }
        
    })
    priceSection.style.display='block'
    // const removeBtn = document.getElementById('remove-btn')
    // removeBtn.addEventListener("click",function(){
        
    // })
    priceList.innerHTML+=addedItems.join('')
}



function renderItemsList(){

    const items = menuArray.map(function(item){
        return `
            <li class='item-add-section'>
                <img src=images/${item.image} class='item-emoji'>
                <div class='item-details'>
                    <p class='item-name'>${item.name}</p>
                    <p class='item-ingredients'>${item.ingredients.join(',')}</p>
                    <p class='item-price'>$${item.price}</p>
                </div>
                <button class='item-add-button' id='item-add-${item.id}'>+</button>
            </li>`
    })
    itemsList.innerHTML=items.join('')
}


renderItemsList()