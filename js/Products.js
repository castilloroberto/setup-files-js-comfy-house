// obtener los productos
export class Products{

    async getProducts(){

        try {
            const {items} =  await (await fetch('./products.json')).json()
            const products = items.map( item => {
                const {id} = item.sys
                const {title,price} = item.fields
                const image = item.fields.image.fields.file.url
                return {
                    id,
                    title,
                    price,
                    image
                } 
            }) 
            return products
            
        } catch (error) {
            console.error(error);
        }
    } 
    
}