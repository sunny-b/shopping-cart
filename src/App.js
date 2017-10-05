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
        <Cart
          totalcost={0}
          cartItems={[
            {"id": 1, "description": "iPad 4 Mini", "price": 500.01}
          ]}
        />
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
            <Product description='iPad Mini' price={500.01} inventory={0}/>
            <Product description='T-Shirt' price={10.01} inventory={5}/>
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
        <ProductDescription
          description={this.props.description}
          price={this.props.price}
          inventory={this.props.inventory}
        />
        <AddToCart
          disabled={this.props.inventory > 0 ? false : true }
        />
      </li>
    );
  }
}

class ProductDescription extends Component {
  render() {
    if (this.props.inventory) {
      return (
        <p>
          <span>{this.props.description}</span> -
          <span>{this.props.price}</span> x
          <span>{this.props.inventory}</span>
        </p>
      )
    } else {
      return (
        <p>
          <span>{this.props.description}</span> -
          <span>{this.props.price}</span>
        </p>
      )
    }
  }
}

class AddToCart extends Component {
  render() {
    if (this.props.disabled) {
      return (
        <button disabled>Sold out</button>
      )
    }
    else {
      return (
        <button>Add to cart</button>
      )
    }
  }
}

class Cart extends Component {
  render() {
    return (
      <div>
        <h2>Your Cart</h2>
          <CartList 
            cartItems={this.props.cartItems}
          />
          <p>
            Total:<span>{this.props.totalcost}</span>
          </p>
          <Checkout
            disabled={this.props.totalcost === 0 ? true : false}
          />
      </div>
    );
  }
}

class CartList extends Component {
  render() {
    if (this.props.totalcost === 0) {
      return (
        <em>Please add some items to cart.</em>
      );
    } else {
      const components = this.props.cartItems.map((product) => (
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
  render() {
    return (
      <button disabled={this.props.disabled}>Checkout</button>
    )
  }
}

export default ShoppingCart;
