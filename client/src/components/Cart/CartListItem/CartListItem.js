import React, {useContext, useState} from "react";

import CartContext from "../../../context/CartContext.js";

import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';

import currencyFormatter from "../../../helpers/currencyFormatter.js";

import "./CartListItem.css"


function CartListItem({cartItem}) {

    const [editMode, setEditMode] = useState(false);

    const toggleEdit = () => {
        setEditMode( s => !s);
    }
    
    const toggleSave = () => {
        updateItemNotes();
        toggleEdit();
    }

    const {cart, updateCart} = useContext(CartContext);

    const [itemNotes, setItemNotes] = useState(cartItem.itemNotes);
    
    const hasNotes = cartItem.itemNotes !== "";

    const updateNotesTextInput = (e) => setItemNotes(s => e.target.value);


    const updateItemNotes = () => {
        const {itemNotes:iNotes, ...cItem} = cartItem;
        cItem.itemNotes = itemNotes;
        
        const filteredCart = cart.filter( c => c.itemId !== cartItem.itemId);
        const newCart = [...filteredCart, cItem];
        updateCart(c => newCart);
    }

    const dispNotes = () => {
        const notesHTML = (
            <div className="Cart-List-Items-Notes row">
                <p className="col-12">{itemNotes}</p>
            </div>
        )
        const editNotesHTML = (
            <div className="Cart-List-Items-Notes row">
                <textarea 
                    type="text" 
                    value={itemNotes}
                    id="itemNotes" 
                    className="Cart-List-Items-Notes-TextArea col-12 col-md-10"
                    name="itemNotes"
                    onChange={updateNotesTextInput}/>

                <span className="Cart-Item-Notes-Save col-12 col-md-2">
                    <SaveIcon onClick={toggleSave} sx={{fontSize: 35}}/>
                </span>
                    
            </div> 
        )

        if (editMode) {
            return editNotesHTML
        } else {
            return notesHTML
        }
    }


    return (
        <div key={cartItem.itemId} className={`Cart-List-Items ${editMode ? "Edit-Mode": ""}`}>
            <div className="Cart-List-Items-Head row">
                <div className="Cart-Item-Info col-12 col-md-10">
                    <span className="Cart-Item-Info-Span row">
                        <p className="col-sm-12 col-md-4">{cartItem.quantity}</p>
                        <p className="col-sm-12 col-md-4">{cartItem.itemName}</p>
                        <p className="col-sm-12 col-md-4">{currencyFormatter(cartItem.itemTotal)}</p>
                    </span>
                </div>
                <div className="Cart-Item-Edit col-12 col-md-2">
                    <EditNoteIcon onClick={toggleEdit} sx={{fontSize: 35}}/>
                </div>
            </div>
            {
                hasNotes || editMode ? dispNotes() : <></>
            }
        </div>
        )
}

export default CartListItem;