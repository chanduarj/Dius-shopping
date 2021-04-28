import Checkout from './src/checkout';
import catalogue from './src/catalogue';
import offerRules from './src/offerRulesConfig';

const co1 = new Checkout(catalogue, offerRules);
co1.scan('atv');
co1.scan('atv');
co1.scan('atv');
co1.scan('vga');
co1.total();

const co2 = new Checkout(catalogue, offerRules);
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('ipd');
co2.total();

const co3 = new Checkout(catalogue, offerRules);
co3.scan('mbp');
co3.scan('vga');
co3.scan('ipd');
co3.total();

const co4 = new Checkout(catalogue, offerRules);
co4.scan('atv');
co4.scan('atv');
co4.scan('atv');
co4.scan('mbp');
co4.scan('mbp');
co4.scan('mbp');
co4.scan('vga');
co4.scan('vga');
co4.scan('vga');
co4.scan('ipd');
co4.total();