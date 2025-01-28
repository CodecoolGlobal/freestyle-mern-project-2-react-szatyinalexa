import express from 'express';
import {
    addUser,
    getUsers,
    getUsersWithScores,
    findUser,
    deleteUser,
    updateUser,
} from "../controller/userController";

const router = express.Router();

router.post("/", addUser);
router.get("/", getUsers);
router.get("/scored", getUsersWithScores);
router.post("/login", findUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

export default router;