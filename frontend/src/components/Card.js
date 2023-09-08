import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, name, link, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id)

  const cardLikeButtonClassName = ( 
    `cards__like-button button ${isLiked && 'cards__like-button_active'}` 
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="cards__item">
      {isOwn && <button className="cards__removal button" type="button" aria-label="Удалить карточку" onClick={handleDeleteClick} />}
      <img className="cards__photo" src={link} onClick={handleCardClick} alt={name} />
      <div className="cards__depiction">
        <h2 className="cards__title">{name}</h2>
        <div className="cards__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick} ></button>
          <p id="number" className="cards__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;