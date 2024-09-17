// components/ImageGallery/ImageGallery.js
import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
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
