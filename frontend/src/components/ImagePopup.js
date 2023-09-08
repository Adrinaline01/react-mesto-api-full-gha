import React from "react"; 
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({card, onClose}) { 
  usePopupClose(card?.link, onClose)

  return ( 
    <div className={`popup popup_view-picture ${card ? 'popup_opened' : ''} `}> 
      <div className="popup__container-view-picture"> 
        <figure className="popup__place-view-picture"> 
          <button className="popup__close-btn button popup__close-btn_view-picture" type="button" onClick={onClose}></button> 
          <img className="popup__picture" src={card?.link} alt={card?.name} /> 
          <figcaption className="popup__signature">{card?.name}</figcaption> 
        </figure> 
      </div> 
    </div> 
  ) 
} 


export default ImagePopup;