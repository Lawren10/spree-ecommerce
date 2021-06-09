import React, { } from "react";
import {Link} from 'react-router-dom';
import {useGlobalShopContext} from './context';


const categories = [ "all products","electronics", "jewelery", "men's clothing", "women's clothing"]

export const SpreeNav = ()=>{
const {setShownProducts,updateCart, showCategory, setShowCategory } = useGlobalShopContext();



    return ( 
        <nav>
            <ul id='nav-ul'>
                <Link to='/' className='link ul-item'> <li id='logo'> <img src="/pics/spree-logo.png" alt="" /> </li></Link>
                <li className='ul-item category' onClick={()=>{setShowCategory(!showCategory)}} >categories
                <ul id="categoryList" className={(showCategory)? 'hover':''}>
                {
                    categories.map((categorie, index)=>{
                        return(
                            <Link to='/' key={index} className='link'>
                          <li onClick={() => { setShownProducts(categorie); setShowCategory(false)}}>
                                {categorie}
                            </li>
                            </Link>
                        )

                    })
                }
                </ul>
                
                </li>
                <Link to='/cart' className='link ul-item'><li>cart <span id={(!updateCart.length)? '':'cartnum'}>{(!updateCart.length)? '': updateCart.length }</span></li></Link>
            </ul>

            
        </nav>
    
    )}