import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from "./redux/pages/Home.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserPage} from "./redux/pages/User.tsx";
import {AllBooksPage} from "./redux/pages/AllBooks.tsx";
import {MyBooksPage} from "./redux/pages/MyBooksPage.tsx";
import {CreateWorkerPage} from "./redux/pages/CreateWorker.tsx";




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/user/allbooks" element={<AllBooksPage />} />
                <Route path="/user/mybooks" element={<MyBooksPage />} />
                <Route path="/admin/createworker" element={<CreateWorkerPage />} />
                <Route path="/admin/deleteuser" element={<CreateWorkerPage />} />
                <Route path="/admin/allusers" element={<CreateWorkerPage />} />
            </Routes>
        </Router>
    );
}

export default App;
