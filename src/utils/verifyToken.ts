import jwt from "jsonwebtoken";
import { toast } from "react-toastify";

function verifyToken() {
    const loggedUserJson = window.localStorage.getItem("loggedGreenUser") || null;

    const user = JSON.parse(loggedUserJson || "");
    const verify:any = jwt.decode(user)
    const {exp} = verify
    if (new Date() >= new Date(exp*1000)) {
        toast.success("Su sesión ha expirado, vuelva a iniciar sesión");
        window.localStorage.removeItem('loggedGreenUser')
        window.location.href="/"
    }
}

export default verifyToken
 