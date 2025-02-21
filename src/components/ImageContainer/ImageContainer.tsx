import type { Image } from "../../types";
import "./imaged-container.css";

interface ImageContainerProps {
  node: Image;
}

export const ImageContainer = ({ node }: ImageContainerProps) => {
  return (
    <figure key={node.title} className="image-container">
      <div className="image-price-background">
        <span className="image-price">
          {node.price.toFixed(2)}
          <small>€</small>
        </span>
      </div>
      <img src={node.picture} alt={node.title} />
      <figcaption>
        <h1 className="image-title">{node.title.toUpperCase()}</h1>
        <span className="author-label">by</span>
        <span>{node.author}</span>
      </figcaption>
    </figure>
  );
};
