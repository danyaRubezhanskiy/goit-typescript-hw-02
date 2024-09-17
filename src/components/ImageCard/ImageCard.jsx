import css from "./ImageCard.module.css";

const ImageCard = ({ smallUrl, largeUrl, onImageClick }) => {
  const handleClick = () => {
    onImageClick(largeUrl);
  };

  return (
    <img onClick={handleClick} className={css.image} src={smallUrl} alt="" />
  );
};

export default ImageCard;
