import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ShoppingCart extends Component {
  state = {
    products: [
      {"id": 1, "description": "iPad 4 Mini", "price": 500.01, "inventory": 2},
      {"id": 2, "description": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
      {"id": 3, "description": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
    ],
    totalCost: 0,
    cartItems: [],
  };

  handleAddToCart = (productId) => {
    const product = this.state.products.filter(product => product.id === productId)[0];

    this.setState(prevState => {
      return {
        products: this.decreaseInventory(productId),
        totalCost: this.state.totalCost + product.price,
        cartItems: this.addItemToCart(product),
      }
    });
  }

  decreaseInventory = (productId) => {
    return this.state.products.map(product => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          inventory: product.inventory - 1,
        });
      } else {
        return product;
      }
    });
  }

  addItemToCart = (product) => {
    const filteredItems = this.state.cartItems.filter(cartItem => {
      return cartItem.id === product.id
    });

    if (filteredItems.length > 0) {
      return this.state.cartItems;
    } else {
      return this.state.cartItems.concat(product);
    }
  }

  handleCheckout = () => {
    this.emptyCart();
  }

  emptyCart = () => {
    this.setState(prevState => {
      return {
        products: this.state.products,
        totalCost: 0,
        cartItems: [],
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Shopping Cart Example</h1>
        <hr />
        <ProductList
          products={this.state.products}
          onAddToCart={this.handleAddToCart}
        />
        <Cart
          totalCost={this.state.totalCost}
          cartItems={this.state.cartItems}
          onCheckout={this.handleCheckout}
        />
      </div>
    );
  }
}

class ProductList extends Component {
  render() {
    const productComponents = this.props.products.map(product => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          description={product.description}
          price={product.price}
          inventory={product.inventory}
          onAddToCart={this.props.onAddToCart}
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
  render() {
    return (
      <li>
        <ProductDescription
          description={this.props.description}
          price={this.props.price}
          inventory={this.props.inventory}
        />
        <AddToCart
          onAddToCart={this.props.onAddToCart}
          id={this.props.id}
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
          <span>{this.props.description}</span>
          <span> - ${this.props.price}</span>
          <span> x {this.props.inventory}</span>
        </p>
      )
    } else {
      return (
        <p>
          <span>{this.props.description}</span>
          <span> - ${this.props.price}</span>
        </p>
      )
    }
  }
}

class AddToCart extends Component {
  handleAddToCart = () => {
    this.props.onAddToCart(this.props.id);
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
    return (
      <div>
        <h2>Your Cart</h2>
          <CartList
            cartItems={this.props.cartItems}
          />
          <p>
            Total: $<span>{this.props.totalCost}</span>
          </p>
          <Checkout
            disabled={this.props.totalCost === 0 ? true : false}
            onCheckout={this.props.onCheckout}
          />
      </div>
    );
  }
}

class CartList extends Component {
  render() {
    if (this.props.cartItems.length === 0) {
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
  handleCheckout = () => {
    this.props.onCheckout()
  }

  render() {
    return (
      <button
        disabled={this.props.disabled}
        onClick={this.handleCheckout}
      >Checkout</button>
    )
  }
}

export default ShoppingCart;
