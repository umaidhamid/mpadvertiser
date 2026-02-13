export const createCarousel = async (req, res) => {
  try {
    const files = req.uploadedFiles || [];

    res.status(201).json({
      success: true,
      message: "Carousel media uploaded",
      files,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGallery = async (req, res) => {
  try {
    const files = req.uploadedFiles || [];

    res.status(201).json({
      success: true,
      message: "Gallery media uploaded",
      files,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const files = req.uploadedFiles || [];

    res.status(201).json({
      success: true,
      message: "Product media uploaded",
      files,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
