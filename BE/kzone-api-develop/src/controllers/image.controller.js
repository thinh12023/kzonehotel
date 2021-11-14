/**[IMAGE] */

const upload = async (req, res, next) => {
  try {
    if (req.file && req.file.filename) {
      return res.status(200).json({
        code: 1,
        message: "Upload successfully!",
        data: {
          filename: req.file.filename,
        }
      })
    }
    else {
      return res.status(400).json({
        code: 0,
        message: "Upload failed!",
        data: {}
      })
    }
  } catch (error) {
    return res.status(500).json({
      code: 0,
      message: "Upload failed!",
      data: {}
    })
  }
}

module.exports = {
  upload,
}