import css from "./ImageCard.module.css";

type Props = {
  smallUrl: string;
  largeUrl: string;
  onImageClick: (largeUrl: string) => void;
};

const ImageCard = ({ smallUrl, largeUrl, onImageClick }: Props) => {
  const handleClick = () => {
    onImageClick(largeUrl);
  };

  return (
    <img onClick={handleClick} className={css.image} src={smallUrl} alt="" />
  );
};

export default ImageCard;
