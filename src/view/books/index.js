import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import BookCard from "./bookCard/BookCard";
import { handleRemoveBook } from "../../redux/action/bookActions";
import { useNavigate } from "react-router";

const perPage = 6;
const sortOptions = ["--", "asc", "desc"];

const ascSorting = (arrInput) =>
  [...arrInput].sort(function (a, b) {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    return 0;
  });

const BooksList = () => {
  const { booksData } = useSelector((state) => state.books);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("--");
  const [isLoading, setLoading] = useState(false);

  const totalPages = Math.ceil(booksData.length / perPage);

  const onActionClick = useCallback(
    async (book, actionType) => {
      switch (actionType) {
        case "edit": {
          navigate("edit/" + book.id);
          break;
        }
        case "delete": {
          const deleteBookRes = await handleRemoveBook(book.id);
          break;
        }
        default: {
        }
      }
    },
    [navigate, handleRemoveBook]
  );

  const handleBooksSorting = useCallback((e) => {
    const sortType = e.target.value;
    setSortDirection(sortType);
  }, []);

  const handlePrevPage = useCallback(
    () => currentPage > 1 && setCurrentPage(currentPage - 1),
    [currentPage]
  );

  const handleNextPage = useCallback(
    () => currentPage < totalPages && setCurrentPage(currentPage + 1),
    [currentPage]
  );

  const sortOptionsRender = useCallback(() => {
    return sortOptions.map((option) => <option key={option}>{option}</option>);
  }, []);

  const renderBooks = useCallback(() => {
    if (!booksData.length) {
      return (
        <Col className="text-center text-light m-auto">
          There is no books available
        </Col>
      );
    }

    let sortBookData;

    if (sortDirection === "asc") {
      sortBookData = ascSorting(booksData);
    } else if (sortDirection === "desc") {
      sortBookData = ascSorting(booksData).reverse();
    } else {
      sortBookData = [...booksData];
    }

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const filteredData = sortBookData.slice(startIndex, endIndex);

    return (
      <>
        {filteredData?.map((book) => {
          return (
            <Col key={book.id}>
              <BookCard
                id={book.id}
                title={book.title}
                author={book.author}
                genre={book.genre}
                year={book.year}
                onEditBook={onActionClick.bind(null, book, "edit")}
                onDeleteBook={onActionClick.bind(null, book, "delete")}
              />
            </Col>
          );
        })}
      </>
    );
  }, [booksData, currentPage, sortDirection]);

  return (
    <Container>
      <Row className="bg-light rounded-2 bg-dark-subtle p-2 mb-3">
        <Col className="d-flex align-items-center gap-2">
          Sort:
          <Input
            style={{ width: "200px" }}
            type="select"
            id="sortSelect"
            name="sortSelect"
            value={sortDirection}
            onChange={handleBooksSorting}
          >
            {sortOptionsRender()}
          </Input>
        </Col>
      </Row>
      <Row xs={1} md={3} xl={4} className="same-height-grid">
        {isLoading ? (
          <Col className="text-light text-center m-auto">
            <Spinner />
          </Col>
        ) : (
          renderBooks()
        )}
      </Row>

      <Row className="bg-light rounded-2 bg-dark-subtle p-2 my-3">
        <Col className="d-flex">
          <div className="ms-auto d-flex gap-1">
            <Button
              color="primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <Button
              color="primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BooksList;
