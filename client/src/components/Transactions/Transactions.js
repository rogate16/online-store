import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Transactions.css'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Tooltip from '@material-ui/core/Tooltip';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ReactWhatsapp from 'react-whatsapp'

function Transactions() {

    const [visible, setVisible] = useState(false);
    const number = "+6281234567890" // Whatsapp Number
    let info;

    if(localStorage.getItem("info")){
        info = localStorage.getItem("info");
        info = JSON.parse(info);
    } else {
        info = [];
    }

    let sum = 0;
    let count = 0;
    let history = useHistory();

    for(var i=0;i<info.length;i++){
        sum = sum+info[i][1];
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

    const removeProduct = (product) => {
        let idx;

        if(info){
            for(var i=0;i<info.length;i++){
                if(info[i][0]===product[0]){
                    idx = i;
                    break;
                } else {
                    idx = -1;
                }
            }
            console.log(idx);
            if(idx!==-1){
                info.splice(idx, 1);
            }
            localStorage.setItem("info", JSON.stringify(info));
        }
    }

    const showRemove = () => {
        count++;
        if(count%2===1){
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    const countItems = (items) => {
        let item = [];
        let freq = [];
        let prev;
      
        items = items.sort();
        for (var i = 0; i < items.length; i++) {
          if (items[i] !== prev) {
            item.push(items[i]);
            freq.push(1);
          } else {
            freq[freq.length - 1]++;
          }
          prev = items[i];
        }
      
        return [item, freq];
    }
      

    const message = () => {
        let message = "My Orders\n";
        let items = info.map(val => val[0]);
        let itemCount = countItems(items);
        for (var i=0;i<itemCount[0].length;i++){
            message+=itemCount[1][i] + "x " + itemCount[0][i] + "\n";
        }
        message+="\nTotal Payment : " + sum;
        return message;
    }

    if(info){
        return (
            <div className="history-table">
                <div style={{ textAlign: 'center' }}>
                    <h1>Transactions</h1>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Price</th>
                            <button onClick={() => showRemove()}>Remove Item</button>
                        </tr>
                    </thead>
    
                    <tbody>
                            {info.map(value => (
                                <tr>
                                    <td>{value[0]}</td>
                                    <td>{value[1]}</td>
                                    {visible ? <Tooltip title="Remove Item" placement="right">
                                    <RemoveCircleIcon
                                        className="Remove" 
                                        onClick={() => {
                                            removeProduct(value);
                                            if(getNumItem(value)>=0){
                                                document.getElementsByClassName("ant-scroll-number ant-badge-count")[0].innerHTML = 
                                                JSON.parse(localStorage.getItem("info")).length;
                                            }
                                            history.push('/cart');
                                        }}/>
                                    </Tooltip> : <div></div>}
                                </tr>
                            ))}
                    </tbody>
                    
                    {info.length>0 ? <tfoot>
                        <tr>
                            <th>Total Price</th>
                            <th>{sum}</th>
                        </tr>
                    </tfoot> : <div></div>}

                </table>
                    
                <Tooltip title="Chat on Whatsapp" style={{outline: "none"}}>
                    <ReactWhatsapp number={number} message={message()} className="Confirm">
                    <WhatsAppIcon className="Whatsapp" />Buy<br />
                    </ReactWhatsapp>
                </Tooltip>

            </div>
            
        )
    } else {
        return(
            <div style={{ textAlign: 'center' }}>
                <h2>No Item Selected</h2>
            </div>
        )
    }
}

export default Transactions