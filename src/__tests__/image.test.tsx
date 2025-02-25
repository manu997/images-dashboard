import { expect, test } from "vitest";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import "@testing-library/jest-dom/vitest";
import useGetImages from "../queries/useGetImages";
import { ImageContainer } from "../components/ImageContainer/ImageContainer";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test("Test image data render", async () => {
  const { result } = renderHook(() => useGetImages({ title: "" }), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.data).toBeDefined(), {
    timeout: 5000,
  });

  const firstImage = result.current.data?.pages[0]?.images.edges?.[0]?.node;

  expect(firstImage).toBeDefined();

  if (!firstImage) {
    return;
  }

  render(<ImageContainer image={firstImage} />, {
    wrapper: createWrapper(),
  });

  const title = screen.getByTestId(`image-title-${firstImage?.id}`);
  const author = screen.getByTestId(`image-author-${firstImage?.id}`);
  const price = screen.getByTestId(`image-price-${firstImage?.id}`);
  const likeCounter = screen.getByTestId(`like-counter-${firstImage?.id}`);

  expect(title).toBeInTheDocument();
  expect(price).toBeInTheDocument();
  expect(likeCounter).toBeInTheDocument();
  expect(author).toBeInTheDocument();
});
