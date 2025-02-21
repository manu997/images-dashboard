import { useCallback, useEffect, useRef, useState } from "react";
// import { data } from "./queries/mock.json";
import useGetImages, {
  type GetImagesWithPaginationResponse,
  type GetImagesWithPaginationParams,
} from "./queries/useGetImages";
import "./styles/app.css";
import "./styles/loader.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ImageContainer } from "./components/ImageContainer/ImageContainer";
import Input from "./components/Input/Input";

function App() {
  const [params, setParams] = useState<GetImagesWithPaginationParams>({
    after: "",
    first: 9,
  });
  console.info(JSON.stringify(params));
  const [items, setItems] = useState<GetImagesWithPaginationResponse>({
    images: {
      edges: [],
      pageInfo: {
        endCursor: "",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
      },
    },
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, error, isLoading } = useGetImages(params);

  const onReachEnd = useCallback(() => {
    if (data?.images.pageInfo.hasNextPage) {
      setParams((prev) => ({
        first: prev.first,
        after: data.images.pageInfo.endCursor,
      }));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setItems((prev) => ({
        images: {
          edges: [...prev.images.edges, ...data.images.edges],
          pageInfo: data.images.pageInfo,
        },
      }));
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onReachEnd();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [onReachEnd]);

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <header>
        <img src="SAMY.svg" alt="logo_primary" />
        <Input
          icon={faSearch}
          type="text"
          placeholder="You're looking for something?"
          className="header-search"
        />
      </header>
      <main>
        <div className="image-grid">
          {items.images.edges.map((edge) => (
            <ImageContainer key={edge.node.id} node={edge.node} />
          ))}
        </div>
        <div ref={observerRef} style={{ height: "20px" }} />
        {isLoading && <span className="loader" />}
      </main>
    </>
  );
}

export default App;
