const typeDefs =  `

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
    bookId: ID!
    image: String
    link: String
    title: String!

}

type Auth {
    token: String!
    username: String!
}

type Query {
    me: User
}

type Mutation {
    login (input: LoginInput): Auth
    addUser (input: AddUser): Auth
    saveBook (input: BookInput): User
    removeBook (bookId: ID!): User
}

input LoginInput {
    email: String!
    password: String!
}

input AddUser {
    email: String!
    username: String!
    password: String!
}

input BookInput {
    description: String!
    title: String!
    bookId: ID!
    image: String
    link: String
}

`

module.exports = typeDefs;