import { useMutation, useQuery } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";
import { useEffect, useRef, useState } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "graphql/graphql";
import mongoose from "mongoose";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { mData, mLoading, mError }] = useMutation(addBookMutation);

  const [book, setBook] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const bookName = useRef();
  const bookGenre = useRef();
  const bookAuthorId = useRef();

  const displayAuthors = () => {
    // console.log(data);
    if (loading) {
      return <option>Loading Authors...</option>;
    } else if (error) {
      return <option>Error retrieving Authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const handleNameChange = (e) => {
    // const updatedBook = { name: e.target.value };
    setBook((book) => ({
      name: e.target.value,
      genre: book.genre,
      authorId: book.authorId,
    }));
  };

  const handleGenreChange = (e) => {
    setBook((book) => ({
      name: book.name,
      genre: e.target.value,
      authorId: book.authorId,
    }));
  };

  const handleAuthorChange = (e) => {
    // const updatedBook = { name: e.target.value };
    setBook((book) => ({
      name: book.name,
      genre: book.genre,
      authorId: e.target.value,
    }));
  };

  const checkValidity = () => {
    if (
      String(book.name).replaceAll(" ", "") &&
      String(book.genre).replaceAll(" ", "") &&
      mongoose.Types.ObjectId.isValid(book.authorId)
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    })
      .then((r) => {
        setBook({});
        bookName.current.value = "";
        bookGenre.current.value = "";
        bookAuthorId.current.value = "default";
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)));
  };

  useEffect(() => {
    checkValidity();
  }, [book]);

  return (
    <form id="add-book" onSubmit={(e) => submitForm(e)}>
      <div className="field">
        <label>Book name:</label>
        <input
          ref={bookName}
          type="text"
          onInput={(e) => handleNameChange(e)}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          ref={bookGenre}
          type="text"
          onInput={(e) => handleGenreChange(e)}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select ref={bookAuthorId} onInput={(e) => handleAuthorChange(e)}>
          <option value={"default"}>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button id={"submit-button"} disabled={!formIsValid} type={"submit"}>
        +
      </button>
    </form>
  );
};

// export default AddBook;

export default AddBook;
