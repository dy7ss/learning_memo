

function toRegisterRequest(req: any) {
    const registerRequest = {
        category: req?.body?.category,
        subject_name: req?.body?.subject_name,
        used_time: parseInt(req?.body?.used_time),
        study_date: req?.body?.study_date
    }
    return registerRequest;
}

export {
    toRegisterRequest
}
