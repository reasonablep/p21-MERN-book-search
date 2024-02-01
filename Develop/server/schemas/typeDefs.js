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
    getUser(id: ID, username: String): User
}

type Mutation {
    login (input: LoginInput): Auth
}

input CreateUserInput {
    username: String!
    email: String!
    password: String!

}

input LoginInput {
    usernameOrEmail: String!
    password: String!
}

input BookInput {
    bookId: ID!
    title: String!
    author: String!
}

`

module.exports = typeDefs;