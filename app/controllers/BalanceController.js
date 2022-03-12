const {PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    index: async (req,res) => {
        try {
            const balance = await prisma.Balance.findUnique({
                where: {
                    userId: req.user.id
                },
            })

            return res.json({
                status: "success",
                data: {
                    balance: balance.balance
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