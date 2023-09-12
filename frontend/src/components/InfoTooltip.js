import React from "react";
import unionCorrectImage from '../images/UnionCorrectImage.svg';
import unionErrorImage from '../images/UnionErrorImage.svg'

function InfoTooltip({isOpen, onClose, success, tooltipText}) {
  return (
    <div className={`popup popup_tooltip ${isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <img className='popup__tooltip-image' src={success ? unionCorrectImage : unionErrorImage} />
        <h2 className='popup__tooltip-text'>{tooltipText}</h2>
        <button className='popup__close-btn button' onClick={onClose} />
      </div>
    </div>
  )
}

export default InfoTooltip