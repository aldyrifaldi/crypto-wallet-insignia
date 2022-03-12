const {PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    store: async (req,res) => {
            const userTarget = await prisma.User.findUnique({
                where: { username: req.body.to_username },
            })
            
            if (userTarget == null)
            return res.status(404).json({
                status: "not found",
                message: "Destination user not found"
            })
            

            if (parseInt(req.body.amount) <= 0) 
            return res.status(400).json({
                status: "bad request",
                message: "Invalid topup amount"
            })
            

            const user = await prisma.User.findUnique({
                where: {
                    id: req.user.id
                },
                include: {
                    balance: true
                }
            })

            if (parseInt(user.balance.balance) == 0 || parseInt(user.balance.balance) <= parseInt(req.body.amount))
            return res.status(400).json({
                status: "bad request",
                message: "Insufficient balance"
            })
            
            await prisma.User.update({
                where: {
                    id: user.id
                },
                data: {
                    balance: {
                        update: {
                            balance: {
                                decrement: req.body.amount
                            }
                        }
                    },
                    transfers: {
                        create: [
                            {
                                amount: req.body.amount,
                                status: "SETTLEMENT"
                            }
                        ]
                    }
                }
            })

            await prisma.User.update({
                where: {
                    id: userTarget.id
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
            
            await prisma.balanceLog.createMany({
                data: [
                    {
                        userId: user.id,
                        status: "CREDIT",
                        amount: req.body.amount
                    },
                    {
                        userId: userTarget.id,
                        status: "DEBIT",
                        amount: req.body.amount
                    },
                ] 
            })
            
            return res.status(204).json({
                status: "success"
            })
    }
}