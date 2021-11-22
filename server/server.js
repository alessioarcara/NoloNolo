const express = require('express');
const mongoose = require('mongoose');

// Schema & Resolvers
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

// Middleware
const isAuth = require('./middleware/is-auth')
const {graphqlHTTP} = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const cookieParser = require('cookie-parser')

const app = express();

app.use('/public', express.static(__dirname + "/public"));
app.use((req,
         res,
         next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header("Access-Control-Allow-Credentials", true);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})
app.use(cookieParser())
app.use(isAuth)
app.use('/api',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    (req, res) => {
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
        context: {req, res},
    })(req, res)
});

mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true })
    .then(() => {
        app.listen(process.env.PORT); })
    .catch(err => {
        console.log(err) }
)
