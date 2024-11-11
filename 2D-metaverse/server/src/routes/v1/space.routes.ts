import { Router } from "express";
import {
    createSpace,
    deleteElementFromSpace,
    deleteSpace,
    getExistingSpaces,
    getSpace,
    addElementInSpace,
    getAvailableElements
 } from "../../controllers/space.controller";
import { userMiddleware } from "../../middlewares/user.middleware";
const router = Router();

router.use(userMiddleware);

router.route("/").post(createSpace);
router.route("/get-existing-spaces").get(getExistingSpaces);
router.route("/element").post(addElementInSpace).delete(deleteElementFromSpace);
router.route("/space/:spaceId").delete(deleteSpace).get(getSpace);

// it would be better to move this endpoint apart from space route
router.route("/get-all-elements").get(getAvailableElements);

export default router;

