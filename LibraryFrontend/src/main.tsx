import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import Store from "./redux/Store.tsx";




ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={Store}>
        <App/>
    </Provider>
);
