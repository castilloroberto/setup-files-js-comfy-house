import { cartContent, cartDOM, cartItems, cartOverlay, cartTotal, d, productsDOM } from "./constans.js"
import { Storage } from "./Storage.js"

// mostrar los productos en el documento
export class UI{


    displayProducts(products = []){
        let result = ''
        //foreach
        products.forEach( p => {
            result += `
            <!-- plantilla de producto -->
            <article class="product">
                <div class="img-container">
                    <img class="product-img" src=${p.image} alt=${p.title}>
                    <button class="add-btn" data-id=${p.id}>
                        <i class="fas fa-shopping-cart"></i>
                        Agregar
                    </button>
                </div>

                <h3>${p.title}</h3>
                <h4>$${p.price}</h4>
            </article>
            <!-- end of plantilla de producto -->
            
            `
        })
        //fin del foreach
        productsDOM.innerHTML = result
    }

    getAddButtons({cart = [],btns = []}){
        btns = [...d.querySelectorAll('.add-btn')]
        btns.forEach( btn => {
            let id = btn.dataset.id

            let inCart = cart.find( item => item.id === id)
            if (inCart) {
                btn.innerText = 'Agregado!!!'
                btn.disabled = true
            }
            
            btn.addEventListener('click',(event) => {
                btn.innerText = 'Agregado!!!'
                btn.disabled = true
                
                // obtener un producto de los productos
                let cartItem = {
                    ...Storage.getProduct(id),
                    amount:1
                }
                console.log(cartItem);
                
                // agregar el productoa  el carrito
                cart.push(cartItem)
                console.log(cart);
                
                // guardar el cvarrito en el almacenamiento local
                Storage.saveCart(cart)
                
                // establecer los valores del carrito
                this.setCartValues(cart)

                // agregar item al carrito
                //this.addCartItem(cartItem)

                // mostrar el carrrito 
                this.toggleCart()
            })
        })
        return {
            cart_:cart,
            btns_:btns
        }
    }

    toggleCart(){
        cartOverlay.classList.toggle('transparentBcg')
        cartDOM.classList.toggle('showCart')
    }

    setCartValues(cart = []){
        this.cargarCart(cart)
        let tempTotal = 0
        let itemsTotal = 0
        cart.map( ({amount,price}) => {
            tempTotal += price*amount //items.price*item.amount
            itemsTotal += amount
        })
        cartTotal.textContent = parseFloat(tempTotal.toFixed(2)) 
        // toFixed(2) dos decimales
        cartItems.textContent = itemsTotal
    
    }

    cargarCart(items=[]){
        cartContent.innerHTML = ''
        items.forEach(e =>{
            this.addCartItem(e)
        })
    }
    addCartItem({id,image,title,price,amount}){
        
        
        const cartItem = d.createElement('div');
        cartItem.classList.add('cart-item')
        cartItem.innerHTML= `
        <!-- cart-item -->
            <img src=${image}>
            <div>
                <h4>${title}</h4>
                <h5>$${price}</h5>
                <span data-id=${id} class="remove-item">Quitar</span>
            </div>
            <div>
                <i data-id=${id} class="fas fa-chevron-up"></i>
                <p class="item-amount">${amount}</p>
                <i data-id=${id} class="fas fa-chevron-down"></i>
            </div>
        <!-- end of cart-item -->
        `
        cartContent.append(cartItem)
    }

}