import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { putRooms, postRooms, getRooms } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getRooms)
  .post("/", postRooms)
  .put("/:bookingId", putRooms);

export { bookingRouter };