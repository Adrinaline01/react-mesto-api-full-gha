import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={'editing'}
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      textButton='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_name"
        id="name-input"
        onChange={handleChangeName}
        value={name || ''}
        type="text"
        name="name"
        placeholder="Введите имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__span-input-error name-input-error" id="error-name-input"></span>
      <input
        className="popup__input popup__input_content_activity"
        id="activity-input"
        onChange={handleChangeDescription}
        value={description || ''}
        type="text"
        name="about"
        placeholder="Введите род деятельности"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__span-input-error activity-input-error" id="error-activity-input"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;