import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient();

export class Repository {
    static async findUnique(user_id: string, password: string) {
        try {
            // TODO: 不適ならエラー
            if (user_id && password) {
                const result = await prisma.users.findUnique({
                    where: {
                        user_id: user_id,
                        password: password
                    }
                });
                return result;
            }
        } catch (error: any) {
            return { error: "failed to fetch user" }
        }
    }

    static async register(email: string, password: string) {
        try {
            const result = await prisma.users.create(
                {
                    data: {
                        user_id: email,
                        password: password
                    }
                }
            )
            return result;
        } catch (error: any) {
            return { error: "failed to fetch user" }
        }
    }
}
