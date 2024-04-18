import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from "./redux/pages/Home.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
