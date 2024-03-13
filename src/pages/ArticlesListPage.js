import ArticlesList from "../components/ArticlesList";
import {useEffect, useState} from "react";
import axios from "axios";

const ArticlesListPage = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const loadArticles = async () => {
            const response = await axios.get(`/api/articles`).catch((err) => console.log(err));
            const articles = response?.data;
            setArticles(articles);
        }
        loadArticles();
    }, []);
    if (!articles) {
        return <></>
    }
    return (
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles}/>
        </>
    );
}
export default ArticlesListPage;