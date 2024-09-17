import css from "./LoadMoreBtn.module.css";

type Props = {
  onClick: () => void;
};

const LoadMoreBtn = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className={css.loadBtn}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
