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
    addUser ( username: $username, email: $email, password: $password ) {
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
mutation SaveBook($bookId: String!, $authors: String, $description: String!, $title: String!) {
    saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title) {
        _id
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
        authors
        description
        title
    }
}
`