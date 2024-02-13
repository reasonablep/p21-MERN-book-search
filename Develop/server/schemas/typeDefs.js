const typeDefs = `

input LoginInput {
    email: String!
    password: String!
}

input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!

}

type Auth {
    token: String!
    user: User
}

type Query {
    me: User
}

type Mutation {
    login (input: LoginInput): Auth
    addUser (username: String!,
        email: String!,
        password: String!): Auth
    saveBook (
        input: BookInput!): User
    removeBook (bookId: ID!): User
}

`

module.exports = typeDefs;