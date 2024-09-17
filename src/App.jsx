import axios from "axios";
import SearchBox from "./components/SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);

  const notify = () => toast.error("Please enter your search query");

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async (query, page) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&per_page=${12}}&page=${page}&client_id=ta_gU_VpEth5AI66-U4EWKQ4xudh-a8yAmiRRXyuWM0`
        );
        const imagesData = data.results.map((result) => ({
          smallUrl: result.urls.small, // маленькое изображение для галереи
          largeUrl: result.urls.full, // большое изображение для модального окна
        }));

        if (page === 1) {
          setImages(imagesData);
        } else {
          setImages((prevImages) => [...prevImages, ...imagesData]);
        }
        setError(null);
        setLoading(false);
      } catch (error) {
        setError("Error. Please try again.");
        setImages([]);
      }
    };
    fetchPhotos(query, page);
  }, [page, query]);

  const onSubmit = (values, actions) => {
    if (values.query.trim() === "") {
      notify();
    } else {
      console.log(images);
      setQuery(values.query);
      setPage(1);
    }
    actions.resetForm();
  };

  const loadMore = () => {
    const newPage = page + 1;
    setQuery(query);
    setPage(newPage);
  };

  const openModal = (imageUrl) => {
    setLargeImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLargeImageUrl(null);
  };

  return (
    <div>
      <SearchBox onSubmit={onSubmit}></SearchBox>
      {isLoading && <Loader></Loader>}
      <Toaster position="top-right" reverseOrder={false} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ImageGallery images={images} onImageClick={openModal}></ImageGallery>
      )}
      {query !== "" && <LoadMoreBtn onClick={loadMore}></LoadMoreBtn>}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        largeImageUrl={largeImageUrl}
      />
    </div>
  );
}

export default App;
