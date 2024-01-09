import { db } from "./db"

export const getUserByUsername = async (username: string) => {
    
    try {
        const user = await db.user.findUnique({
            where: {
                username
            }
        });
    
        return user;

    } catch (err) {
        console.log(err);
        throw new Error("An error occurred while query database:", {cause: err})
    }
}