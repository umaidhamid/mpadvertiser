import Offer from "../models/offer.model.js";


// CREATE OFFER
export const createOffer = async (req, res) => {
  try {
    let { title, description, buttonText, redirectUrl } = req.body;

    // -------------------------
    // Basic Required Validation
    // -------------------------
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // Trim values
    title = title.trim();
    description = description.trim();
    buttonText = buttonText ? buttonText.trim() : "Claim Offer";
    redirectUrl = redirectUrl ? redirectUrl.trim() : "/Contact-Us";

    // -------------------------
    // Empty String Validation
    // -------------------------
    if (title.length === 0 || description.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title and description cannot be empty",
      });
    }

    // -------------------------
    // Length Validation
    // -------------------------
    if (title.length < 5 || title.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 5 and 100 characters",
      });
    }

    if (description.length < 10 || description.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Description must be between 10 and 500 characters",
      });
    }

    if (buttonText.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Button text cannot exceed 50 characters",
      });
    }

    // -------------------------
    // Redirect URL Validation
    // -------------------------
    const urlPattern = /^(\/[a-zA-Z0-9-_/]*)$|^(https?:\/\/[^\s]+)$/;

    if (!urlPattern.test(redirectUrl)) {
      return res.status(400).json({
        success: false,
        message: "Redirect URL must be a valid relative path or full URL",
      });
    }

    // -------------------------
    // Create Offer
    // -------------------------
    const offer = await Offer.create({
      title,
      description,
      buttonText,
      redirectUrl,
    });

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      offer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



// GET LATEST OFFER
export const getLatestOffer = async (req, res) => {
  try {
    const offer = await Offer.findOne().sort({ createdAt: -1 });

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "No offer found",
      });
    }

    res.status(200).json({
      success: true,
      offer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
