import upload from "../middlewares/multer.js";
import getFiles from "../middlewares/getMedia.js";
import controller from "../controllers/event.js";
import { Router } from "express";
const router = Router();

router.post('/create', upload.single("cover"), getFiles, controller.create);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);
router.post('/:id/attend', controller.attend);
router.delete('/:id/attend', controller.unattend);

export default router;