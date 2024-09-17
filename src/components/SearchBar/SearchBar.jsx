import css from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";

const SearchBar = ({ onSubmit }) => {
  return (
    <header>
      <Formik
        initialValues={{
          query: "",
        }}
        onSubmit={onSubmit}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            placeholder="Search images and photos"
            name="query"
            id="query"
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
