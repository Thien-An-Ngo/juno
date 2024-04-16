export const verifyParams = (
	params: Record<string, unknown>,
	requiredParams: string[],
): [boolean, string[]] => {
	const missingParams = requiredParams.filter((param) => !params[param])
	return [missingParams.length === 0, missingParams]
}
