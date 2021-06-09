import React from 'react'
import ReactDom from 'react-dom'
import { SpreeShop } from "./components/spreeshop";
import { ShopContextProvider} from "./components/context"

const App = () => {
    return  <>
    <ShopContextProvider>
        <SpreeShop/> 
    </ShopContextProvider>
        
    </>
}

ReactDom.render( <App/>, document.getElementById('root'));