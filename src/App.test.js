import React from 'react';
import ReactDOM from 'react-dom';
import { ShoppingCart, ProductList } from './App';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ShoppingCart />);
  });

  it('has a title', () => {
    expect(wrapper.contains(<h1>Shopping Cart Example</h1>)).toBe(true);
  });

  describe('Product List', () => {
    it('has a title', () => {
      const wrapper = shallow(<ProductList />);
      expect(wrapper.contains(<h2>Products</h2>)).toBe(true);
    });
  });
});