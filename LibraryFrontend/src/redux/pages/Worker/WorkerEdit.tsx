import { useState } from "react";
import {Button, Modal, Form, Table} from "react-bootstrap";
import {addAuthor, addBook, addGenre, getAvailableBooks} from "../../../api/api.tsx";
import {IBook} from "../../Interfaces/IBook.tsx";

export function WorkerEditPage() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedBook, setEditedBook] = useState({});
    const [editedTitle, setEditedTitle] = useState("");
    const [editedAuthorId, setEditedAuthorId] = useState(0);
    const [editedGenreId, setEditedGenreId] = useState(0);
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showAddAuthorModal, setShowAddAuthorModal] = useState(false);
    const [showAddGenreModal, setShowAddGenreModal] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [authorName, setAuthorName] = useState(""); // Добавляем состояние для имени автора
    const [genreName, setGenreName] = useState(""); // Добавляем состояние для названия жанра
    const [availableBooks, setAvailableBooks] = useState<IBook[]>([]);



    const handleShowEditModal = (book) => {
        setEditedBook(book);
        setEditedTitle(book.title);
        setEditedAuthorId(book.authorId);
        setEditedGenreId(book.genreId);
        setShowEditModal(true);
    };

    // Функция для сохранения изменений после редактирования книги
    const handleSaveChanges = async () => {
        try {
            // Вызов функции для редактирования книги
            await editBook(editedBook.id, editedTitle, editedAuthorId, editedGenreId);
            // Закрытие модального окна редактирования
            setShowEditModal(false);
            // Обновление данных после редактирования книги
            // Например, можно отправить запрос для получения обновленного списка книг и обновить состояние страницы
        } catch (error) {
            console.error("Ошибка при редактировании книги:", error);
        }
    };

    // Функция для удаления книги
    const handleDeleteBook = async (bookId : number) => {
        try {
            // Вызов функции для удаления книги
            await deleteBook(bookId);
            // Обновление данных после удаления книги
            // Например, можно отправить запрос для получения обновленного списка книг и обновить состояние страницы
        } catch (error) {
            console.error("Ошибка при удалении книги:", error);
        }
    };

    const handleAddBook = async () => {
        try {
            const response = await addBook(title, author, genre);
            console.log("Книга успешно добавлена:", response);
            // Добавьте здесь логику для обработки успешного добавления книги, например, закрытие модального окна и обновление данных
            handleCloseAddBookModal();
        } catch (error) {
            console.error("Ошибка при добавлении книги:", error);
            // Добавьте здесь логику для обработки ошибки при добавлении книги
        }
    };
    const handleAddAuthor = async () => {
        try {
            // Вызов функции для добавления автора
            const response = await addAuthor(authorName);
            console.log("Автор успешно добавлен:", response);
            handleCloseAddAuthorModal();
        } catch (error) {
            console.error("Ошибка при добавлении автора:", error);
        }
    };

    const handleAddGenre = async () => {
        try {
            // Вызов функции для добавления жанра
            const response = await addGenre(genreName);
            console.log("Жанр успешно добавлен:", response);
            handleCloseAddGenreModal();
        } catch (error) {
            console.error("Ошибка при добавлении жанра:", error);
        }
    };
    const loadAvailableBooks = async () => {
        try {
            const books =  await getAvailableBooks(); // Получаем доступные книги
            setAvailableBooks(books); // Обновляем состояние с данными о книгах
        } catch (error) {
            console.error('Ошибка при загрузке доступных книг:', error.message);
            // Обработка ошибки загрузки доступных книг
        }
    };

    const handleCloseAddBookModal = () => setShowAddBookModal(false);
    const handleShowAddBookModal = () => setShowAddBookModal(true);

    const handleCloseAddAuthorModal = () => setShowAddAuthorModal(false);
    const handleShowAddAuthorModal = () => setShowAddAuthorModal(true);

    const handleCloseAddGenreModal = () => setShowAddGenreModal(false);
    const handleShowAddGenreModal = () => setShowAddGenreModal(true);

    return (
        <>
            <div>
                <div style={{marginTop: '20px'}}>
                    <Button style={{marginLeft: '5px'}} variant="primary" onClick={handleShowAddBookModal}>Добавить
                        книгу</Button>
                    <Button style={{marginLeft: '5px'}} variant="primary" onClick={handleShowAddAuthorModal}>Добавить
                        автора</Button>
                    <Button style={{marginLeft: '5px'}} variant="primary" onClick={handleShowAddGenreModal}>Добавить
                        жанр</Button>
                </div>

                {/* Модальное окно для добавления книги */}
                <Modal show={showAddBookModal} onHide={handleCloseAddBookModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить книгу</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBookTitle">
                                <Form.Label>Название книги</Form.Label>
                                <Form.Control type="text" placeholder="Введите название книги"
                                              onChange={(e) => setTitle(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBookAuthor">
                                <Form.Label>Автор</Form.Label>
                                <Form.Control type="text" placeholder="Введите автора книги"
                                              onChange={(e) => setAuthor(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBookGenre">
                                <Form.Label>Жанр</Form.Label>
                                <Form.Control type="text" placeholder="Введите жанр книги"
                                              onChange={(e) => setGenre(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddBookModal}>Закрыть</Button>
                        <Button variant="primary" onClick={handleAddBook}>Добавить</Button>
                    </Modal.Footer>
                </Modal>

                {/* Модальное окно для добавления автора */}
                <Modal show={showAddAuthorModal} onHide={handleCloseAddAuthorModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить автора</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formAuthorName">
                                <Form.Label>Имя автора</Form.Label>
                                <Form.Control type="text" placeholder="Введите имя автора"
                                              onChange={(e) => setAuthorName(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddAuthorModal}>Закрыть</Button>
                        <Button variant="primary" onClick={handleAddAuthor}>Добавить</Button>
                    </Modal.Footer>
                </Modal>

                {/* Модальное окно для добавления жанра */}
                <Modal show={showAddGenreModal} onHide={handleCloseAddGenreModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить жанр</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGenreName">
                                <Form.Label>Название жанра</Form.Label>
                                <Form.Control type="text" placeholder="Введите название жанра"
                                              onChange={(e) => setGenreName(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddGenreModal}>Закрыть</Button>
                        <Button variant="primary" onClick={handleAddGenre}>Добавить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Жанр</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Здесь нужно заполнить таблицу данными о книгах */}
                    {/* Каждая строка таблицы будет содержать информацию о книге, кнопку "Редактировать" и "Удалить" */}
                    {availableBooks.map((book, index) => (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowEditModal(book)}>Редактировать</Button>
                                <Button variant="danger" onClick={() => handleDeleteBook(book.id)}>Удалить</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

        </>
    );
}
