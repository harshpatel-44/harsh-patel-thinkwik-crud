import React from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";

const BookCard = (props) => {
  const { title, author, year, genre, onEditBook, onDeleteBook } = props;

  return (
    <Card className="my-3 overflow-hidden h-100">
      <CardBody>
        <CardTitle tag="h5" className="two-line-text-truncate">
          {title}
        </CardTitle>
        <CardText className="mt-4 mb-1 d-flex align-items-center gap-1">
          Author:<span className="h6 m-0 p-0">{author}</span>
        </CardText>
        <CardText className="d-flex align-items-center gap-1">
          Published Year:<span className="h6 m-0 p-0">{year}</span>
        </CardText>
        <CardText className="d-flex align-items-center gap-1">
          Genre:<span className="h6 m-0 p-0">{genre}</span>
        </CardText>
      </CardBody>

      <CardBody className="d-flex align-items-end">
        <Button onClick={onEditBook} color="primary" className="ms-auto">
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button onClick={onDeleteBook} color="danger" className="ms-3">
          <i className="bi bi-trash"></i>
        </Button>
      </CardBody>
    </Card>
  );
};

export default BookCard;
