const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Schema & Resolvers
const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')

// Middleware
const isAuth = require('./middleware/is-auth')
const {graphqlHTTP} = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const cookieParser = require('cookie-parser')

const app = express();

// app.use((req,
//          res,
//          next) => {
//     res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
//     res.header("Access-Control-Allow-Credentials", true);
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// })
app.use(cookieParser())
app.use(isAuth)

app.use(express.static(path.join(__dirname, 'build')));
app.use('/public', express.static(__dirname + "/public"));

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

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
    .then(() => {
        app.listen(process.env.PORT || 3010); })
    .catch(err => {
        console.log(err) }
    )
