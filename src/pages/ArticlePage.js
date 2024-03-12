import {useParams} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import {useState, useEffect} from "react";
import axios from "axios";


const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({});
    const {articleId} = useParams();
    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`).catch((err)=>console.log(err));
            const articleInfo = response?.data;
            console.log(articleInfo);
            setArticleInfo(articleInfo);
        }
        loadArticleInfo();
    }, [articleId]);
    if (!articleInfo) {
        return <NotFoundPage/>
    }
    if(Object.keys(articleInfo).length === 0){
        return <></>
    }
    return (
        <>
            <h1>{articleInfo.title}</h1>
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
            {articleInfo.content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
        </>
    )
}
export default ArticlePage;