import { ShoppingCard } from './shopping-card';
export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId, public shipping: any, shoppingCard: ShoppingCard) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCard.items.map(i => {
            return {
                product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            };
        });
    }
}
