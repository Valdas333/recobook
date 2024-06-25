import "./App.css";
import Login from "./components/form/login/Login";
import {AuthProvider} from "./components/utils/AuthContext.jsx";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import IsNotLogged from "./components/utils/IsNotLogged.jsx";
import Registration from "./components/form/registration/Registration.jsx";
import HomePage from "./components/HomePage.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import BookPage from "./components/pages/BookPage.jsx";
import CategoryPage from "./components/pages/CategoryPage.jsx";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<IsNotLogged/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>
                    </Route>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/add/book" element={<BookPage/>}/>
                    <Route path="/category/add" element={<CategoryPage/>}/>
                    <Route path="/unauthorized" element={<Unauthorized/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
