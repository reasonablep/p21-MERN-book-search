import { gql } from '@apollo/client';

export const LOGIN_USER = gql `

mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

export const ADD_USER = gql `
mutation AddUser ($username: String!, $email: String!, $password: String!) {
    addUser (input: { username: $username, email: $email, password: $password }) {
        token 
        user {
            _id
            username
            email
        }
    }
}
`;

export const SAVE_BOOK = gql `
mutation SaveBook($input: BookInput) {
    saveBook(input: $input) {
        bookId
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
        }
    }
}
`;

export const REMOVE_BOOK = gql `
mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        bookId
        username
        email
        savedBooks {
            bookId
            title
            description
        }
    }
}
`