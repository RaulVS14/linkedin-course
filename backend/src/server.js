import express from "express";
import {db, connectToDb} from "./db.js";


const app = express();
app.use(express.json());
app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params;
    const article = await db.collection('articles').findOne({name});
    if (!article) {
        res.sendStatus(404);
    }
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
app.put('/api/articles/:name/upvote', async (req, res) => {
    const {name} = req.params;

    await db.collection('articles').updateOne({name}, {
        $inc: {upvotes: 1}
    });
    const article = await db.collection('articles').findOne({name});
    res.send(article);
});
app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params;
    const {postedBy, text} = req.body;
    await db.collection('articles').updateOne({name}, {
        $push: {comments: {postedBy, text}}
    });
    const article = await db.collection('articles').findOne({name});
    res.send(article);
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