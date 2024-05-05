import { registerQueryInfo } from "../types/RegisterQueryInfo";
import { updateQueryInfo } from "../types/updateQueryInfo";


function toRegisterQueryInfo(req: any): registerQueryInfo {
    const registerQueryInfo = {
        category: req?.body?.category,
        subject_name: req?.body?.subject_name,
        used_time: parseInt(req?.body?.used_time),
        study_date: req?.body?.study_date
    }
    return registerQueryInfo;
}

function toUpdateQueryInfo(req: any): updateQueryInfo {
    const updateQueryInfo = {
        key: {
            memo_id: req?.body?.memo_id
        },
        data: {
            category: req?.body?.category,
            subject_name: req?.body?.subject_name,
            used_time: parseInt(req?.body?.used_time),
            study_date: req?.body?.study_date
        }
    }
    return updateQueryInfo;
}

function toGetListQuery(req: Request): string {
    const keyword: string = typeof req.query.keyword === 'string' ? req.query.keyword : '';
    return keyword;
}

export {
    toRegisterQueryInfo,
    toUpdateQueryInfo,
    toGetListQuery
}
