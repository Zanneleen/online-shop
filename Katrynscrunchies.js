$(document).ready(function(){
        //below code contains a show and hide function
        $("#showHow, #hide-btn").hide();//first the showHow paragraph and hide-btn is hidden

        $("#show-btn").click(function(){
            $("#showHow, #hide-btn").show();//onclick the paragraph and hide-btn is shown
        });//end of show.btn
        $("#hide-btn").click(function(){
            $("#showHow").hide();//onclick the paragraph is hidden
        });//end of hide.btn
        //end of show/hide function
    });//end of document.ready 

//this jquery contains an animation
$(document).ready(function(){
    $("#itemsHeading").hide().fadeIn(4000);//when document is finished loading the catalogue heading on the catalogue page will fade in over 4 seconds
});//when you want to fade a object in hide it first otherwise it wint work

//this jquery contains a chaining
$(document).ready(function(){
    $(".shop-item-button, #purchaseBtn ,.btn-shipping").css("background-color","#F3B9D9").css("color","black").css("border-color","white").css("width","100%")
});

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready )
} else {
    ready()//if the page is done loading then the ready() will be activated
}//function checks if the document is still loading

discountCost = 30;//gloabl variables
deliveryCost = 70;//gloabl variables



function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')//button will remove cart items
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]//looping through all the btn dangers
        button.addEventListener('click', removeCartItem)
    }//adding event listener to remove a cart item when a button is clicked

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)//calls up quantityChanged()
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }//when add to cart button is clicked the function addToCartClicked will be activated


    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    //localStorage.clear();//clears local storage when purchase button is clicked
    var id = "Ordernumber" + Math.random().toString(16).slice(2)//unique reference number created

    alert("Your purchase was successful! " + "\nReference number is " + id)//reference number will be shown with alert


    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()//calling updateCartToral()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()//calling updateCartTotal()
}//function removes a cart item

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1//1 is the lowest quantity value that someone can order
    }
    updateCartTotal()//calling CartTotal() to update total
}//function so that the user can't input a negative quantity value in the cart

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src//src because image is not text    
    addItemToCart(title, price, imageSrc)//addItemToCart() is called   
    updateCartTotal()
    alert("The item you added to your cart costs " + price + "\nThe total is R" + total + "\n(vat is included)")
  //above alert will be displayed as soon as the cart is beging added, the price will display as well as the total
}


//function adds the title, price and image into the cart when add to cart is clicked

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')//creating row inside cart
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {         
        alert('This item is already added to the cart')
        return  
        }         
        
    }//stops from adding same item 2 times into the chart

    var cartRowContents =   `
        <div class= "cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`//copied from the html catalogue page for the design of the cart rows
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

//localStorage.setItem("object",cartItems[0]);//shows the object that was clicked on in localStorage on console
//console.log(localStorage)
}



//var total = 0
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]//cart-items wraps all of the cart rows    
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    //setting the total on the bottom of the cart  
    total = 0  //to make a variable global do not add var or let in front of the variable =) 
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]//loop over cartRows
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('R', ''))
        var quantity = quantityElement.value//not innerText because quantity is a number        
        var tax = 0.15//adding tax        
        total = total + (price * quantity)  * tax + price

    }//function updates cartTotal on bottom of cart, updates when a quantity is selected and when items is removed and added to the cart
        total = Math.round(total * 100) / 100//math.round ,rounds up total to nearest 2 decimal places
    document.getElementsByClassName('cart-total-price')[0].innerText ="R" + total; //the total will return to 0 when all of the cart items is removed and will update when new is added
        return total
} 



//accordion JS on catalogue page
//the accordion shows more information about the page
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
};

//Delivery and discounts

function getDeliveryValue(delivery) {
    
    let radioDelivery =  Delivery.elements[delivery];
    //console.log("Radio button" + radio);
    window.rdDelivery;
    //console.log(radio);
    
    for (var i = 0; i < radioDelivery.length; i++) {
      let someRadio = radioDelivery[i];
      if (someRadio.checked) {
        rdDelivery = someRadio.value;
        //console.log(someRadio.value);
        break;
      } else rdDelivery = "noRadioChecked";
    }
    if (rdDelivery == "yes") {
      // check discount that is selected
      
        alert("Delivery fee was added." + "\nPlease check the cart total");
        
        let deliveryDisplay = document.getElementsByClassName("cart-total-price")[0];
        updateCartTotal();
        deliveryDisplay.innerHTML = deliveryCost + total
        
      // output the discount and store depending on what was selected
    }else if(rdDelivery =="no"){
        alert("No delivery option was checked.");

        let deliveryDisplay = document.getElementsByClassName("cart-total-price")[0];

        updateCartTotal();
        deliveryDisplay.innerHTML = total

    }
      
}    

function getDiscountValue(discount) {
    let radio = Discount.elements[discount];
        //console.log(radio) works
    window.rdDiscount;//declares the global variable rdDiscount
//console.log(radio) works
    for (var i = 0; i<radio.length; i++) {
      let someRadio = radio[i];
      //console.log("Halo " + someRadio);
      if (someRadio.checked) {
        rdDiscount = someRadio.value;
        //console.log(someRadio.value);
        break;
      } else rdDiscount = "noRadioChecked";
    }
    if (rdDiscount == "yes") {
        
          // check discount that is selected      
        //discountCost = 30 ;
        alert("Discount fee was given at R" + discountCost + "\nYou will get R30 off your first purchase." );
        //discountCost = 30 ;
        let discountDisplay = document.getElementsByClassName("cart-discount-price")[0];
        //updateCartTotal();
        discountDisplay.innerHTML = discountCost 
        updateCartTotal();

            let deliveryDisplay = document.getElementsByClassName("cart-total-price")[0];
            deliveryDisplay.innerHTML =  total - discountCost

}
      // output the discount and store depending on what was selected
    else if(rdDiscount =="no"){
        alert("Thank you for being honest.");
        updateCartTotal();
        let deliveryDisplay = document.getElementsByClassName("cart-total-price")[0];
        deliveryDisplay.innerHTML = total
    }

    //return discountCost
}