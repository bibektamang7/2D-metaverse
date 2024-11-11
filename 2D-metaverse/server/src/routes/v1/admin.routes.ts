import { Router } from "express";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import {
  createMap,
  createAvatar,
  createElement,
  updateElement,
} from "../../controllers/admin.controller";
const router = Router();

router.use(adminMiddleware);

router.route("/element").post(createElement);
router.route("/avatar").post(createAvatar);
router.route("/map").post(createMap);
router.route("/element/:elementId").put(updateElement);

export default router;
