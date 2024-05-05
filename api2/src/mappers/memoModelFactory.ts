

function toRegisterQueryInfo(req: any) {
    const registerQueryInfo = {
        category: req?.body?.category,
        subject_name: req?.body?.subject_name,
        used_time: parseInt(req?.body?.used_time),
        study_date: req?.body?.study_date
    }
    return registerQueryInfo;
}

export {
    toRegisterQueryInfo
}
