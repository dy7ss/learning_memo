import { PrismaClient, Prisma } from "@prisma/client"


const prisma = new PrismaClient();

export class Repository {
    static async getList(subject_name: string) {
        try {
            if (subject_name) {
                const result = await prisma.learning_list.findMany({
                    where: {
                        subject_name: {
                            contains: subject_name
                        }
                    }
                });
                return result;
            }
            const result = await prisma.learning_list.findMany();
            return result;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientInitializationError) {
                console.error("database connection error", error.message);
            } else {
                console.error("error: ", error.message);
            }
            return { error: "failed to fetch learning list" }
        }
    }

    static async register(registerRequest: any) {
        try {
            const result = await prisma.learning_list.create({
                data: registerRequest,
            });
            return result;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientInitializationError) {
                console.error("database connection error", error.message);
            } else {
                console.error("error: ", error.message);
            }
            return { error: "failed to fetch learning list" }
        }

    }

    static async update(updateQueryInfo: any) {
        try {
            const result = await prisma.learning_list.update({
                where: updateQueryInfo.key,
                data: updateQueryInfo.data,
            });
            return result;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientInitializationError) {
                console.error("database connection error", error.message);
            } else {
                console.error("error: ", error.message);
            }
            return { error: "failed to fetch learning list" }
        }
    }

    static async cancel(id: number) {
        try {
            const result = await prisma.learning_list.delete({
                where: { memo_id: id },
            });
            return result;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientInitializationError) {
                console.error("database connection error", error.message);
            } else {
                console.error("error: ", error.message);
            }
            return { error: "failed to fetch learning list" }
        }
    }
}
