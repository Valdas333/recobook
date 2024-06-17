import "./App.css";
import Login from "./components/form/login/Login";
import {AuthProvider} from "./components/utils/AuthContext.jsx";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import IsNotLogged from "./components/utils/IsNotLogged.jsx";
import Registration from "./components/form/registration/Registration.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";
import HomePage from "./components/form/components/HomePage.jsx";
import Unauthorized from "./components/form/Unauthorized.jsx";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<IsNotLogged><Login /></IsNotLogged>} />
                    <Route path="/register" element={<IsNotLogged><Registration /></IsNotLogged>} />
                    <Route path="/home" element={<ProtectedRoute roles={['USER']} element={<HomePage />} />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
