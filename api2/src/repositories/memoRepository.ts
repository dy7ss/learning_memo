import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export class Repository {
    static async getList(subject_name: string) {
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
    }

    static async register(registerRequest: any) {
        const result = await prisma.learning_list.create({
            data: registerRequest,
        });
        return result;
    }

    static async update(updateQueryInfo: any) {
        const result = await prisma.learning_list.update({
            where: updateQueryInfo.key,
            data: updateQueryInfo.data,
        });
        return result;
    }

    static async cancel(id: number) {
        const result = await prisma.learning_list.delete({
            where: { memo_id: id },
        });
        return result;
    }
}
