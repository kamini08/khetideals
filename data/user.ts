import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getAllCoordinates = async () => {
  try {
    const locations = await db.user.findMany({
      select: {
        latitude: true,
        longitude: true,
      },
    });
    return locations.map((location) => ({
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};
