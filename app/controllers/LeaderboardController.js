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

            // sum credit balance from user balanceLogs
            balanceCredit = 0
            user.balanceLogs.map((balanceLog,i) => {
                if (balanceLog.status == "CREDIT") {
                    balanceCredit += parseInt(balanceLog.amount)
                }
            })

            return {
                username: user.username, 
                amount: balanceCredit - balanceDebit, 
                transactions: user.balanceLogs,
            }
        })

        
        const data =  usersSumBalanceLogs.sort((a,b) => { // sort user by transaction
            return b.amount - a.amount 
        }).slice(0,10) // limit data return only 10 records

        return res.status(200).json({
            status: "success",
            data
        })
    }
    
}