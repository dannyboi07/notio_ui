import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AllBoardsPage from "./pages/AllBoardsPage";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AllBoardsPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
