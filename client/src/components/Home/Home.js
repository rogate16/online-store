import React, { useEffect, useState} from 'react';
import Axios from 'axios';
import { Card } from 'antd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import './Home.css';

function Home() {

    const [products, setProducts] = useState([]);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000000);
    const [cartInfo, setCartInfo] = useState([]);

    //   For mobile production
    // const ip = '';
    // const port = '';
    // useEffect(() => {
    //     Axios.get("http://ip:port/users/").then((response) => {
    //         setProducts(response.data);
    //     })
        
    // }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/users/").then((response) => {
            setProducts(response.data);
        })
        
    }, [])

    const addProduct = (product) => {
        if(!localStorage.getItem("info")){
            let info = cartInfo;
            info.push([product.title, product.price]);
            setCartInfo(info);
            localStorage.setItem("info", JSON.stringify(cartInfo));
        } else {
            let cart = localStorage.getItem("info");
            cart = JSON.parse(cart);
            cart.push([product.title, product.price]);
            localStorage.setItem("info", JSON.stringify(cart));
        }
    }

    const removeProduct = (product) => {
        if(localStorage.getItem("info") && localStorage.getItem("info").length>2){
            let cart = localStorage.getItem("info");
            let idx = 0;
            cart = JSON.parse(cart);
            for(var i=0;i<cart.length;i++){
                if(cart[i][0]===product.title){
                    idx = i;
                    break;
                } else {
                    idx = -1;
                }
            }
            console.log(idx);
            if(idx!==-1){
                cart.splice(idx, 1);
            }
            localStorage.setItem("info", JSON.stringify(cart));
        }
    }

    const getNumItem = (product) => {
        if(localStorage.getItem("info") && localStorage.getItem("info").length>2){
            let cart = localStorage.getItem("info");
            cart = JSON.parse(cart);
            return cart.filter(item => item[0]===product.title).length
        } else {
            return 0;
        }
    }

    const filteredProducts = () => {
        let fProduct = products;
        fProduct = fProduct.filter((value) => value.price>=priceMin && value.price<=priceMax);
        return fProduct;
    }

    return (
        <div className="Main">
            <div className="Title">
                <h1> Welcome </h1>
            </div>

            <div className="Prices">
                <div className="Min-Price">
                    <label htmlFor="price_min">Minimum Price</label>
                    <input 
                    id="price_min" type="number" min="0" step="10000" 
                    defaultValue={priceMin}
                    onChange={(event) => {setPriceMin(event.target.value)}} />
                </div>
                <div className="Max-Price">
                    <label htmlFor="price_max" id="price_max">Maximum Price</label>
                    <input 
                        id="price_max" type="number" min="0" step="10000"
                        defaultValue={priceMax}
                        onChange={(event) => {setPriceMax(event.target.value);}} />
                </div>
            </div>
            <div className="Products">
                {filteredProducts().map((product, index) => {
                    return (
                        <div className="Product">
                            <Card className="Card">
                                <img src={"http://localhost:3001/" + product.image + ".jpg"} alt={"Image " + index.toString()} />
                                <hr /> <br />
                                <p><b>{product.title}</b></p>
                                <p>{product.description}</p>
                                <p className="Price">Rp. {product.price}</p>
                            </Card>
                            <div className="Buy">
                            <AddCircleIcon 
                                className="Icon"
                                onClick={() => {
                                    addProduct(product);
                                    document.getElementsByClassName("Count")[index].innerHTML = getNumItem(product);
                                    document.getElementsByClassName("ant-scroll-number ant-badge-count")[0].innerHTML = 
                                    JSON.parse(localStorage.getItem("info")).length;
                                }}
                                />
                            <RemoveCircleIcon 
                                className="Icon"
                                onClick={() => {
                                    removeProduct(product);
                                    document.getElementsByClassName("Count")[index].innerHTML = getNumItem(product);
                                    if(getNumItem(product)>=0){
                                        document.getElementsByClassName("ant-scroll-number ant-badge-count")[0].innerHTML = 
                                        JSON.parse(localStorage.getItem("info")).length;
                                    }
                                }}
                                />
                            <span className="Count">{getNumItem(product)}</span>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
        </div>
    )
}

export default Home
