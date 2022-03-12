const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


module.exports = {
    topTransactionUserByValue: async (req,res) => {
        const users = await prisma.user.findMany({
            include: {
                balanceLogs: true,
                transfers: true,
                balance: true,
            }
        })

        const usersSumBalanceLogs = users.map((user,index) => {

            // sum debit balance from user balanceLogs
            balanceDebit = 0
            user.balanceLogs.map((balanceLog,i) => {
                if (balanceLog.status == "DEBIT") {
                    balanceDebit += parseInt(balanceLog.amount)
                }
            })

            return {
                username: user.username, 
                transacted_value: balanceDebit, 
                balanceLogs: user.balanceLogs,
                transfers: user.transfers,
                balance: user.balance
            }
        })

        
        const data =  usersSumBalanceLogs.sort((a,b) => { // sort user by transaction
            return b.transacted_value - a.transacted_value 
        }).slice(0,10) // limit data return only 10 records

        return res.status(200).json({
            status: "success",
            data
        })
    },

    topTransactionsPerUser: async(req,res) => {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id, 
            },
            include: {
                balanceLogs: true,
                transfers: true,
                balance: true,
            }
        })


        const usersSumBalanceLogs = user.balanceLogs.map((balanceLog,i) => {
            if (balanceLog.status == "DEBIT") {
                // convert amount value of debit from positive to negative
                return {
                    username: user.username,
                    amount: - parseInt(balanceLog.amount),
                    status: balanceLog.status
                }
            }
            else {
                return {
                    username: user.username,
                    amount: parseInt(balanceLog.amount),
                    status: balanceLog.status
                }
            }
        })

        
        const data =  usersSumBalanceLogs.sort((a,b) => { // sort user by transaction
            
            return Math.abs(b.amount) - Math.abs(a.amount) // Math.abs use for convert from negative number to postive number 
        }).slice(0,10) // limit data return only 10 records

        return res.status(200).json({
            status: "success",
            data
        })
    }
    
}