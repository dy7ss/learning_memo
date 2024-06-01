import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient();

export class Repository {
    static async findUnique(email: string, password: string) {
        try {
            // TODO: 不適ならエラー
            if (email && password) {
                const result = await prisma.users.findUnique({
                    where: {
                        user_id: email,
                        password: password
                    }
                });
                return result;
            }
        } catch (error: any) {
            return { error: "failed to fetch user" }
        }
    }
}
