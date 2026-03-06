import { Router } from "express";
import { StudentControllers } from "./student.controller";

const router = Router();

router.get(`/all`, StudentControllers.getAllStudents);
router.get(`/:studentId`, StudentControllers.getSingleStudent);
router.delete(`/:studentId`, StudentControllers.deleteStudent);

export const StudentRoutes = router;
