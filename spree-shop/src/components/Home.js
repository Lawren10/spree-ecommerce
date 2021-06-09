import React, { useState, useEffect,useCallback } from 'react';
import {Link} from 'react-router-dom'
import {SpreeNav} from './spreenav'
import {useGlobalShopContext} from './context';
import {FaFacebookF,
        FaInstagram,
        FaPinterestP,
        FaChevronLeft,
        FaChevronRight,
        FaLongArrowAltDown} from "react-icons/fa"

const picList = ['/pics/tv.jpg', '/pics/jewelry.jpg','/pics/shoe.jpg','/pics/handbag.jpg'];

export const Home = () => {
const {products, shownProducts,winWidth} = useGlobalShopContext();
const [counter, setCounter] = useState(0);
let length = picList.length

const increase = useCallback(() =>{
    setCounter((counter === length-1) ? 0 : counter + 1 );
},[counter,length])

const decrease = ()=>{
    setCounter((counter === 0)? length-1 : counter - 1);
}

useEffect(()=>{
    let interval = setInterval(()=>{
    increase();
    },10000)
    return () => {clearInterval(interval)}
},[counter,increase])

 

    return (
        <>
        <SpreeNav/>
        <div id='position'>
        <section id='carousel'>
        {
            picList.map((item,index)=>{
                return (
                    <div key={index} className={(counter===index)?'img-cover active': 'img-cover'}>
                            {(counter===index) && <img src={item} alt="" />} 
                            <article id='info'>
                                <h2>Flash Sales</h2>
                                <p>Up to 60% off all products</p>
                            </article>
                        </div> 
                    );
                })
            }
        </section>
            <i id='left' onClick={decrease} ><FaChevronLeft/></i>
            <i id='right' onClick={increase}><FaChevronRight/></i>
            <div id='move-down'>
                <i><FaLongArrowAltDown/></i>
            </div>
        </div>
        
        
        {(!shownProducts)? <h1 className='homeh1'> all products</h1>: <h1 className='homeh1'>{shownProducts}</h1>}
            <section className='products' style={(winWidth <= 1050 && (shownProducts==='electronics' || shownProducts==='jewelery' || shownProducts==='men\'s clothing' || shownProducts==='women\'s clothing') )? {marginBottom:'auto'}: {}}>
                {products.map( (product) =>{
                const  {id, image, price, title,} = product;
                     return(
                         <figure key={id} className="single-product" id={(id === 14)? 'padding': '' }  style ={(winWidth <= 600 && id !== 14 )? {height:'25rem'}: {}}>
                          <img src={image} alt={title} className="single-image"/>
                          <figcaption className="product-desc">
                              <p>{title}</p>
                              <h3>{`$${price}`}</h3>
                              <Link to= {`/product-detail/${id}`} className='desc-link'> Veiw Detail</Link>
                          </figcaption>
                         </figure>
                     )
                } )}
            </section>
            <footer id='footer' >
                <section className='sec shop'>
                    <h3>SHOP</h3>
                    <ul>
                        <li>MEN'S</li>
                        <li>WOMEN'S</li>
                        <li>ELECTRONICS</li>
                        <li>JEWELERY</li>
                    </ul>
                </section>
                <section className='sec about'>
                    <h3>ABOUT</h3>
                    <ul> 
                    <li>ABOUT US</li>
                    <li>CONTACT US</li>
                    <li>LOCATION</li>
                    <li>PRIVACY POLICY</li>
                    </ul>
                </section>
                <section className='sec help'>
                    <h3>HELP</h3>
                    <ul>
                        <li>FAQ</li>
                        <li>SHIPPING</li>
                        <li>RETURNS AND EXCHANGE</li>
                        <li>SIZE GUIDES</li>
                    </ul>
                </section>
                <section className='sec social '>
                    <h3>FOLLOW US</h3>
                    <i><FaFacebookF/></i>
                    <i><FaInstagram/></i>
                    <i><FaPinterestP/></i>
                </section>
            </footer>
        </>
    )

}
