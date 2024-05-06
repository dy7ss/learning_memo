import { toGetListQuery } from "../mappers/memoModelFactory";
import { Repository } from "../repositories/memoRepository";
const factory = require("../mappers/memoModelFactory")
import { Request } from "express";

async function getList(req: Request) {
    const keyword = toGetListQuery(req);
    return Repository.getList(keyword);
}

async function register(req: Request) {
    const registerQueryInfo = factory.toRegisterQueryInfo(req)
    return Repository.register(registerQueryInfo);
}

async function update(req: Request) {
    const updateQueryInfo = factory.toUpdateQueryInfo(req);
    return Repository.update(updateQueryInfo);
}

async function cancel(req: Request) {
    const id = parseInt(req.params.id);
    return Repository.cancel(id);
}

export {
    getList,
    register,
    update,
    cancel
}
