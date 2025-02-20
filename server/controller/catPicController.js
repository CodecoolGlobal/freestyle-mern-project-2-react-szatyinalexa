import CatPic from "../model/CatPic.js";
import { fetchValidImages } from "../fetchValidImages.js";

//get required amount pics
export const getCatPics = async (req, res) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const requiredCount = parseInt(req.query.count) || 6;
    const imagesFromDB = await CatPic.find({
      $or: [
        { lastUsed: { $lt: oneHourAgo } },
        { lastUsed: { $exists: false } },
      ],
    })
      .sort({ usedCount: 1, lastUsed: 1 })
      .limit(requiredCount);

    const images = imagesFromDB.map((iamgeObj) => iamgeObj.link);
    if (imagesFromDB.length < requiredCount) {
      const imagesFromApi = await fetchValidImages(
        requiredCount - imagesFromDB.length
      );
      //images.push(...imagesFromApi);
      imagesFromApi.forEach((newImage) => {
        images.push(newImage.link);
      })
      await saveNewCatPicsFromApi(imagesFromApi);
    }
    res.status(200).json(images);
    await updateCatPicsInDb(imagesFromDB);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const saveNewCatPicsFromApi = async (catPicsArr) => {
  const updatedImages = catPicsArr.map((image) => ({
    ...image,
    usedCount: 1,
    lastUsed: Date.now(),
    createdAt: Date.now(),
  }));

  await CatPic.insertMany(updatedImages);
};

const updateCatPicsInDb = async (catPicsArr) => {
  await CatPic.updateMany(
    { link: { $in: catPicsArr.map((img) => img.link) } },
    {
      $inc: { usedCount: 1},
      $set: { lastUsed: Date.now() },
    },
  );
};
