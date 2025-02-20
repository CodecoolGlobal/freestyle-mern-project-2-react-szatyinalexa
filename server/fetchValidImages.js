export async function fetchValidImages(requiredCount) {
  const apiKey = process.env.CAT_API_KEY;
  const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=50&mime_types=jpg,png&api_key=${apiKey}`;
  const validImageSet = new Set();

  while (validImageSet.size < requiredCount) {
    const response = await fetch(apiUrl);
    const data = await response.json();

    data.forEach((datum) => {
      const idealWidthHeightRatio = 0.8;
      const widthHeightRatio = datum.width / datum.height;
      if (
        widthHeightRatio >= idealWidthHeightRatio - 0.2 &&
        widthHeightRatio <= idealWidthHeightRatio + 0.2
      ) {
        const catPic = {
          link: datum.url,
          width: datum.width,
          height: datum.height,
          usedCount: 0,
          createdAt: Date.now(),
        };
        validImageSet.add(catPic);
      }
    });
  }
  return Array.from(validImageSet).slice(0, requiredCount);
}
