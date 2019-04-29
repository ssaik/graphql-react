const graphql = require('graphql');

const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLSchema,
        GraphQLList } = graphql;

//dummy data
var books = [
    {name: 'name', genre: 'asd', id: '1', authorId: '12'},
    {name: 'name2', genre: 'asd2', id: '2', authorId: '22'},
    {name: 'name2', genre: 'asd2', id: '3', authorId: '22'},
    {name: 'name2', genre: 'asd2', id: '4', authorId: '22'},
    {name: 'name2', genre: 'asd2', id: '5', authorId: '22'},
    {name: 'name2', genre: 'asd2', id: '6', authorId: '22'}
];


var authors = [
    {name: 'namea', age: 22, id: '12'},
    {name: 'namea2', age: 22, id: '22'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type:GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type:GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, aggs) {
                return _.filter(books, { authorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db/other source
                return _.find(books, { id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});