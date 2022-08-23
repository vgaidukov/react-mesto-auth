import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../context/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmCardDelete from './ConfirmCardDelete';

function App() {
    // ПЕРЕМЕННЫЕ

    // стейт-переменные попапов
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isConfirmCardDeletePopupOpen, setConfirmCardDeletePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // стейт-переменные данных на странице
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

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
    }

    // ЗАПРОСЫ В API

    // отправка запроса в API, получение данных пользователя, запись в переменную 
    useEffect(() => {
        api
            .getInitialUserInfo()
            .then(userInfo => {
                setCurrentUser(userInfo);
            })
            .catch(err => console.log(err)); // проглядел :)
    }, [currentUser._id])

    // отправка запроса в API, получение начальных карточек, запись в переменную
    useEffect(() => {
        api
            .getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch(err => console.log(err));
    }, [currentUser._id]);

    // управление лайком в API и в карточке на странице
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteCardClick} />
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
