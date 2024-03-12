import {Navigate, useParams} from "react-router-dom";
import articles from "../articles";


const ArticlePage = () => {
    const {articleId} = useParams();
    const article = articles.find((article) => article.name === articleId);
    if (!article) {
        return <Navigate to="/404"/>
    }
    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
        </>
    )
}
export default ArticlePage;