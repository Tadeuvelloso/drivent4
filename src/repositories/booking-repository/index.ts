import { prisma } from "@/config";

async function getBookingByuserId(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId
    }
  });
}

async function postNewCustomerBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}

async function getBookingById(bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId
    }
  });
}

async function findRoomById(roomId: number) {
  return await prisma.room.findFirst({
    where: {
      id: roomId
    }
  });
}

async function putCustomerRoom(bookinhId: number, roomId: number) {
  return await prisma.booking.update({
    where: {
      id: bookinhId
    },
    data: {
      roomId: roomId
    },
  });
}

const bookingRepository = {
  getBookingByuserId,
  postNewCustomerBooking,
  getBookingById,
  findRoomById,
  putCustomerRoom
};

export default bookingRepository;
