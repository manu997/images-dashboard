import { useCallback, useEffect, useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ImageContainer } from "./components/ImageContainer/ImageContainer";
import Input from "./components/Input/Input";
import useGetImages, {} from "./queries/useGetImages";
import "./styles/app.css";
import "./styles/loader.css";

function App() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGetImages();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const onReachEnd = useCallback(async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

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
          {data?.pages.map((page) =>
            page.images.edges.map((edge) => (
              <ImageContainer key={edge.node.picture} node={edge.node} />
            )),
          )}
        </div>
        <div ref={observerRef} style={{ height: "20px" }} />
        {isLoading && <span className="loader" />}
      </main>
    </>
  );
}

export default App;
