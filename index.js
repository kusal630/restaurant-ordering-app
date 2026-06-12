import { menuArray } from './data.js'

const itemsList = document.getElementById('items-list')
const priceList = document.getElementById('price-list')
const priceSection = document.getElementById('price-section')
const completeOrder = document.getElementById('complete-order')

document.addEventListener("click",function(e){
    menuArray.forEach(function(item){
        if (e.target.id===`item-add-${item.id}`){
        renderPrices(item.id)
    }
        if (e.target.id===`remove-btn-${item.id}`){
            removePriceList(item.id)
        }
    })
    if (e.target.id===`complete-order`){
        confirmOrder()
    }
    if (e.target.id===`pay-btn`){
        renderMessage()
    }
})

let totalPrice = 0


const cardDetailsModal = document.getElementById('card-details-modal')

function renderMessage(){
    const orderMessageContainer = document.getElementById('message-container')
    const orderMessage = document.getElementById('message-container')
    cardDetailsModal.style.display='none'
    priceSection.style.display='none'
    const inputName = document.getElementById('input-name')
    orderMessage.textContent=`Thanks ${inputName.value}! your order is on the way 
                             Returning to default state in 5 seconds`
    orderMessageContainer.style.display='flex'
    setTimeout(()=>{
        window.location.reload()
    },5000)
}


function removePriceList(id){
    const itemPricesection = document.getElementById(`price-section-${id}`)
    itemPricesection.style.display='none'
}

function confirmOrder(){
    // priceSection.style.display='none'
    completeOrder.style.display='none'
    totalPrice=0
    cardDetailsModal.style.display='block'
}

const addedItemsIds=[]

function renderPrices(id){

    // itemPricesection.style.display='block'
    addedItemsIds.push(id)
    let countOfId=0
    addedItemsIds.forEach(function(itemId){
        if (itemId===id){
            countOfId+=1
        }
    })


    const addedItems = menuArray.map(function(item){

        if (item.id===id && countOfId===1 && addedItemsIds.includes(id)){
            totalPrice+=item.price
            return `
            <li class='item-price-section' id='price-section-${item.id}'>
                    <p class='added-item-name'>${item.name}</p>
                    <button id='remove-btn-${item.id}' class='remove-btn'>remove</button>
                    <p id='count-item-${item.id}' class='item-count'>Count:${countOfId}</p>
                    <p id='price-${item.id}' class='added-item-price'>$${item.price}</p>
            </li>`
        }else if(countOfId>1){
            const countItems = document.getElementById(`count-item-${id}`)
            const priceEl = document.getElementById(`price-${id}`)
            countItems.textContent = `Count:${countOfId}`
            let priceOfSingleItem=0
            menuArray.forEach(function(menuItem){
                if (menuItem.id===id){
                    priceOfSingleItem=menuItem.price
                    totalPrice+=priceOfSingleItem
                }
            })
            const totalPriceOfItem = priceOfSingleItem*countOfId
            priceEl.textContent = `$${totalPriceOfItem}`
        }
        console.log(totalPrice)
    })

    priceSection.style.display='block'
    completeOrder.style.display='block'
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