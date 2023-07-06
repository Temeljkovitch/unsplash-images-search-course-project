import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}&query=`;

const Gallery = () => {
  const { search } = useGlobalContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["images", search],
    queryFn: () => axios.get(`${url}${search}`),

    // Optional Query Function
    // queryFn: async () => {
    //   const result = await axios.get(url);
    //   return result;
    // },
  });

  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = data.data.results;

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map((image) => {
        // Using optional chaining
        const url = image?.urls?.regular;
        return (
          <img
            src={url}
            key={image.id}
            alt={image.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
