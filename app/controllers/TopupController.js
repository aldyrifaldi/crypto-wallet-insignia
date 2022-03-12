const {PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    store: async (req,res) => {
        try {
            if (parseInt(req.body.amount) <= 0) 
            return res.status(400).json({
                status: "bad request",
                message: "Invalid topup amount"
            })

            if (parseInt(req.body.amount) >= 10000000)
            return res.status(400).json({
                status: "bad request",
                message: "amount must less then 10000000 are allowed"
            })

            const user = await prisma.User.update({
                where: {
                    id: req.user.id
                },
                data: {
                    balance: {
                        update: {
                            balance: {
                                increment: req.body.amount
                            }
                        } 
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
            
            return res.status(204).json()
        } catch (error) {
            return res.json({
                status: "error",
                errors: error
            })
        }
    }
}