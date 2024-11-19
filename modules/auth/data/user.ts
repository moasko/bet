import db from "@/lib/db";

class UserRepository {
  private handleError(method: string, error: any) {
    console.error(`Error in ${method}:`, error);
    throw new Error(`Could not complete the ${method} operation.`);
  }

  async getUserByEmail(email: string) {
    try {
      return await db.user.findUnique({
        where: { email },
      });
    } catch (error) {
      this.handleError("getUserByEmail", error);
    }
  }

  async getUserById(id: number) {
    try {
      return await db.user.findUnique({
        where: { id: id },
      });
    } catch (error) {
      this.handleError("getUserById", error);
    }
  }
}

const userRepository = new UserRepository();
export default userRepository;
