import { ErrorMessage, Field, Formik, useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import { handleUserLogin } from "../../../redux/action/auth";
import {
  handleAddBook,
  handleUpdateBookData,
} from "../../../redux/action/bookActions";
import Swal from "sweetalert2";

const genreList = [
  "Select a Genre",
  "Action",
  "Comedy",
  "History",
  "Short Story",
  "Poetry",
  "Romance",
  "Fairy Tale",
];

const AddEditBook = () => {
  const { booksData } = useSelector((state) => state.books);

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [resErr, setResErr] = useState("");

  const BookFormSchema = yup.object().shape({
    title: yup.string().trim().required().label("Title"),
    author: yup.string().trim().required().label("Author"),
    publishedYear: yup
      .number()
      .typeError("Invalid year")
      .integer("Year must be an integer")
      .min(1000, "Year must be greater than or equal to 1000")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required()
      .label("Published Year"),
    genre: yup
      .string()
      .required()
      .test("", "Genre is required field", (value) => value !== genreList[0])
      .label("Genre"),
  });

  const onFormSubmit = async (values) => {
    console.log(values);
    const { title, author, publishedYear, genre } = values;
    try {
      setLoading(true);
      setResErr("");
      const apiData = {
        id: isEdit ? booksData.id : uuidv4(),
        title,
        author,
        year: publishedYear,
        genre,
      };

      const addEditBookRes = isEdit
        ? await handleUpdateBookData(apiData)
        : await handleAddBook(apiData);

      return Swal.fire({
        title: isEdit
          ? "Book Updated Successfully!"
          : "Book Added Successfully",
        icon: "success",
      }).then(() => {
        navigate("/");
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit, errors, touched, handleChange } = useFormik({
    initialValues: {
      title: "",
      author: "",
      publishedYear: null,
      genre: "",
    },
    validationSchema: BookFormSchema,
    onSubmit: onFormSubmit,
  });

  const renderGenreList = useCallback(
    () =>
      genreList.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      )),
    []
  );

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Add Book</h3>
          {resErr && (
            <div className="alert alert-danger" role="alert">
              {resErr}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="title"
                name="title"
                id="title"
                placeholder="Enter your title"
                onChange={handleChange}
                invalid={touched.title && !!errors.title}
              />

              {errors?.title && <FormFeedback> {errors?.title}</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                type="author"
                name="author"
                id="author"
                placeholder="Enter your author"
                onChange={handleChange}
                invalid={touched.author && !!errors.author}
              />
              {errors?.author && <FormFeedback> {errors?.author}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="publishedYear">Published Year</Label>
              <Input
                type="number"
                id="publishedYear"
                name="publishedYear"
                onChange={handleChange}
                placeholder="Enter Published Year"
                invalid={touched.publishedYear && !!errors.publishedYear}
              />
              {errors?.publishedYear && (
                <FormFeedback> {errors?.publishedYear}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="genre">Genre</Label>
              <Input
                type="select"
                id="genre"
                name="genre"
                onChange={handleChange}
                placeholder="Select Genre"
                invalid={touched.genre && !!errors.genre}
              >
                {renderGenreList()}
              </Input>
              {errors?.genre && <FormFeedback> {errors?.genre}</FormFeedback>}
            </FormGroup>

            <div className="d-grid">
              <Button type="submit" color="primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size={"sm"} /> ...Loading
                  </>
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddEditBook;
