const modela = require("../models/memoModel")
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function getList(keyword: string) {
    if (keyword) {
        const result = await prisma.learning_list.findMany({
            where: {
                subject_name: {
                    contains: keyword
                }
            }
        });
        return result;
    }
    const result = await prisma.learning_list.findMany();
    return result;
}

async function register(registerRequest: any) {
    const result = await prisma.learning_list.create({
        data: registerRequest,
    });
    return result;
}


export {
    getList,
    register
}
