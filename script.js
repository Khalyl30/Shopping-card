//like
let likes=document.getElementsByClassName("like");
for (let like of likes)
{
    like.addEventListener("click", () =>{
    if( like.firstChild.style.color=="red"){
        like.firstChild.style.color="black"
    }
    else{
        like.firstChild.style.color="red"
    }
    })
}


let pricesInputs = document.getElementsByClassName("Quant");

for (let priceInput of pricesInputs)
{
    priceInput.addEventListener("focus" , (event)=>{
        event.target.oldvalue = event.target.value; // whenever the input is being focused we store the old valeu before it changes
        // we will use it in the other event listener to calculate the price of a signle unit of the product
    })
    priceInput.addEventListener("change", (event)=>
    {
        const oldQuantity = event.target.oldvalue; // save old quantity value for future use 
        const newQuantity = event.target.value;
        if (newQuantity<1)
        {
            event.target.value = event.target.oldvalue;
            return;
        }
        const oldTotalPrice = parseFloat( event.target.parentElement.nextElementSibling.innerHTML); // fetch old price
        const pricePerUnit = oldTotalPrice  / oldQuantity;  // calculate unit price
        const newPrice = newQuantity * pricePerUnit;
        // update DOM 
        event.target.parentElement.nextElementSibling.innerHTML = newPrice; // show new total price
        // store old value for new time 
        event.target.oldvalue = newQuantity;
        
        updateTotal()
    })
}

//plus btn

let btnplus=document.getElementsByClassName("plus-btn");
for(let i=0; i<btnplus.length;i++){
    let plus=btnplus[i];
    plus.addEventListener("click", function(){
        const oldQuantity = parseInt(plus.previousElementSibling.value); // save old quantity value for future use 
        const newQuantity = oldQuantity + 1;
        const oldPrice = parseFloat( plus.parentElement.nextElementSibling.innerHTML); // fetch old price
        const pricePerUnit = oldPrice  / oldQuantity;  // calculate unit price
        const newPrice = newQuantity * pricePerUnit;
        // update DOM 
        plus.previousElementSibling.value = newQuantity // increment quantity in DOM
        plus.parentElement.nextElementSibling.innerHTML = newPrice; // show new total price
        
        updateTotal()
    })
}

//minus button

let btnminus=document.getElementsByClassName("minus-btn");
for(let i=0; i<btnminus.length;i++){
    let minus=btnminus[i];
    minus.addEventListener("click", function(){
       
        const oldQuantity = parseInt(minus.nextElementSibling.value); // save old quantity value for future use 
        const newQuantity = oldQuantity - 1;
        if (!newQuantity)
        {
            return;
        }
        const oldPrice = parseFloat( minus.parentElement.nextElementSibling.innerHTML); // fetch old price
        const pricePerUnit = oldPrice  / oldQuantity;  // calculate unit price
        const newPrice = newQuantity * pricePerUnit;
        // update DOM 
        minus.nextElementSibling.value = newQuantity // increment quantity in DOM
        minus.parentElement.nextElementSibling.innerHTML = newPrice; // show new total price
    
        updateTotal()
    })
}





const updateTotal = () => {
    let pricesInputs = document.getElementsByClassName("price");
    let total = 0
    for (let priceInput of pricesInputs)
    {
        total+=parseFloat( priceInput.innerHTML);
    }
    document.getElementById("finalPrice").value = total;
}