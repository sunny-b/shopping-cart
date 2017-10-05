import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ShoppingCart extends Component {
  render() {
    return (
      <div>
        <h1>Shopping Cart Example</h1>
        <hr />
        <ProductList />
        <Cart />
      </div>
    );
  }
}

class ProductList extends Component {
  render() {
    return (
      <div>
        <h2>Products</h2>
        <ul>
            <Product description='iPad Mini' price={500.01} amount={3} />
            <Product description='T-Shirt' price={10.01} amount={5}/>
        </ul>
        <hr />
      </div>
    );
  }
}

class Product extends Component {
  render() {
    return (
      <li>
        <p>
          <span>{this.props.description}</span> -
          <span>{this.props.price}</span> x
          <span>{this.props.amount}</span>
        </p>
        <button>Add to cart</button>
      </li>
    );
  }
}

class Cart extends Component {
  render() {
    return (
      <div>
        <h2>Your Cart</h2>

      </div>
    );
  }
}

export default ShoppingCart;
