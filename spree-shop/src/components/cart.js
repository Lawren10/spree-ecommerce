import React, {useState, useEffect}from 'react'
import {Link} from 'react-router-dom'
import {FaOpencart,FaLongArrowAltLeft,FaCcMastercard,FaCcVisa,FaFacebookF,FaInstagram,FaPinterestP} from 'react-icons/fa';
import {useGlobalShopContext} from './context'



export const Cart = () => {
    const {updateCart,setUpdateCart} = useGlobalShopContext();
    const[cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    const [visible,setVisible] = useState(false);
    

    useEffect(()=>{
        setCartItems(([...new Set(updateCart.map((item)=>{ return item}))]) )
    }, [updateCart]);
    
    useEffect(()=>{
    const total = cartItems.reduce((sum,item) =>{
        let itemTotal = item.quantity * item.price;
        sum += itemTotal
        return sum;
    },0)
    setTotal(Math.ceil(total));
    },[cartItems]);
    
    const filter = (id)=>{
        let newCart =cartItems.filter((item)=>{
            return item.id !== id;
        })
        setCartItems(newCart);
        setUpdateCart(newCart);
    }
    
if(!updateCart.length){
 return <div id="checkcart">
           <img src="\pics\shopping-basket.png" alt="" />
            <h1>YOUR SHOPPING CART IS EMPTY</h1>
            <Link to='/'><h3>Back To Shop</h3></Link>
           </div>
}

    return (
        <>
            <div id='detail-nav'>
            <Link to='/' className='homelink'><li id='logo'> <img src="/pics/spree-logo.png" alt="" /> </li></Link>
            <aside id='cartupdate'>
            <Link to='/cart'>
            <FaOpencart id='carticon'/>
            <h3>{updateCart.length}</h3>
            </Link>
            </aside>
        </div>
        
            <section className='cart-wrap' id={(visible)?'move' : ''}>
                <h1 id='carth1'>Your Shopping Cart</h1>
                {cartItems.map((item)=>{
                    const {id,image,title,quantity,price} = item;
                    return(
                        <div key={id} id='cart-item'>
                            <img src={image} alt={item.description} />
                            <h2>{title}</h2>
                            <p>{`Quantity ${quantity}`}</p>
                            <h3>{`$${price}`}</h3>
                            <button onClick={()=>{filter(id)}}>x</button>
                        </div>
                    )
                })}
            <div id='total'>
                <Link to='/' id='backlink'> <FaLongArrowAltLeft id='arrow'/> <p>Back Home</p></Link>
                <p>Subtotal : <span> $ {total}</span> </p>
            </div>

            <button className="payment" onClick={()=>{setVisible(!visible)}}>
                Make payment
            </button>    
            </section>
            
            <aside className={(visible)?'checkout showCheckOut' : 'checkout' }>
                <div className={(visible)?"cardwrapper":'off'}>
                    <h1>Card Details</h1>

            <section className='cardicon'>
                <h4>Card Types</h4>
                <i><FaCcMastercard/></i>
                <i><FaCcVisa/></i>
            </section>

                <div className='cardnum'>
                    <h4>Card Number</h4>
                    <input type="text"/>
                </div>
                
                <div className='carddate'>
                    <div className='exdate'>
                    <h4>Expiry Date</h4>
                    <input type="text"/>
                    </div>
                    <div className='cvv'>
                    <h4>CVV</h4>
                    <input type="text"/>
                    </div>
                </div>
                <button className='checkoutbutton' onClick={()=>{setVisible(!visible)}}>Checkout</button>
                </div>
            </aside>
            <footer id='footer'>
                <section className='sec'>
                    <h3>SHOP</h3>
                    <ul>
                        <li>MEN'S</li>
                        <li>WOMEN'S</li>
                        <li>ELECTRONICS</li>
                        <li>JEWELERY</li>
                    </ul>
                </section>
                <section className='sec'>
                    <h3>ABOUT</h3>
                    <ul> 
                    <li>ABOUT US</li>
                    <li>CONTACT US</li>
                    <li>LOCATION</li>
                    <li>PRIVACY POLICY</li>
                    </ul>
                </section>
                <section className='sec'>
                    <h3>HELP</h3>
                    <ul>
                        <li>FAQ</li>
                        <li>SHIPPING</li>
                        <li>RETURNS AND EXCHANGE</li>
                        <li>SIZE GUIDES</li>
                    </ul>
                </section>
                <section className='sec '>
                    <h3>FOLLOW US</h3>
                    <i><FaFacebookF/></i>
                    <i><FaInstagram/></i>
                    <i><FaPinterestP/></i>
                </section>
            </footer>
        </>
    )
}
