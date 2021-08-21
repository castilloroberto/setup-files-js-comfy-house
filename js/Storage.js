export class Storage{

    static saveProducts(products = []){
        localStorage.setItem(
            'products',
            JSON.stringify(products)
        )
    }
    static saveCart(cart = []){
        localStorage.setItem(
            'cart',
            JSON.stringify(cart)
        )
    }

    static getProducts(){
        const pdts = JSON.parse(
            localStorage.getItem('products')
        )
            
        return pdts
    }
    static getCart(){
        const cart = JSON.parse(
            localStorage.getItem('cart')
        )
            
        return cart
    }

    static getProduct(id = 0){
        let
        pdts = JSON.parse(
            localStorage.getItem('products')
        )
            
        return pdts.find( item => item.id === id)
    }
}