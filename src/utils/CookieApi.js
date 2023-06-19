import Cookies from "js-cookie";

const CookieApi = Cookies.withAttributes({sameSite: "Lax", secure: true});

export default CookieApi