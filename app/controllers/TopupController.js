const {PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    store: async (req,res) => {
        try {
            const user = await prisma.User.update({
                where: {
                    id: req.user.id
                },
                data: {
                    balance: {
                        increment: req.body.amount
                    } 
                }
            })   

            await prisma.balanceLog.create({
                data: {
                    userId: user.id,
                    status: "DEBIT",
                    amount: req.body.amount
                }
            })
            
            return res.json({
                status: "success",
                data: user
            })
        } catch (error) {
            return res.json({
                status: "error",
                errors: error
            })
        }
    }
}