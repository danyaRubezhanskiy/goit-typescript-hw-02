import css from "./SearchBar.module.css";
import { Formik, Form, Field, FormikHelpers } from "formik";

type FormValue = {
  query: string
}

type Props = {
  onSubmit: (values:FormValue,actionactions: FormikHelpers<FormValue>:)
}

const SearchBar = ({ onSubmit }: Props) => {
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
