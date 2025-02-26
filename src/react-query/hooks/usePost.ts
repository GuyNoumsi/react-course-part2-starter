import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePost = (query: PostQuery) => {
  const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
          keepPreviousData: true,
        },
      })
      .then((res) => res.data);
  return useQuery({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: 60000,
  });
};

export default usePost;
