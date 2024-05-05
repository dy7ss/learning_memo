import { Repository } from "../repositories/memoRepository";

async function getList(keyword: string) {
    return Repository.getList(keyword);
}

async function register(registerQueryInfo: any) {
    return Repository.register(registerQueryInfo);
}

async function update(updateQueryInfo: any) {
    return Repository.update(updateQueryInfo);
}

async function cancel(id: number) {
    return Repository.cancel(id);
}

export {
    getList,
    register,
    update,
    cancel
}
