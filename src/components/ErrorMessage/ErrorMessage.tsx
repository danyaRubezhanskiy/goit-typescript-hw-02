import css from "./ErrorMessage.module.css";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return <p className={css.error}>{message}</p>;
};

export default ErrorMessage;
