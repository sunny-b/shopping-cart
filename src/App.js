import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const initialProducts = {
  products: [
    {"id": 1, "description": "iPad 4 Mini", "price": 500.01, "inventory": 2},
    {"id": 2, "description": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
    {"id": 3, "description": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
  ],
  lastId: 3,
};

function productsReducer(state = initialProducts, action) {
  if (action.type === 'ADD_PRODUCT') {
    const newProduct = {...action.newProduct, id: state.lastId + 1};

    return {
      products: [...state.products, action.newProduct],
      lastId: newProduct.id,
    };
  } else if (action.type === 'ADD_ITEM_TO_CART') {
    const productIdx = state.products.findIndex(p => p.id === action.product.id);
    const product = state.products[productIdx];
    const newProduct = {...product, inventory: product.inventory - 1};

    return {
      ...state,
      products: [
      ...state.products.slice(0, productIdx),
      newProduct,
      ...state.products.slice(productIdx + 1),
      ],
    };
  } else if (action.type === 'UPDATE_PRODUCT') {
    const products = state.products.filter(item =>
      item.id !== action.product.id).concat(action.product).sort((a, b) => a.id - b.id);
    return {
      ...state,
      products
    }
  } else {
    return state;
  }
}

function totalCostReducer(state = 0, action) {
  if (action.type === 'ADD_ITEM_TO_CART') {
    return state + action.product.price;
  } else if (action.type === 'CHECKOUT') {
    return 0;
  } else {
    return state;
  }
}

function cartItemsReducer(state = [], action) {
  if (action.type === 'ADD_ITEM_TO_CART') {
    const filteredItems = state.filter(cartItem => {
      return cartItem.id === action.product.id
    });

    if (filteredItems.length > 0) {
      return state;
    } else {
      return state.concat(action.product);
    }
  } else if (action.type === 'CHECKOUT') {
    return [];
  } else {
    return state;
  }
}

const reducer = combineReducers({
  products: productsReducer,
  totalCost: totalCostReducer,
  cartItems: cartItemsReducer,
});

const store = createStore(reducer);

class ShoppingCart extends Component {
  componentDidMount = () => {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    return (
      <div>
        <h1>Shopping Cart Example</h1>
        <AddNewItemForm />
        <hr />
        <ProductList />
        <Cart />
      </div>
    );
  }
}

class AddNewItemForm extends Component {
  state = {
    description: '',
    price: '',
    inventory: ''
  }

  handleChange = (e) => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    store.dispatch({
      type: 'ADD_PRODUCT',
      product: {
        description: this.state.description,
        price: +this.state.price,
        inventory: +this.state.inventory,
      }
    });

    this.setState({
      description: '',
      price: '',
      inventory: '',
    });
  }

  render() {
    return (
      <div>
        <h3>Add New Product</h3>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='Description'
            name='description'
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input
            placeholder='Price'
            name='price'
            type='number'
            value={this.state.price}
            onChange={this.handleChange}
          />
          <input
            placeholder='Inventory'
            name='inventory'
            type='number'
            value={this.state.inventory}
            onChange={this.handleChange}
          />

          <input type='submit' />
        </form>
      </div>
    );
  }
}

class ProductList extends Component {
  render() {
    const state = store.getState();
    const productComponents = state.products.products.map(product => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          description={product.description}
          price={product.price}
          inventory={product.inventory}
        />
      );
    });
    return (
      <div>
        <h2>Products</h2>
        <ul>
            {productComponents}
        </ul>
        <hr />
      </div>
    );
  }
}

class Product extends Component {
  state = {
    openForm: false
  }

  handleClick = (e) => {
    this.setState({ openForm: true });
  }

  closeEditForm = () => {
    this.setState({ openForm: false });
  }

  render() {
    return (
      <li>
        <ProductDescription
          description={this.props.description}
          price={this.props.price}
          inventory={this.props.inventory}
        />
        <AddToCart
          id={this.props.id}
          disabled={this.props.inventory > 0 ? false : true }
        />
        <EditForm
          openForm={this.state.openForm}
          id={this.props.id}
          description={this.props.description}
          price={this.props.price}
          inventory={this.props.inventory}
          onClick={this.handleClick}
          closeForm={this.closeEditForm}
        />
      </li>
    );
  }
}

class EditForm extends Component {
  state = {
    id: this.props.id,
    description: this.props.description,
    price: this.props.price,
    inventory: this.props.inventory
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.closeForm();
    store.dispatch({
      type: 'UPDATE_PRODUCT',
      product: {
        id: +this.state.id,
        description: this.state.description,
        price: +this.state.price,
        inventory: +this.state.inventory,
      },
    });
  }

  handleChange = (e) => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    if (this.props.openForm) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='Description'
            name='description'
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input
            placeholder='Price'
            name='price'
            type='number'
            value={this.state.price}
            onChange={this.handleChange}
          />
          <input
            placeholder='Inventory'
            name='inventory'
            type='number'
            value={this.state.inventory}
            onChange={this.handleChange}
          />

          <input type='submit' />
        </form>
      );
    } else {
      return (
        <button onClick={this.props.onClick}>Edit Product</button>
      );
    }
  }
}

const ProductDescription = (props) => {
  if (props.inventory) {
    return (
      <p>
        <span>{props.description}</span>
        <span> - ${props.price}</span>
        <span> x {props.inventory}</span>
      </p>
    );
  } else {
    return (
      <p>
        <span>{props.description}</span>
        <span> - ${props.price}</span>
      </p>
    );
  }
};

class AddToCart extends Component {
  handleAddToCart = () => {
    const state = store.getState();
    store.dispatch({
      type: 'ADD_ITEM_TO_CART',
      product: state.products.products.filter(p => p.id === this.props.id)[0]
    });
  }

  render() {
    if (this.props.disabled) {
      return (
        <button disabled>Sold out</button>
      )
    }
    else {
      return (
        <button
          onClick={this.handleAddToCart}
        >
          Add to cart
        </button>
      )
    }
  }
}

class Cart extends Component {
  render() {
    const state = store.getState();
    return (
      <div>
        <h2>Your Cart</h2>
          <CartList />
          <p>
            Total: $<span>{state.totalCost}</span>
          </p>
          <Checkout />
      </div>
    );
  }
}

class CartList extends Component {
  render() {
    const state = store.getState();

    if (state.cartItems.length === 0) {
      return (
        <em>Please add some items to cart.</em>
      );
    } else {
      const components = state.cartItems.map((product) => (
        <ProductDescription
          key={'product-' + product.id}
          id={product.id}
          description={product.description}
          price={product.price}
        />
      ));
      return (
        <div>
          {components}
        </div>
      );
    }
  }
}

class Checkout extends Component {
  handleCheckout = () => {
    store.dispatch({ type: 'CHECKOUT' });
  }

  render() {
    const state = store.getState();
    return (
      <button
        disabled={state.totalCost === 0 ? true : false}
        onClick={this.handleCheckout}
      >
        Checkout
      </button>
    )
  }
}

const WrappedShoppingCart = () => (
  <Provider store={store}>
    <ShoppingCart />
  </Provider>
);

export default WrappedShoppingCart;
