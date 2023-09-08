import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import imagePen from '../images/edit-avatar-pen.svg';

function Main({ onEditProfile, onAddCards, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
          />
          <button className="profile__avatar-edit" onClick={onEditAvatar} type="button">
            <img className="profile__avatar-pen" src={imagePen} alt="Кнопка" />
          </button>
          <div className="profile__editable-information">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button button" type="button" aria-label="Редактировать" onClick={onEditProfile} />
            </div>
            <p className="profile__activity">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button button" onClick={onAddCards} type="button" aria-label="Добавить" />
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card 
              key={card._id}
              card={card}
              likes={card.likeId}
              name={card.name}
              link={card.link}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;