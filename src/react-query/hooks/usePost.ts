import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePost = (query: PostQuery) => {
  const fetchPosts = (pageParam: number) =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          keepPreviousData: true,
        },
      })
      .then((res) => res.data);
  return useInfiniteQuery({
    queryKey: ["posts", query],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    staleTime: 60000,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export default usePost;
