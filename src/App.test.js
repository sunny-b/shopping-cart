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
  it('displays a button', () => {
    const wrapper = shallow(<App.AddToCart />);
    expect(wrapper.containsMatchingElement(<button>Add to cart</button>)).toBe(true);
  });

  it('disables button when inventory is 0', () => {
    const wrapper = shallow(<App.AddToCart disabled={true} />);
    expect(wrapper.find('button').first().props().disabled).toBe(true);
  });
});

describe('AddNewItemForm', () => {
  let wrapper;
  it('displays a form', () => {
    wrapper = shallow(<App.AddNewItemForm />);
    expect(wrapper.containsMatchingElement(<form><input /><input /><input /><input /></form>)).toBe(true);
  });

  describe('and then submits the form', () => {
    let submitWrapper;
    let form;
    beforeEach(() => {
      submitWrapper = shallow(<App.AddNewItemForm onSubmit={() => {}} />);
      form = submitWrapper.find('form').first();
      form.simulate('submit', { preventDefault: () => {} })
    });

    it('clears the form', () => {
      const input = form.find('input').first();
      expect(submitWrapper.state().description).toEqual('');
    });
  })
});

describe('Cart', () => {
  it('has a title', () => {
    const wrapper = shallow(<App.Cart />);
    expect(wrapper.contains(<h2>Your Cart</h2>)).toBe(true);
  })
});

describe('CartList', () => {
  it('displays a message if the cart is empty', () => {
    const wrapper = shallow(<App.CartList cartItems={[]}/>);
    expect(wrapper.contains(<em>Please add some items to cart.</em>)).toBe(true);
  });
  it('displays list instead of message if something is in cart', () => {
    const wrapper = shallow(<App.CartList cartItems={[{"id": 1, "description": "iPad 4 Mini", "price": 500.01, "inventory": 2}]} />);
    expect(wrapper.contains(<em>Please add some items to cart.</em>)).toBe(false);
  })
});

describe('Checkout', () => {
  it('is disabled when total cost is zero', () => {
    const wrapper = shallow(<App.Checkout disabled={true}/>);
    expect(wrapper.containsMatchingElement(<button disabled={true}>Checkout</button>)).toBe(true);
  });

  it('calls handleSubmit method when clicked', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<App.Checkout disabled={false} onCheckout={handleSubmit} />);
    const button = wrapper.find('button').first();
    button.simulate('click');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
