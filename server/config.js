

const PORT = 5000;

const BCRYPT_WORK_FACTOR = 12;

const SECRET_KEY = process.env.SECRET_KEY || "sNeSPbeRBLzRvAbX"

const getDatabaseURI = () => {
    if (process.env.NODE_ENV === "test") {
        return "postgresql:///res_manager_test"
    } else {
        return process.env.DATABASE_URL || "postgresql:///res_manager"
    }
}



module.exports = {
    PORT,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    getDatabaseURI
}