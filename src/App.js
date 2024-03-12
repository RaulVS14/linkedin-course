import './App.css';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesListPage from "./pages/ArticlesListPage";
import NotFoundPage from "./pages/NotFoundPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./NavBar";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar/>
                <div id="page-body">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/about" element={<AboutPage/>}/>
                        <Route path="/articles" element={<ArticlesListPage/>}/>
                        <Route path="/articles/:articleId" element={<ArticlePage/>}/>
                        <Route path="*" element={<NotFoundPage/>}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
