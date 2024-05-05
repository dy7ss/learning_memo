const repository = require("../repositories/memoRepository");

async function getList(keyword: string) {
    return repository.getList(keyword);
}

async function register(registerQueryInfo: any) {
    return repository.register(registerQueryInfo);
}

export {
    getList,
    register
}
