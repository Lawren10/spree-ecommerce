import React, {useState, useEffect, useRef} from 'react'
import {Link,useParams} from 'react-router-dom'
import {FaOpencart} from 'react-icons/fa';
import {useGlobalShopContext} from './context'

const detailurl = 'https://fakestoreapi.com/products/';

export const ProductDetail = () => {
    const [loading, setLoading] = useState(true);
    const [productDetail, setProductDetail] = useState()
    const {singleId} = useParams();
    const [quantity,setQuantity] = useState(0)
    const {setUpdateCart, updateCart,winWidth} = useGlobalShopContext();
    const input = useRef('')



    useEffect(()=>{

        const getSingleProduct = async ()=>{
            setLoading(true);
        const response = await fetch(`${detailurl}${singleId}`);
        const data = await response.json();
        setProductDetail(data);
        setLoading(false);
    }
        getSingleProduct();
    },[singleId]);

    if (loading){
        return <h1>{}</h1>
    }
    const {id,title,price,description,image} = productDetail;
    const singleProduct = {id,title,price,quantity:quantity,image}
    const itemId = updateCart.map((item)=>{return item.id});



    const cartUpdate = (id)=>{

        if(quantity === 0){
            alert('please choose the quantity needed.')
        }else if(itemId.includes(id)){
            alert('ITEM ALREADY IN CART')
            input.current.value = 0
            return;
        }
        else{
            setUpdateCart([...updateCart,singleProduct]);
            alert('ITEM ADDED TO CART');
        setQuantity(0);
        input.current.value = 0;
        
        }
    
    }
    
    const num = singleProduct.id

    const handleChange = (e) =>{
        setQuantity(Number(e.target.value))
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
        
            <h1 id="detailh1">Product Detail</h1>

      <section id="detail-wrapper" style={(winWidth <= 600 && (id === 5 || id === 9 || id === 12 || id === 15 || id === 16 || id === 17)) ? { height: '75rem' }: {} }>
                <figure className="detail-fig" style={(winWidth<=600 && (id===6 || id===8))? {margin:'0 0 0 0', width:'100%'}:{}}>
                    <img src={image} alt={title} id={(num === 6 || num===8 || num===10 || num===11 || num===13 || num===14)? 'width' : ''}/>
                </figure>
                <article className='detail-art' id={(num===10 || num===11 || num===13 || num===14 || num===15 || num===16 || num===17)? 'padding' : ''} style={(winWidth<=600 && (id===6 || id===8))? {margin:'8rem 0 1rem 0'}:{}}>
                    <h1 id={(num===10 || num===11 || num===13 || num===14 || num===15 || num===16 || num===17)? 'h1' : ''}>{title}</h1>
                    <p id={(num===10 || num===11 || num===13 || num===14 || num===15 || num===16 || num===17)? 'p' : ''}>{description}</p>
                    <div id="priceq">
                    <h2>{`$${price}`}</h2>
                    <input type="number" min='0' placeholder='0' ref={input} onChange={handleChange}/>
                    <h3>QUANTITY</h3> 
                    </div>
                    <div id="button-div">
                        <button onClick={()=>{cartUpdate(id)}}>ADD TO CART</button>
                        <Link to='/' id='Link'> SHOP </Link>
                    </div>
                </article>
            </section>
        </>
    )
}

