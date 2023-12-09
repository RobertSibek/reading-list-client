import { useMutation, useQuery } from "@apollo/client";
import { deleteBookMutation, getBookQuery } from "../queries/queries";
import { useEffect, useRef, useState } from "react";

const BookDetails = ({ bookId, refreshData }) => {
  const { loading, error, data, refetch } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });
  const [deleteBook, { mData, mLoading, mError }] = useMutation(
    deleteBookMutation,
    {
      variables: { id: bookId },
    },
  );
  const [selectedBook, setSelectedBook] = useState(bookId);

  const deleteBookHandler = (selectedBook) => {
    deleteBook(selectedBook);
    setSelectedBook(null);
    refreshData();
  };

  useEffect(() => {
    setSelectedBook(bookId);
  }, [bookId]);

  const displayBookDetail = (bookId) => {
    if (loading) {
      return <div>Loading book detail...</div>;
    } else if (!data) {
      return <div>Select book to view details</div>;
    } else if (error) {
      console.log(JSON.stringify(error, null, 2));
      return <p>Ops! Something went wrong</p>;
    } else if (data) {
      const { book } = data;
      if (!book) {
        return;
      }

      return (
        <div>
          {selectedBook ? (
            <>
              <h2>{book.name}</h2>
              <p>{book.genre}</p>
              <p>{book.author.name}</p>
              <p>All books by this author:</p>
              <ul className={"other-books"}>
                {book.author.books.map((b) => {
                  return <li key={b.id}>{b.name}</li>;
                })}
              </ul>
              <button
                id={"delete-book-button"}
                onClick={() => deleteBookHandler()}
              >
                -
              </button>
            </>
          ) : (
            <div>Select a book to view details</div>
          )}
        </div>
      );
    }
  };

  return <div id="book-details">{displayBookDetail()}</div>;
};

export default BookDetails;
