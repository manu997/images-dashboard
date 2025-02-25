import {
  faHeart as faHeartOutline,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import useLikeImage from "../../queries/useLikeImage";
import "./imaged-container.css";
import { useTranslation } from "react-i18next";
import type { Image } from "../../graphql/generated/graphql";

interface ImageContainerProps {
  image: Image;
}

export const ImageContainer = ({ image }: ImageContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();
  const { mutateAsync } = useLikeImage();

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleLike = useCallback(async () => {
    try {
      await mutateAsync({ imageId: image.id });
    } catch (error) {
      console.error(error);
    }
  }, [image.id, mutateAsync]);

  const ImageActions = useCallback(() => {
    return (
      <>
        <div className="image-actions-item" data-testid="like-button-container">
          <FontAwesomeIcon
            className="like-icon"
            icon={image.liked ? faHeart : faHeartOutline}
            onClick={handleLike}
            data-testid={`like-button-${image.id}`}
          />
          <span data-testid={`like-counter-${image.id}`}>
            {image.likesCount}
          </span>
        </div>
        <div className="image-actions-item">
          <FontAwesomeIcon icon={faPaperPlane} />
          <span>0</span>
        </div>
      </>
    );
  }, [image.liked, image.id, image.likesCount, handleLike]);

  return (
    <figure key={image.title} className="image-container">
      <div className="image-wrapper">
        {image.price && (
          <div className="image-price-background">
            <span
              className="image-price"
              data-testid={`image-price-${image.id}`}
            >
              {image.price.toFixed(2)}
              <small>€</small>
            </span>
          </div>
        )}
        {isLoading && <div className="loader" />}
        {image.picture && (
          <img
            src={image.picture}
            alt={image.title ?? ""}
            onLoad={handleImageLoad}
            onError={handleImageLoad}
          />
        )}
        <div className="image-actions">
          <ImageActions />
        </div>
      </div>
      <figcaption>
        {image.title && (
          <h1 className="image-title" data-testid={`image-title-${image.id}`}>
            {image.title.toUpperCase()}
          </h1>
        )}
        {image.author && (
          <>
            <span className="author-label">{t("BY").toLowerCase()}</span>
            <span data-testid={`image-author-${image.id}`}>{image.author}</span>
          </>
        )}
        <div className="responsive-actions">{/* <ImageActions /> */}</div>
      </figcaption>
    </figure>
  );
};
