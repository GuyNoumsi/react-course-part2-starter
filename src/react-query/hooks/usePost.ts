import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePost = () => {
  const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60000,
  });
};

export default usePost;
