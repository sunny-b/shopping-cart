import React from 'react';
import ReactDOM from 'react-dom';
import * as App from './App';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const state = {
  products: [
    {"id": 1, "description": "iPad 4 Mini", "price": 500.01, "inventory": 2},
    {"id": 2, "description": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
    {"id": 3, "description": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
  ],
  totalCost: 0,
  cartItems: [],
  lastId: 3,
};


describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App.ShoppingCart />);
  });

  it('has a title', () => {
    expect(wrapper.contains(<h1>Shopping Cart Example</h1>)).toBe(true);
  });
});

describe('Product List', () => {
  it('has a title', () => {
    const wrapper = shallow(<App.ProductList products={state.products} />);
    expect(wrapper.contains(<h2>Products</h2>)).toBe(true);
  });
});

describe('Product', () => {
  it('can toggle edit form', () => {});
});

describe('EditForm', () => {
  it('displays button when openForm prop is false', () => {
    const wrapper = shallow(<App.EditForm openForm={false}/>);

    expect(wrapper.containsMatchingElement(<button>Edit Product</button>)).toBe(true);
  });

  it('displays form when openForm prop is true', () => {
    const wrapper = shallow(<App.EditForm openForm={true}/>);
    expect(wrapper.containsMatchingElement(<form></form>)).toBe(true);
  });
});
