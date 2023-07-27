import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import AllBoardsPage from "./pages/AllBoardsPage";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/boards">
                    <Route path=":boardId" element={<BoardPage />} />
                    <Route path="" element={<AllBoardsPage />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />

                <Route path="*" element={<Navigate to="boards" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
