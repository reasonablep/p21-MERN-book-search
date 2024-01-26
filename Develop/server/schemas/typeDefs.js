const { gql } = require('@apollo/server');

const typeDefs = gql `

type User {
    _id: ID!
    username: String
    email: String!
    savedBooks: [Book]!
}

type Book {
    bookId: ID!
    title: String!
    author: String!

}

type AuthPayload {
    token: String!
    user: User!
}


type Query {
    getUser(id: ID, username: String): User
}

type Mutation {
    createUser(input: CreateUserInput): AuthPayload
    login(input: LoginInput): AuthPayload
    saveBook(book: BookInput): User
}

`

module.exports = typeDefs;