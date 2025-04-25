export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getHeaders = (token, customHeaders = {}) => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${token}`,
	...customHeaders,
});
