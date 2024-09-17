import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  largeImageUrl: string;
};

const ImageModal = ({ isOpen, onRequestClose, largeImageUrl }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img src={largeImageUrl} alt="" className={css.largeImage} />
    </Modal>
  );
};

export default ImageModal;
