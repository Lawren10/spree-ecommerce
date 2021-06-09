import React from "react";
import {BrowserRouter as Router, Switch,Route,} from 'react-router-dom'
import "../styles/main.css"
import '../styles/media.css'
import { Home } from './Home'
import {ProductDetail} from './product-detail'
import {Cart} from './cart'




export const SpreeShop = ()=>{
return ( <>
     <Router>
          <Switch>
               <Route path='/' exact>
               <Home/>
               </Route>

               <Route path = '/product-detail/:singleId'>
               <ProductDetail/>
               </Route>
               
               <Route path = '/cart'>
               <Cart/>
               </Route>
          </Switch>
     </Router>
     
     
     </>
)}