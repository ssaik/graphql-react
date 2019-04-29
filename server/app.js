// import express from 'express';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema =require('./schema/schema')

const app = express();

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true      //Disable this in Production
}));

app.listen(4000, () => {
    console.log('Now listening 4000');
});

