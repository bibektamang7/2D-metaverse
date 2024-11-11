import { Router } from "express";
import { userMiddleware } from "../../middlewares/user.middleware";
import {
  signUpUser,
  signInUser,
  getAvatars,
  updateMetaData,
} from "../../controllers/user.controller";

const router = Router();


router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);

// should move to separate place
router.route("/get-avatars").get(getAvatars);
router.route("/metadata").post( userMiddleware, updateMetaData);

export default router;
