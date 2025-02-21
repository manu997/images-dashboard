import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Image } from "../../types";
import "./imaged-container.css";
import {
  faHeart as faHeartOutline,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
interface ImageContainerProps {
  node: Image;
}

export const ImageContainer = ({ node }: ImageContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <figure key={node.title} className="image-container">
      <div className="image-wrapper">
        <div className="image-price-background">
          <span className="image-price">
            {node.price.toFixed(2)}
            <small>€</small>
          </span>
        </div>
        {isLoading && <div className="loader" />}
        <img
          src={node.picture}
          alt={node.title}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />
        <div className="image-actions">
          <div className="image-actions-item">
            <FontAwesomeIcon
              className="like-icon"
              icon={node.liked ? faHeart : faHeartOutline}
            />
            <span>{node.likesCount}</span>
          </div>
          <div className="image-actions-item">
            <FontAwesomeIcon icon={faPaperPlane} />
            <span>0</span>
          </div>
        </div>
      </div>
      <figcaption>
        <h1 className="image-title">{node.title.toUpperCase()}</h1>
        <span className="author-label">by</span>
        <span>{node.author}</span>
      </figcaption>
    </figure>
  );
};
