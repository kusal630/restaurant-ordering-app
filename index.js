import { menuArray } from './data.js'

const itemsList = document.getElementById('items-list')
const priceList = document.getElementById('price-list')
const priceSection = document.getElementById('price-section')
const completeOrder = document.getElementById('complete-order')
// const payBtn = document.getElementById('pay-btn')
const cardDetailsForm = document.getElementById('card-details-form')


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
})


const cardDetailsModal = document.getElementById('card-details-modal')


cardDetailsForm.addEventListener('submit',function(event){
    event.preventDefault()
    const orderMessageContainer = document.getElementById('message-container')
    const orderMessage = document.getElementById('message-container')
    cardDetailsModal.style.display='none'
    priceSection.style.display='none'
    const inputName = document.getElementById('input-name')
    orderMessage.textContent=`Thanks, ${inputName.value}! your order is on the way`
    orderMessageContainer.style.display='flex'
    setTimeout(()=>{
        window.location.reload()
    },5000)
})


let addedItemsIds=[]
const uniqueAddedItemIds=[]
let totalPrice = 0
const addedLists = []
const totalPriceEl = document.getElementById('total-price')


function confirmOrder(){
    // priceSection.style.display='none'
    if (addedItemsIds.length>0){
        completeOrder.style.display='none'
        cardDetailsModal.style.display='block'
    }
}


function removePriceList(id){
    const itemPricesection = document.getElementById(`price-section-${id}`)
    itemPricesection.style.display='none'
    const removeItemIndex = uniqueAddedItemIds.indexOf(id)
    const remainingItemsIds=addedItemsIds.filter(function(element){
        return element!=id
    })
    addedItemsIds=[...remainingItemsIds]
    console.log(addedLists)
    addedLists.splice(removeItemIndex,1)
    console.log(addedLists)
    menuArray.forEach(function(item){
        if (item.id===id){
            totalPrice=totalPrice-item.price
        }
    })
    totalPriceEl.textContent=`$${totalPrice}`
    const itemAddBtn = document.getElementById(`item-add-${id}`)
    itemAddBtn.disabled = true
    // addedItems.splice(removeItemIndex,1)
}

function renderPrices(id){

    addedItemsIds.push(id)
    let countOfId=0
    addedItemsIds.forEach(function(itemId){
        if (itemId===id){
            countOfId+=1
        }
    })

    menuArray.forEach(function(item){

        if (item.id===id && countOfId===1){
            totalPrice+=item.price
            const listHtml = `
            <li class='item-price-section' id='price-section-${item.id}'>
                    <p class='added-item-name'>${item.name}</p>
                    <button id='remove-btn-${item.id}' class='remove-btn'>remove</button>
                    <p id='count-item-${item.id}' class='item-count'>Count:${countOfId}</p>
                    <p id='price-${item.id}' class='added-item-price'>$${item.price}</p>
            </li>`
            addedLists.push(listHtml)
            uniqueAddedItemIds.push(id)
            priceSection.style.display='block'
            completeOrder.style.display='block'
            priceList.innerHTML+=addedLists.at(-1)
            const itemPricesection2 = document.getElementById(`price-section-${id}`)
            itemPricesection2.style.display='flex'


            // return `
            // <li class='item-price-section' id='price-section-${item.id}'>
            //         <p class='added-item-name'>${item.name}</p>
            //         <button id='remove-btn-${item.id}' class='remove-btn'>remove</button>
            //         <p id='count-item-${item.id}' class='item-count'>Count:${countOfId}</p>
            //         <p id='price-${item.id}' class='added-item-price'>$${item.price}</p>
            // </li>`
        }
        else if(countOfId>1 && item.id===id){
            const countItems = document.getElementById(`count-item-${id}`)
            const priceEl = document.getElementById(`price-${id}`)
            countItems.textContent = `Count:${countOfId}`
            let priceOfSingleItem=0
            menuArray.forEach(function(menuItem){
                if (menuItem.id===id){
                    priceOfSingleItem=menuItem.price
                }
            })
            const totalPriceOfItem = priceOfSingleItem*countOfId
            priceEl.textContent = `$${totalPriceOfItem}`
            totalPrice+=priceOfSingleItem
        }
    })
    console.log(addedItemsIds)
    totalPriceEl.textContent=`$${totalPrice}`

    // remove price section


    // console.log(addedItemsIds)
    

}

function randomNumberGenerator(){
    return Math.floor(Math.random()*3)
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