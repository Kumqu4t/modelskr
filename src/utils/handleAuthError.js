export const handleAuthError = async (res) => {
	if (res.status === 401) {
		const data = await res.json();
		if (data.message === "jwt expired") {
			alert("세션이 만료되었습니다. 다시 로그인해주세요.");
			localStorage.removeItem("token");
			window.location.href = "/login";
		} else if (res.status === 403) {
			alert("이 리소스에 접근할 권한이 없습니다.");
			window.location.href = "/";
		} else {
			throw new Error(data.message || "인증 오류가 발생했습니다.");
		}
	}
};
