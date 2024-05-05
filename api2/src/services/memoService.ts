const repository = require("../repositories/memoRepository");

async function getList(keyword: string) {
    return repository.getList(keyword);
}

async function register(registerQueryInfo: any) {
    return repository.register(registerQueryInfo);
}

async function update(updateQueryInfo: any) {
    return repository.update(updateQueryInfo);
}

export {
    getList,
    register,
    update
}
