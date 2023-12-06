import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1> Robert's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
