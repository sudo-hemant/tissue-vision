import { useState } from "react";

import Loading from "./Loading";

const LoadMore = ({ onClick }) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMoreClick = async () => {
    setLoadingMore(true);
    await onClick();
    setLoadingMore(false);
  };
  return (
    <>
      {loadingMore ? (
        <Loading />
      ) : (
        <button onClick={handleLoadMoreClick}>Load More</button>
      )}
    </>
  );
};

export default LoadMore;
