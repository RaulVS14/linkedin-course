import articles from "../articles";
import {Link} from "react-router-dom";

const ArticlesListPage = () => {
    return (
        <>
            <h1>Articles</h1>
            {articles.map((article) => {
                return <div className="article-list-item" key={article.name}>
                    <h3>{article.title}</h3>

                    <p>{article.content.length > 1 ? `${article.content[0].substring(0, 150)} ... ` : ''}
                        <Link to={`/articles/${article.name}`}>Read more</Link></p>
                </div>
            })}
        </>
    )
}
export default ArticlesListPage;