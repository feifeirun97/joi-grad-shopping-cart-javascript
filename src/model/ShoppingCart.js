import _ from "lodash";
import Order from "./Order.js";

export default class ShoppingCart {
    constructor(customer, products) {
        this.customer = customer;
        this.products = products;
        this.hash = {};
    };

    addProduct = (product) => {
        this.products.push(product);
    };

    removeProduct = (product) => {
        _.remove(this.products, product);
    };

    checkout = () => {
        let totalPrice = 0;
        let loyaltyPointsEarned = 0;

        this.products.forEach(product => {
            let discount = 0;
            if (product.code.startsWith("DIS_10")) {
                discount = product.price * 0.1;
                loyaltyPointsEarned += product.price / 10;
            } else if (product.code.startsWith("DIS_15")) {
                discount = product.price * 0.15;
                loyaltyPointsEarned += product.price / 15;
            } else if (product.code.startsWith("DIS_20")) {
                discount = product.price * 0.2;
                loyaltyPointsEarned += product.price / 20;
            } else if (product.code.startsWith("BULK_BUY_2_GET_1")) {
                if (!(product.code in this.hash)) {
                    //calculate number of same product
                    let sameProductNum = this.products.filter(p => p.code === product.code).length;
                    //calculate discount 
                    discount = parseInt(sameProductNum / 3) * product.price;

                    loyaltyPointsEarned += (product.price * sameProductNum - discount) / 5;
                    //product done
                    this.hash[product.code] = 'done'
                }
            } else {
                loyaltyPointsEarned += product.price / 5;
            }

            totalPrice += product.price - discount;
        });
            //total price larger than or equals to $500, discount 5%
            if (totalPrice >= 500) { totalPrice = totalPrice * 0.95 }
        return new Order(totalPrice, loyaltyPointsEarned);
    };

    displaySummary = () => {
        return "Customer: " + this.customer.name + "\n" +
            "Bought:  \n" + this.products.map(p => "- " + p.name + ", " + p.price).join('\n');
    }
};
