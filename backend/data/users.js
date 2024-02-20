import bcrypt from "bcryptjs"


const users = [
    {
        name: "DannyASP",
        email: "danny@email.com",
        password: bcrypt.hashSync('dny123', 10),
        isAdmin: true
    },
    {
        name: "tester",
        email: "tester@email.bg",
        password: bcrypt.hashSync('dny123', 10),
        isAdmin: false
    },
    {
        name: "tester2",
        email: "tester2@email.bg",
        password: bcrypt.hashSync('dny123', 10),
        isAdmin: true
    },

]

export default users