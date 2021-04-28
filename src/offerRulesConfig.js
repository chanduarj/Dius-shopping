const offerRules = [
  {
    skus: ['ipd'],
    type: 'offerPrice',
    discountQty: 4,
    discountedPrice: 499.99,
  },
  {
    skus: ['mbp'],
    type: 'freeProduct',
    freeSKU: 'vga',
  },
  {
    skus: ['atv', 'mbp'],
    type: 'bulkDiscount',
    triggerQty: 3,
    freeQty: 1,
  },
];

export default offerRules;
