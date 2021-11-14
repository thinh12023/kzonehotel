const {
  Image,
} = require("../models");

//add images
const addImages = async (images, idRoomType) => {
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    await Image.create({ ...img, idRoomType });
  }
}

//update images
const updateImages = (images, idRoomType) => {

}

module.exports = {
  addImages,
  updateImages,
}