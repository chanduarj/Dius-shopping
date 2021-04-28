
export default class PricingRules {
  constructor(Checkout) {
    this.cart = Checkout.cart;
    this.catalogue = Checkout.catalogue;
    this.addItemToCart = Checkout.addItemToCart;
  }

  // Apply discount and update the price based on quantity.

  offerPrice(itemSKU, { offerQty, discountedPrice }) {
    const { qty } = this.cart[itemSKU];

    if (qty > offerQty) {
      this.cart[itemSKU].price = discountedPrice;
    }
  }

  // update free product to the cart if applied
  
  freeProduct(itemSKU, { freeSKU }) {
    const { qty: primarySKUqty } = this.cart[itemSKU];

    // Add free sku to cart 

    if (!this.cart[freeSKU]) {
      this.addItemToCart(freeSKU);
    }

    this.cart[freeSKU].freeQty += primarySKUqty;
    this.cart[freeSKU].qty -= primarySKUqty;

     if (this.cart[freeSKU].qty < 0) this.cart[freeSKU].qty = 0;
  }

  // Apply Discount based on quantity

  bulkDiscount(itemSKU, { triggerQty, freeQty }) {
    const { qty } = this.cart[itemSKU];

    if (qty >= triggerQty) {
      const applyOffer = Math.floor(qty / triggerQty);
      this.cart[itemSKU].qty -= (freeQty * applyOffer);
      this.cart[itemSKU].freeQty = (freeQty * applyOffer);
    }
  }
}
