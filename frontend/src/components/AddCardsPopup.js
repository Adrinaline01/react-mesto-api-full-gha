import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddCardsPopup({ isOpen, onClose, onAddCard }) {

  const [nameCard, setNameCard] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleAddCardName(e) {
    setNameCard(e.target.value);
  }

  function handleAddCardLink(e) {
    setLink(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: nameCard,
      link,
    });
  }

  React.useEffect(() => {
    setNameCard('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'cards-add'}
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      textButton='Создать'
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_appellation"
        id="appellation-input"
        onChange={handleAddCardName}
        value={nameCard}
        type="text"
        name="name"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
      />
      <span className="popup__span-input-error appellation-input-error" id="error-appellation-input"></span>
      <input
        className="popup__input popup__input_content_link"
        id="link-input"
        onChange={handleAddCardLink}
        value={link}
        type="url"
        name="link"
        required
        placeholder="Ссылка на картинку"
      />
      <span className="popup__span-input-error link-input-error" id="error-link-input"></span>
    </PopupWithForm>
  )
}

export default AddCardsPopup;