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

describe('Shopping Cart', () => {
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
    expect(wrapper.containsMatchingElement(<form><input/><input/><input/><input/></form>)).toBe(true);
  });
});

describe('ProductDescription', () => {
  let firstProduct = state.products[0]

  it('displays product details', () => {
    const wrapper = shallow(<App.ProductDescription
                              description={firstProduct.description}
                              price={firstProduct.price}
                              inventory={firstProduct.inventory} />);

    expect(wrapper.contains("iPad 4 Mini")).toBe(true);
    expect(wrapper.contains(500.01)).toBe(true);
    expect(wrapper.contains(2)).toBe(true);
  });
});

describe('AddToCart', () => {
  it('adds a new cart item to the cart', () => {
    const wrapper = shallow(<App.AddToCart id={1}/>);
    const button = wrapper.find('button').first();
    button.simulate('click');

    expect(wrapper.state().cartItems.length).toBe(1);
  });
})
