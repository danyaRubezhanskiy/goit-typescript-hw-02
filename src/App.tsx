import axios from "axios";
import SearchBox from "./components/SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { FormikHelpers } from "formik";

function App() {
  type Image = {
    smallUrl: string;
    largeUrl: string;
  };

  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [largeImageUrl, setLargeImageUrl] = useState<string | null>(null);

  const notify = () => toast.error("Please enter your search query");

  interface ApiResponse {
    results: {
      urls: {
        small: string;
        full: string;
      };
    }[];
  }

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async (query: string, page: number): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await axios.get<ApiResponse>(
          `https://api.unsplash.com/search/photos?query=${query}&per_page=${12}&page=${page}&client_id=ta_gU_VpEth5AI66-U4EWKQ4xudh-a8yAmiRRXyuWM0`
        );
        const imagesData: Image[] = data.results.map((result) => ({
          smallUrl: result.urls.small,
          largeUrl: result.urls.full,
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

  type FormValue = {
    query: string;
  };

  const onSubmit = (
    values: FormValue,
    actions: FormikHelpers<FormValue>
  ): void => {
    if (values.query.trim() === "") {
      notify();
    } else {
      console.log(images);
      setQuery(values.query);
      setPage(1);
    }
    actions.resetForm();
  };

  const loadMore = (): void => {
    const newPage = page + 1;
    setQuery(query);
    setPage(newPage);
  };

  const openModal = (imageUrl: string): void => {
    setLargeImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
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
