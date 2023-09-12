import React, { useState, useEffect } from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup.js';
import AddCardsPopup from './AddCardsPopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Register from './Register';
import Login from './Login';
import api from '../utils/Api';
import * as auth from '../utils/auth.js'
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (email, password) => {
    auth
      .signUp(email, password)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      });
  };
  

  const handleLogin = (email, password) => {
    auth
      .signIn(email, password)
      .then((data) => {
        if (data.token) localStorage.setItem("token", data.token);
        setUserEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setSuccess(false);
        setInfoTooltipPopupOpen(true);
        console.log(err);
      })
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          handleLoginTrueStatus();
          setUserEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          navigate("/signin");
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  function onSignOut() {
    localStorage.removeItem("token");
    navigate("/signin");
  }


  function handleLoginTrueStatus() {
    setLoggedIn(true);
  }

  useEffect(() => {
    api
      .initCardsFromServer()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(`Ошибка ${err}`))
  }, [])

  useEffect(() => {
    api
      .initialUsers()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(`Ошибка ${err}`))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.likeCards(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => console.log(`Ошибка ${err}`))
    } else {
      api.dislikeCards(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => console.log(`Ошибка ${err}`))
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCardFromServer(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleUpdateUser(name, about) {
    api
      .loadingUserInfoOnServer(name, about)
      .then((inf) => {
        setCurrentUser(inf)
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleUpdateAvatar(avatar) {
    api
      .loadigNewAvatarOnServer(avatar)
      .then((ava) => {
        setCurrentUser(ava)
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .loadingNewCardOnServer(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false)
    setSelectedCard(null);
  }

  return (
    
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        onSignOut={onSignOut}
        userEmail={userEmail}
      />
      <Routes>
        <Route path='/signin' element={<Login onLogin={handleLogin} />} />
        <Route path='/signup' element={<Register onRegister={handleRegister} />} />
        <Route path='/' element={
          <ProtectedRouteElement 
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddCards={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          element={Main}
          loggedIn={loggedIn}
          />
        } /> 
        <Route
              path="*"
              element={<Navigate to={loggedIn ? "/" : "/signin"} />}
            />
      </Routes>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddCardsPopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlaceSubmit}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip 
        isOpen={infoTooltipPopupOpen}
        onClose={closeAllPopups}
        success={success}
        tooltipText={success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      />
    </CurrentUserContext.Provider>

  );
}

export default App;
