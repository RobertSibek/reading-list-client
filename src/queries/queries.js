import { gql } from "@apollo/client";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const deleteBookMutation = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      name
    }
  }
`;

const getBookQuery = gql`
  query GetBookQuery($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
const getBooksQuery = gql`
  {
    books {
      name
      id
      author {
        name
      }
    }
  }
`;

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
  getBookQuery,
  deleteBookMutation,
};
