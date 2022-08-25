import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import * as mestoAuth from '../utils/mestoAuth'

import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmCardDelete from './ConfirmCardDelete';

import registerSucc from '../images/register-success.png';
import registerFail from '../images/register-fail.png';

function App() {
    // ПЕРЕМЕННЫЕ

    // стейт-переменные попапов
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isConfirmCardDeletePopupOpen, setConfirmCardDeletePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

    const [infoTooltipData, setInfoTooltipData] = useState({})
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    // стейт-переменные данных на странице
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const history = useHistory();

    const messageSuccess = {
        img: registerSucc,
        title: 'Вы успешно зарегистрировались!'
    }
    const messageFail = {
        img: registerFail,
        title: 'Что-то пошло не так! Попробуйте еще раз.'
    }

    // УПРАВЛЕНИЕ КЛИКОМ НА КНОПКИ/КАРТОЧКУ

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }
    function handleAddCardClick() {
        setAddPlacePopupOpen(true);
    }
    function handleDeleteCardClick(card) {
        setCardToDelete(card);
        setConfirmCardDeletePopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card)
    }
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setConfirmCardDeletePopupOpen(false);
        setSelectedCard(null);
        setCardToDelete(null);
        setInfoTooltipOpen(false);
    }

    // ЗАПРОСЫ В API

    // получение данных пользователя и карточек
    function getInitialData() {
        Promise.all([
            api.getInitialUserInfo(),
            api.getInitialCards()
        ])
            .then((data) => {
                setCurrentUser(data[0]);
                setCards(data[1]);
            })
            .catch(err => console.log(err));
    }

    // управление лайком в API и в карточке на странице
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(err));
    }

    // Удаление карточки в API и обновление списка карточек на странице 
    function handleConfirmDelete(card) {
        setIsLoading(true);
        api
            .deleteCard(card._id)
            .then(() => {
                setIsLoading(false);
                setCards((cards) => cards.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    // выгрузка новых данных пользователя в API и обновление информации на странице
    function handleUpdateUser(newUserInfo) {
        setIsLoading(true);
        api
            .patchUserInfo(newUserInfo)
            .then(updatedUserInfo => {
                setIsLoading(false);
                setCurrentUser(updatedUserInfo);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    // выгрузка нового аватара в API и обновление аватара на странице
    function handleUpdateAvatar(newAvatarLink) {
        setIsLoading(true);
        api
            .patchNewAvatar(newAvatarLink)
            .then((updatedAvatar) => {
                setIsLoading(false);
                setCurrentUser(updatedAvatar);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    // выгрузка новой карточки  в API и обновление карточек на странице
    function handleAddCard(newCardData) {
        setIsLoading(true);
        api
            .postNewCard(newCardData)
            .then((newCard) => {
                setIsLoading(false);
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    // АВТОРИЗАЦИЯ

    const onRegister = ({ password, email }) => {
        setIsLoading(true);
        return mestoAuth
            .register(password, email)
            .then((res) => {
                setIsLoading(false);
                setInfoTooltipOpen(true)
                if (res.data) {
                    setInfoTooltipData(messageSuccess)
                } else {
                    setInfoTooltipData(messageFail);
                    throw new Error(res.message);
                }
            })
            .catch((err) => {
                console.log(err)
            })

    };

    const onLogin = ({ password, email }) => {
        setIsLoading(true);
        return mestoAuth
            .authorize(password, email)
            .then((res) => {
                setIsLoading(false);
                if (!res) throw new Error('Неправильные имя пользователя или пароль');
                if (res.token) {
                    setLoggedIn(true);
                }
            })
            .catch((err) => { console.log(err) })
    };

    const onSignOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/login');
    };

    const auth = (token) => {
        return mestoAuth.validate(token)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setUserEmail(res.data.email);
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            auth(token);
        }
    }, [loggedIn]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    email={userEmail}
                    onSignOut={onSignOut}
                />
                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onMount={getInitialData}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddCardClick}
                        onEditAvatar={handleEditAvatarClick}
                        cards={cards}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCardClick}
                    />
                    <Route exact path="/login">
                        <Login
                            onLogin={onLogin}
                            isLoading={isLoading}
                        />
                    </Route>
                    <Route exact path="/register">
                        <Register
                            onRegister={onRegister}
                            isLoading={isLoading}
                            isOpen={isInfoTooltipOpen}
                            onClose={closeAllPopups}
                            infoTooltipData={infoTooltipData}
                            messageSuccess={messageSuccess}
                        />
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
                    </Route>
                </Switch>

                <Footer />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading} />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading} />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddCard}
                    isLoading={isLoading} />
                <ConfirmCardDelete
                    card={cardToDelete}
                    isOpen={isConfirmCardDeletePopupOpen}
                    onClose={closeAllPopups}
                    onConfirmDelete={handleConfirmDelete}
                    isLoading={isLoading} />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
