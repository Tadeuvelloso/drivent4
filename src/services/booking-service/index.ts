import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import bookingRepository from "@/repositories/booking-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";

async function getAllRooms(userId: number) {
  const customerBooking = await bookingRepository.getBookingByuserId(userId);
  if(!customerBooking) {
    throw notFoundError();
  }
  return customerBooking;
}

async function newCustomerRoom(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }

  const room = await bookingRepository.findRoomById(roomId);
  if(!room) {
    throw notFoundError();
  }
  const newCustomerBooking = await bookingRepository.postNewCustomerBooking(userId, roomId);
  return newCustomerBooking;
}

async function putCustomerRoom(bookingId: number, roomId: number) {
  const bookingExist = await bookingRepository.getBookingById(bookingId);

  if(!bookingExist) {
    throw notFoundError();
  }
  await bookingRepository.putCustomerRoom(bookingId, roomId);
  return bookingId;
}

const bookingService = {
  getAllRooms,
  newCustomerRoom,
  putCustomerRoom
};

export default bookingService;
