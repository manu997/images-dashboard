import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageContainer } from "./components/ImageContainer/ImageContainer";
import Input from "./components/Input/Input";
import useDebounce from "./hooks/useDebounce";
import useGetImages from "./queries/useGetImages";
import "./styles/app.css";
import "./styles/loader.css";
import { useTranslation } from "react-i18next";

function App() {
  const [titleParam, setTitleParam] = useState("");

  const debouncedSearch = useDebounce(titleParam);
  const { t } = useTranslation();
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGetImages({
    title: debouncedSearch,
  });

  console.info("data", data);
  console.info("hasNextPage", hasNextPage);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const onReachEnd = useCallback(async () => {
    if (!isLoading && hasNextPage) {
      await fetchNextPage();
    }
  }, [fetchNextPage, isLoading, hasNextPage]);

  const handleSearch = useCallback(
    (e?: React.ChangeEvent<HTMLInputElement>) => {
      setTitleParam(e?.target.value ?? "");
    },
    [],
  );

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

  const pages = useMemo(() => data?.pages ?? [], [data?.pages]);
  console.info("pages", pages);
  const images = useMemo(
    () =>
      pages.flatMap(
        (page) =>
          page.images.edges?.flatMap((edge) => edge?.node ?? []) ?? [],
      ),
    [pages],
  );

  return (
    <>
      <header>
        <img src="SAMY.svg" alt="logo_primary" />
        <Input
          icon={faSearch}
          type="text"
          placeholder={t("SEARCH_BAR_PLACEHOLDER")}
          className="header-search"
          onChange={handleSearch}
        />
      </header>
      <main>
        {error ? (
          <span>{t("QUERY_ERROR")}</span>
        ) : isLoading ? (
          <span className="loader" />
        ) : (
          <>
            {images.length === 0 ? (
              <span>{t("NO_RESULTS")}</span>
            ) : (
              <div className="image-grid">
                {images.map((image) => (
                  <ImageContainer key={image.id} image={image} />
                ))}
                {hasNextPage && (
                  <div ref={observerRef} style={{ height: "20px" }} />
                )}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
