import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Col, Input, Row, Spinner } from "reactstrap";
import { handleRemoveBook } from "../../redux/action/bookActions";
import BookCard from "./bookCard/BookCard";
import { showConfirmation } from "../../utils";

const perPage = 6;
const sortOptions = ["--", "asc", "desc"];

const ascSorting = (arrInput) =>
  [...arrInput].sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    return 0;
  });

const BooksList = () => {
  const { booksData } = useSelector((state) => state.books);
  const totalPages = Math.ceil(booksData.length / perPage);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("--");
  const [isLoading, setLoading] = useState(false);

  const onActionClick = useCallback(
    async (book, actionType) => {
      // Diffrent action will be taken by diffrent action types binded to onActionClick function
      switch (actionType) {
        case "edit": {
          showConfirmation({
            text: "You want to edit " + book.title,
          }).then(async (e) => {
            if (e.isConfirmed) {
              navigate("edit/" + book.id);
            }
          });
          break;
        }

        case "delete": {
          showConfirmation({
            text: "You want to delete " + book.title,
          }).then(async (e) => {
            if (e.isConfirmed) {
              const deleteBookRes = await handleRemoveBook(book.id);
            }
          });
          break;
        }

        default: {
          break;
        }
      }
    },
    [navigate, handleRemoveBook]
  );

  const handleBooksSorting = useCallback((e) => {
    const sortType = e.target.value;
    setSortDirection(sortType);
  }, []); // Handle Sorting on book list and will change sort direction

  const handlePrevPage = useCallback(
    () => currentPage > 1 && setCurrentPage(currentPage - 1),
    [currentPage]
  ); // Handle Previous page button click for pagination

  const handleNextPage = useCallback(
    () => currentPage < totalPages && setCurrentPage(currentPage + 1),
    [currentPage]
  ); // Handle Next page button click for pagination

  const sortOptionsRender = useCallback(() => {
    return sortOptions.map((option) => <option key={option}>{option}</option>);
  }, []); // Render options of available sort methods

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
    // Handle Sorting data whenever user change sort method

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const filteredData = sortBookData.slice(startIndex, endIndex);
    // Handle Per Page Pagination data show data whenever user change page

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
    <>
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
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BooksList;
