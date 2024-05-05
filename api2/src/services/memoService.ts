const repository = require("../repositories/memoRepository");

async function getList(keyword: string) {
    return repository.getList(keyword);
}

async function register(registerRequest: any) {
    return repository.register(registerRequest);
}



export {
    getList,
    register
}
