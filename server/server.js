const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

// Schema & Resolvers
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

// Middleware
const isAuth = require('./middleware/is-auth')

const app = express();

app.use((req,
         res,
         next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

app.use(isAuth)

app.use(
    '/api', graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true })
)

mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true })
    .then(() => {
        app.listen(3001); })
    .catch(err => {
        console.log(err) }
)
