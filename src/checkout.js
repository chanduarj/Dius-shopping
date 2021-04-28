/* eslint-disable no-console */
import PricingRules from './pricingRules';

export default class Checkout {
  constructor(catalogue, offerRules) {
    this.catalogue = catalogue;
    this.offerRules = offerRules;
    this.cart = {};
  }

  /**
   * Returns the updated cart
   * @description add or update the shopping cart.
   */
  scan(sku) {
    if (this.cart[sku]) {
      this.cart[sku].qty += 1;
    } else {
      this.addItemToCart(sku);
    }
    return this;
  }

  /**
   * Returns cart for the checkout
   * @description Adds a new item to the shopping cart.
   */
  addItemToCart(sku) {
    const item = this.catalogue.find((catalogueItem) => catalogueItem.sku === sku);

    if (!item) {
      console.warn(`Incorrect ${sku} entered`);
      return false;
    }

    this.cart[sku] = {
      name: item.name,
      qty: 1,
      price: item.price,
      freeQty: 0,
    };

    return this.cart;
  }

  /**
   * Returns Grand total
   * @description Calculate and return grand total.
   */
  total() {
    const applyOfferRules = new PricingRules(this);

    let grandTotal = 0;

    Object.keys(this.cart).forEach((itemSKU) => {

      const offersApplied = this.offerRules.filter(({ skus }) => skus.indexOf(itemSKU) > -1);
      if (offersApplied) {
        offersApplied.map((offer) => applyOfferRules[offer.type](itemSKU, offer));
      }

      const { qty, price } = this.cart[itemSKU];
      
      const itemTotalPrice = price * qty;

      grandTotal += itemTotalPrice;
    });

    console.log('\n\n\n********************* Dius Shopping Cart Checkout ***********************\n\n');
    
    Object.keys(this.cart).forEach((itemSKU) => {
      const {
        name, qty, freeQty, price,
      } = this.cart[itemSKU];

      const itemTotalPrice = price * qty;

      console.log(`Name: ${name}\nQuantity: ${qty + freeQty}\nPrice: ${itemTotalPrice.toFixed(2)}`);
      console.log('----------------------------------------------');
    });

    console.log(`\nYour Total price: ${grandTotal.toFixed(2)}`);
    console.log('----------------------------------------------');

    return grandTotal;
  }
}
