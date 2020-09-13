import redaxios, { to } from "@/utils/fetch";

export function createApiService(baseUrl){
    return async function({ search = '' }){
        return to(redaxios(`${baseUrl}${search}`))
    }
}
