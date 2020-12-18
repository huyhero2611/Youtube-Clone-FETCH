async function handleSubmit(searchTerm) {
  const {
    data: { items: videos },
  } = await youtube.get("search", {
    params: {
      part: "snippet",
      maxResults: 5,
      key: "API_KEY",
      q: searchTerm,
    },
  });

  setVideos(videos);
  setSelectedVideo(videos[0]);
}
