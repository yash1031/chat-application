import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
const router= express.Router();
import { getUsersFromSidebar } from "../controllers/message.controller.js";

router.get("/users", protectRoute, getUsersFromSidebar)

export default router;