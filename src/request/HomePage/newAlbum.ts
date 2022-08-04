import { BaseUrl } from "../BaseUrl";

const getNewAlbum = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let album = [];
  try {
    const res = await fetch(
      `${BaseUrl}/top/album?offset=0&limit=10&year=${year}&month=${month}&realIP=116.25.146.177`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.code === 200) {
      album.push(data.weekData.slice(0, 5));
      album.push(data.weekData.slice(5, 10));
    }
    return { fail: false, album };
  } catch (error) {
    // return networkError;
    console.log(error)
  }
};

export { getNewAlbum };
