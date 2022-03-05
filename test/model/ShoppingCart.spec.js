import Customer from "../../src/model/Customer.js";
import Product from "../../src/model/Product.js";
import ShoppingCart from "../../src/model/ShoppingCart.js";

//fei
describe("Shopping cart should checkout", () => {

    it("Should calculate correct total and loyalty points for 10% discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(100, "DIS_10_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);
        
        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(90);
        expect(order.loyaltyPoints).toBe(10);
    });

    it("Should calculate correct total and loyalty points for 15% discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(150, "DIS_15_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(127.5);
        expect(order.loyaltyPoints).toBe(10);
    });

    it("Should calculate correct total and loyalty points for 20% discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(300, "DIS_20_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(240);
        expect(order.loyaltyPoints).toBe(15);
    });

    it("Should calculate correct total and loyalty points for Buy_Two_Get_One_Free discounted products Case1_Buy_Three", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(30, "BULK_BUY_2_GET_1", "Test product"),new Product(30, "BULK_BUY_2_GET_1", "Test product"),new Product(30, "BULK_BUY_2_GET_1", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(60);
        expect(order.loyaltyPoints).toBe(12);
    });

    it("Should calculate correct total and loyalty points for Buy_Two_Get_One_Free discounted products Case2_Buy_Two", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(30, "BULK_BUY_2_GET_1", "Test product"),new Product(30, "BULK_BUY_2_GET_1", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(60);
        expect(order.loyaltyPoints).toBe(12);
    });
    it("Should calculate correct total and loyalty points for Buy_Two_Get_One_Free discounted products Case3_Buy_Four", () => {
        const customer = new Customer("Test customer");
        const products = [
            new Product(20, "BULK_BUY_2_GET_1", "Test product"),
            new Product(20, "BULK_BUY_2_GET_1", "Test product"),
            new Product(20, "BULK_BUY_2_GET_1", "Test product"),
            new Product(20, "BULK_BUY_2_GET_1", "Test product"),
        ];
       
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(60);
        expect(order.loyaltyPoints).toBe(12);
    });


    it("Should calculate correct total and loyalty points for non discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(100, "TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(100);
        expect(order.loyaltyPoints).toBe(20);
    });

    it("Should calculate correct total and loyalty points for total price larger than or equals to $500 Case1_Single_Product", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(500, "TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(500*0.95);
        expect(order.loyaltyPoints).toBe(100);
    });

    it("Should calculate correct total and loyalty points for total price larger than or equals to $500 Case2_Multi_Product", () => {
        const customer = new Customer("Test customer");
        const products = [
            new Product(100, "TestProduct", "Test product"),
            new Product(100, "TestProduct", "Test product"),
            new Product(100, "TestProduct", "Test product"),
            new Product(100, "TestProduct", "Test product"),
            new Product(100, "TestProduct", "Test product"),
            new Product(100, "TestProduct", "Test product"),
        ];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(600*0.95);
        expect(order.loyaltyPoints).toBe(600/5);
    });

    it("Should calculate correct total and loyalty points for total price larger than or equals to $500 Case3_Multi_Product_Muti_Discount", () => {
        const customer = new Customer("Test customer");
        const products = [
            new Product(100, "BULK_BUY_2_GET_1", "Test product"), //200 40
            new Product(100, "BULK_BUY_2_GET_1", "Test product"),
            new Product(100, "BULK_BUY_2_GET_1", "Test product"),
            new Product(200, "DIS_10_TestProduct", "Test product"), //180 20
            new Product(200, "DIS_20_TestProduct", "Test product"), //160 10
            new Product(200, "DIS_20_TestProduct", "Test product"), //160 10
        ];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe((200+180+160*2)*0.95);
        expect(order.loyaltyPoints).toBe(40+20+10+10);
    });
});

describe("Shopping cart should modify products", () => {
    it("Should add another product to the cart", () => {
        const customer = new Customer("Test Customer");
        const products = [new Product(100, "TestProductOne", "Test Product One")];
        const shoppingCart = new ShoppingCart(customer, products);

        shoppingCart.addProduct(new Product(200, "TestProductTwo", "Test Product Two"));

        expect(shoppingCart.products).toEqual([
            new Product(100, "TestProductOne", "Test Product One"),
            new Product(200, "TestProductTwo", "Test Product Two")
        ]);
    });

    it("Should remove a product from the cart", () => {
        const customer = new Customer("Test Customer");
        const products = [
            new Product(100, "TestProductOne", "Test Product One"),
            new Product(200, "TestProductTwo", "Test Product Two")
        ];
        const shoppingCart = new ShoppingCart(customer, products);

        shoppingCart.removeProduct(new Product(200, "TestProductTwo", "Test Product Two"));

        expect(shoppingCart.products).toEqual([
            new Product(100, "TestProductOne", "Test Product One")
        ]);
    });
});
