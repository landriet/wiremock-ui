export interface IRequest {
    id: string
    request: {
        url: string
        absoluteUrl: string
        method: string
        clientIp: string
        headers: {
            Cookie: string
            Accept: string
            'X-Request-Id': string
            'User-Agent': string
            'X-Forwarded-Host': string
            Connection: string
            Host: string
            DNT: string
            'Accept-Encoding': string
            Authorization: string
            'Upgrade-Insecure-Requests': string
            'X-Forwarded-For': string
            'Accept-Language': string
            'X-Forwarded-Server': string
        }
        cookies: any
        browserProxyRequest: boolean
        loggedDate: number
        bodyAsBase64: string
        body: string
        scheme: string
        host: string
        port: number
        loggedDateString: string
        queryParams: any
    }
    responseDefinition: {
        status: number
        body: string
        headers: any
    }
    response: {
        status: number
        headers: any
        bodyAsBase64: string
        body: string
    }
    wasMatched: boolean
    timing: {
        addedDelay: number
        processTime: number
        responseSendTime: number
        serveTime: number
        totalTime: number
    }
    stubMapping: {
        id: string
        request: {
            url: string
            method: string
            headers: any
            queryParameters: any
            cookies: any
            bodyPatterns: any[]
        }
        response: {
            status: number
            body: string
            headers: any
        }
        uuid: string
        priority: number
    }
}
