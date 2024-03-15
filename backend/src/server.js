import fs from 'fs';
import admin from 'firebase-admin';
import express from "express";
import {connectToDb, db} from "./db.js";

const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(async (req, res, next) => {
    const {authtoken} = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (exc) {
            res.sendStatus(403);
        }
    }
    next();
})
app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params;
    const {uid} = req.user;
    const article = await db.collection('articles').findOne({name});
    if (!article) {
        res.sendStatus(404);
    }
    const upVoteIds = article.upvoteIds || [];
    article.canUpVote = uid && !upVoteIds.includes(uid);
    res.json(article);
});
app.get('/api/articles', async (req, res) => {
    const articles = await db.collection('articles').find({}).toArray();
    console.log(articles);
    if (!articles) {
        res.sendStatus(404);
    }
    res.json(articles);
});
app.use((req, res, next) => {
    if (req?.user) {
        next();
    } else {
        res.sendStatus(401);
    }
})
app.put('/api/articles/:name/upvote', async (req, res) => {
    const {name} = req.params;
    const {uid} = req.user;
    const article = await db.collection('articles').findOne({name});
    if (!article) {
        res.sendStatus(403);
    }
    const upVoteIds = article.upvoteIds || [];
    const canUpVote = uid && !upVoteIds.includes(uid);
    if (canUpVote) {
        await db.collection('articles').updateOne({name}, {
            $inc: {upvotes: 1},
            $push: {upVoteIds: uid}
        });
    }
    const updatedArticle = await db.collection('articles').findOne({name});
    res.send(updatedArticle);
});
app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params;
    const {text} = req.body;
    const {email} = req.user;

    const article = await db.collection('articles').findOne({name});
    if (!article) {
        res.sendStatus(403);
    }
    await db.collection('articles').updateOne({name}, {
        $push: {comments: {postedBy:email, text}}
    });
    const updatedArticle = await db.collection('articles').findOne({name});
    res.send(updatedArticle);
});

const args = process.argv.slice(2);
const parseKwargs = (args) => {
    const kwargs = {}
    if (args.length % 2 !== 0) {
        throw new Error('Incorrect usage')
    }
    for (let i = 0; i < args.length; i += 2) {
        switch (args[i]) {
            case("--port"):
            case("-p"):
                kwargs["port"] = args[i + 1];
                break;
            default:
                throw new Error("Unknown argument")
        }
    }
    return kwargs;
}
connectToDb(() => {
    console.log("Successfully connected to the database");
    app.listen(8000, () => {
        const kwargs = parseKwargs(args);
        let {port} = kwargs;
        console.log(`Server is listening on port: ${port}`);
    })
})