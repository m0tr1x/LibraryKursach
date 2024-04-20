import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage} from "./redux/pages/Home.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserPage} from "./redux/pages/User.tsx";
import {AllBooksPage} from "./redux/pages/User/AllBooks.tsx";
import {MyBooksPage} from "./redux/pages/User/MyBooksPage.tsx";
import {CreateWorkerPage} from "./redux/pages/Admin/CreateWorker.tsx";
import {AllUsersPage} from "./redux/pages/Admin/AllUsers.tsx";

import {WorkerOrdersPage} from "./redux/pages/Worker/WorkerOrders.tsx";
import {WorkerEditPage} from "./redux/pages/Worker/WorkerEdit.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/user/allbooks" element={<AllBooksPage />} />
                <Route path="/user/mybooks" element={<MyBooksPage />} />
                <Route path="/admin/createworker" element={<CreateWorkerPage />} />
                <Route path="/admin/allusers" element={<AllUsersPage />} />
                <Route path="/worker/orders" element={<WorkerOrdersPage />} />
                <Route path="/worker/edit" element={<WorkerEditPage />} />
            </Routes>
        </Router>
    );
}

export default App;
