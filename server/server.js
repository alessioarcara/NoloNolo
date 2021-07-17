const express = require('express');
const mongoose = require('mongoose');

// Schema & Resolvers
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

// Middleware
const isAuth = require('./middleware/is-auth')
const {graphqlHTTP} = require('express-graphql');
const cookieParser = require('cookie-parser')

const app = express();

app.use((req,
         res,
         next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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

app.use('/api', (req, res) => {
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
        context: {req, res},
    })(req, res)
});

mongoose.connect(`mongodb://argonauta.synology.me:49153/${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true })
    .then(() => {
        app.listen(3001); })
    .catch(err => {
        console.log(err) }
)
