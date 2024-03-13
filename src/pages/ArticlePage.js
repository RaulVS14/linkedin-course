import {useParams} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import {useState, useEffect} from "react";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";


const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({});
    const {articleId} = useParams();
    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`).catch((err) => console.log(err));
            const articleInfo = response?.data;
            setArticleInfo(articleInfo);
        }
        loadArticleInfo();
    }, [articleId]);
    const addUpVote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updateArticle = response.data;

        setArticleInfo(updateArticle);
    }
    const onArticleUpdated = (articleInfo)=>{
        setArticleInfo(articleInfo);
    }
    if (!articleInfo) {
        return <NotFoundPage/>
    }
    if (Object.keys(articleInfo).length === 0) {
        return <></>
    }
    return (
        <>
            <h1>{articleInfo.title}</h1>
            <div className="upvote-section">
                <button onClick={addUpVote}>Upvote</button>
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {articleInfo.content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
            <AddCommentForm articleId={articleId} onArticleUpdated={onArticleUpdated}/>
            <CommentsList comments={articleInfo.comments.slice().reverse()}/>
        </>
    );
}
export default ArticlePage;