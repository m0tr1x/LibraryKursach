import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from "./redux/pages/Home.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserPage} from "./redux/pages/User.tsx";
import {AllBooksPage} from "./redux/pages/AllBooks.tsx";
import {MyBooksPage} from "./redux/pages/MyBooksPage.tsx";




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/user/allbooks" element={<AllBooksPage />} />
                <Route path="/user/mybooks" element={<MyBooksPage />} />
            </Routes>
        </Router>
    );
}

export default App;
