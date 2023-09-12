import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name={'editing-avatar'}
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      textButton='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_avatar"
        id="avatar-link-input"
        ref={avatarInput}
        type="url"
        name="avatar"
        required
        placeholder="Ссылка на картинку"
      />
      <span className="popup__span-input-error avatar-link-input-error" id="error-avatar-link-input"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;