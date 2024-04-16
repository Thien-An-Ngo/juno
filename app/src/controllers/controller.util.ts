type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'

type SetHeadersType = Record<string, string> & {
	'Set-Cookie'?: string | string[];
}

export const setDefaultHeaders = (setHeaders: SetHeadersType, methods?: HTTPMethod[]): SetHeadersType => {
	setHeaders['Access-Control-Allow-Origin'] = '*'
	setHeaders['Access-Control-Allow-Methods'] = methods ? methods.join(' ,') : 'GET, POST, PUT, DELETE, OPTIONS'
	setHeaders['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
	setHeaders['Access-Control-Allow-Credentials'] = 'true'
	setHeaders['Content-Type'] = 'application/json'
	return setHeaders
}