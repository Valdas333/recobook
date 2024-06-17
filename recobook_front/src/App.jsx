import "./App.css";
import Login from "./components/form/login/Login";
import {AuthProvider} from "./components/utils/AuthContext.jsx";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import IsNotLogged from "./components/utils/IsNotLogged.jsx";
import Unauthorized from "./components/form/Unauthorized.jsx";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<IsNotLogged />}>
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
                </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
