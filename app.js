const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlschema = require('./graphql/schema/index');
const graphQlresolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth')
const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlschema,
    rootValue:graphQlresolvers ,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://@cluster0-upr67.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("mongo connected!")
        app.listen(3000);
    })
    .catch(err => console.log(err));
