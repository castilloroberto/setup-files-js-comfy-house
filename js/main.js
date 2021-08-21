import { cartBtn, cartOverlay, closeCart, d } from "./constans.js";
import { Products } from "./Products.js";
import { Storage } from "./Storage.js";
import { UI } from "./UI.js";


// cart
let cart = []
let btnsDom = []

d.addEventListener('DOMContentLoaded', () => {

    const ui = new UI()
    const products = new Products()
    cart = Storage.getCart() || []
    ui.setCartValues(cart)
    cartBtn.onclick = ui.toggleCart 
    closeCart.onclick = ui.toggleCart 
    d.addEventListener('click', ({target}) => {
        if (target == cartOverlay) {
            ui.toggleCart()
            
        }
    }) 
    
    

    // obtenber todos los productos
    products.getProducts()
    .then( pdts => {
        ui.displayProducts(pdts)
        Storage.saveProducts(pdts)
        return {
            cart,
            btns: btnsDom
        }
    })
    .then( res => {
        let {cart_,btns_} = ui.getAddButtons(res)
        cart = cart_
        btnsDom = btns_
    })

    
})


