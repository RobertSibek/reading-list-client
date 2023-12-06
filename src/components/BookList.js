import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useEffect, useState } from "react";

const BookList = () => {
  const { loading, error, data, refetch } = useQuery(getBooksQuery);
  const [selectedBook, setSelectedBook] = useState(null);

  const displayBookList = () => {
    if (loading) {
      return <div>Loading books...</div>;
    } else if (error) {
      console.log(JSON.stringify(error, null, 2));
      return <p>Ops! Something went wrong</p>;
    } else {
      return data.books.map((book) => {
        return (
          <li
            className={"book-item"}
            key={book.id}
            onClick={() => {
              setSelectedBook(book.id);
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [selectedBook, refetch]);

  return (
    <div>
      <ul id={"book-list"}>{displayBookList()}</ul>
      <BookDetails bookId={selectedBook} refreshData={() => refetch()} />
    </div>
  );
};

export default BookList;
