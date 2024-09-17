// components/ImageGallery/ImageGallery.js
import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

type Images = {
  smallUrl: string;
  largeUrl: string;
};

type Props = {
  images: Images[];
  onImageClick: (largeUrl: string) => void;
};

const ImageGallery = ({ images, onImageClick }: Props) => {
  return (
    <ul className={css.galleryList}>
      {images.map((image, index) => (
        <li key={index}>
          <ImageCard
            smallUrl={image.smallUrl}
            largeUrl={image.largeUrl}
            onImageClick={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
