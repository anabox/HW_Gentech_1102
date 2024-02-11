//вывести две случайных eur-транзакции

db.txs.aggregate([
    { $match: { currency: /eur/i } },
    { $sample: { size: 2 } }
])

//вывести юзеров, которые не отправляли средства (не делали транзакции)

db.clients.find({
  _id: { $nin: db.txs.distinct("sender_id") }
})

//вывести сумму отправленных EUR-транзакций для каждого юзера

db.txs.aggregate([
    {
        $match: {
            currency: /eur/i
        }
    },
    {
        $group: {
            _id: '$sender_id', // поле группировки
            sum_balance: { $sum: '$amount' }
        }
    }
    
])