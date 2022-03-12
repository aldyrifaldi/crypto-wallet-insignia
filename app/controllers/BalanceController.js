const {PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    index: async (req,res) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.user.id
                },
                include: {
                    balance: true
                }
            })

            return res.json({
                status: "success",
                data: {
                    balance: user.balance.balance
                }
            })
        } catch (error) {
            return res.json({
                status: "error",
                errors: error
            })
        }
    }
}