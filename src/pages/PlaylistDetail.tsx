import { useParams } from "react-router-dom";
import useHttpRequest from "../hooks/useHttpRequest";

export default function PlaylistDetail() {
  const params = useParams();
  const data = useHttpRequest({
    api: "/playlist/detail",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  console.log(data);
  return <>{data.code === 200 && <div>{data.playlist.name}</div>}</>;
}
