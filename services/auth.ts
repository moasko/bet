import db from "@/lib/db";

const getParainBycode = async (code: string) => {
  return await db.user.findUnique({
    where: {
      referalCode: code,
    },
  });
};

export const registerUser = async (data) => {
  return await db.user.create({
    data,
  });
};
