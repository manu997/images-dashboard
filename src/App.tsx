import { useCallback, useState } from "react";
import useGetImages, {
  type GetImagesWithPaginationParams,
} from "./queries/useGetImages";
import { data } from "./queries/mock.json";
import "./styles/app.css";
import { ImageContainer } from "./components/ImageContainer/ImageContainer";
import Input from "./components/Input/Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  // const [params, setParams] = useState<GetImagesWithPaginationParams>({
  //   after: "",
  //   first: 9,
  // });

  // const { data, error, isLoading } = useGetImages(params);

  // const onReachEnd = useCallback(() => {
  //   setParams((prev) => ({
  //     first: prev.first + 9,
  //     after: data?.images.pageInfo.endCursor || "",
  //   }));
  // }, [data?.images.pageInfo.endCursor]);

  // // if (error) {
  // //   return <>{error.message}</>;
  // // }

  // // if (isLoading) {
  // //   return <>Loading...</>;
  // // }

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
          {data?.images.edges.map((edge) => (
            <ImageContainer key={edge.node.id} node={edge.node} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
