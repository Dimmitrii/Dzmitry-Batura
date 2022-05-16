import { Component } from 'react';

import "./App.css";

import { Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import List from './components/ProductListPage/List';
import ProductPage from './components/ProductPage/ProductPage';
import CartPage from './components/CartPage/Cart';

export default class App extends Component {
  render(){
    return(
      <div className="App">
          <NavBar/>
          <Switch>
            <Route path="/main/item/:id" render={(props) => <ProductPage {...props}/>}/>
            <Route path='/main/' render={(props) => <List {...props}/>}/>
          </Switch>
          <Route path="/cart/" render={(props) => <CartPage {...props}/>}/>
      </div>
    )
  }
}

