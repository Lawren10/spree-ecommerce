import  React,{ useState, useEffect, useContext } from "react";

const spreeShopContext = React.createContext();

const url = 'https://fakestoreapi.com/products';
const onecart = 'https://fakestoreapi.com/products/category/';

export const ShopContextProvider = ({children})=>{
    const [products, setProducts] = useState([]);
    const [shownProducts, setShownProducts] = useState('')
    const [updateCart, setUpdateCart] = useState([]);
    const [cart, setCart] = useState(0);
    const [showCategory, setShowCategory] = useState(false)
    let winWidth = window.innerWidth;
 
    const getProducts = async ()=>{
    const response = await fetch(url);
    const data =  await response.json();
    setProducts(data);
    };

    const handleClick = async (categorie)=>{
    
    const response = await fetch(`${onecart}${categorie}`);
    const data =  await response.json();
    setProducts(data)
}
    
    

    useEffect( ()=>{
        if( shownProducts === 'all products'){
    getProducts();
    }else{
        handleClick(shownProducts);
    }
    },[shownProducts]);

    useEffect( ()=>{
    getProducts();
    },[]);


    return(  
    < spreeShopContext.Provider  value={{
    products,
    setProducts,
    shownProducts,
    setShownProducts,
    updateCart, 
    setUpdateCart,
    cart,
      setCart,
      showCategory,
      setShowCategory,
      winWidth
    }
    }>
    
    {children}
    </spreeShopContext.Provider>
    )
}

export const useGlobalShopContext = ()=>{
    return useContext(spreeShopContext);
}
