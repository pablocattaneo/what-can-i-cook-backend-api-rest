import { Router } from "express";

const router = Router();

import { getUserById, updateUserById } from "../controllers/user";

import {IsAuth} from "../middleware/is-auth";

router.get("/user/:userId", IsAuth, getUserById);

router.post("/user/update/:userId", IsAuth, updateUserById);

export default router;
