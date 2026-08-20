import { Router } from "express";

import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import offerRoutes from "./offer.routes.js";
import galleryRoutes from "./gallery.routes.js";
import carouselRoutes from "./carousel.routes.js";
import testimonialRoutes from "./testimonial.routes.js";
import clientRoutes from "./client.routes.js";
import teamRoutes from "./team.routes.js";
import couponsRoute from "./coupon.routes.js";
import orderRoutes from "./order.routes.js";
import uploadRoute from "./upload.routes.js";
import studentRoutes from "./student.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/offers", offerRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/gallery", galleryRoutes);
router.use("/clients", clientRoutes);
router.use("/coupons", couponsRoute);
router.use("/orders", orderRoutes);
router.use("/team", teamRoutes);
router.use("/carousel", carouselRoutes);
router.use("/uploadcsv", uploadRoute);
router.use("/students", studentRoutes);

export default router;
