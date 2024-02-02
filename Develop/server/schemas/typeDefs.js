const typeDefs =  `

type User {
    _id: ID!
    username: String
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    googleBooksId: ID!
    authors: [String!]
    description: String!
    title: String!
    image: String
    link: String

}

type Auth {
    token: String!
    user: User!
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
    bookId: ID!w
    image: String
    link: String
}

`

module.exports = typeDefs;