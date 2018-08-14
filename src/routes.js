import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import ArticlesCategories from './components/Articles/ArticlesCategories'
import ProductsCategories from './components/Products/ProductsCategories'
import Products from './components/Products/Products'
import Downloads from './components/Downloads/Downloads'
import InitialCart from './components/InitialCart/InitialCart'
import Shipping from './components/Shipping/Shipping'
import OrderOverview from './components/OrderOverview/OrderOverview'
import Confirmation from './components/Checkout/Confirmation'
import Checkout from './components/Checkout/Checkout'
import Articles from './components/Articles/Articles'
import Article from './components/Articles/Article'
import OtherProfile from './components/Profile/OtherProfile'
import About from './components/About/About'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route path='/profile/:id' component={OtherProfile} />
        <Route exact path='/articles' component={ArticlesCategories} />
        <Route path='/articles/:category' component={Articles} />
        <Route path='/article/:urlTitle' component={Article} />
        <Route exact path='/products' component={ProductsCategories} />
        <Route path='/products/:category' component={Products} />
        <Route path='/downloads' component={Downloads} />
        <Route path='/cart' component={InitialCart} />
        <Route path='/shipping' component={Shipping} />
        <Route path='/overview' component={OrderOverview} />
        <Route path='/confirmation/:orderid' component={Confirmation} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/about' component={About} />
        <Route path='/' render={() => {
                return <div>Page not found!</div>
            }} />
    </Switch>
)