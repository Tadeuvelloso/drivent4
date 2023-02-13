import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const allBookingRooms = await bookingService.getAllRooms(userId);
    return res.status(httpStatus.OK).send(allBookingRooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
} 

export async function postRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const newCustomerRoom = await bookingService.newCustomerRoom(Number(roomId), Number(userId));
    return res.status(httpStatus.OK).send(newCustomerRoom);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
} 

export async function putRooms(req: AuthenticatedRequest, res: Response) {
  const { roomId } = req.body;
  const { bookingId } = req.params;
  try {
    const newCustomerRoom = await bookingService.putCustomerRoom(Number(roomId), Number(bookingId));
    return res.status(httpStatus.OK).send(newCustomerRoom);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
