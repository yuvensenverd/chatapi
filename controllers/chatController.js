var db = require('../database')

module.exports = {
    getMessages: (req,res) => {
        var sql = `select u.username, m.message from user u join message m on u.userid = m.userid 
        join chat c on c.chatid = m.chatid where c.chatid = ${req.query.chatid}`
        
        db.query(sql, (err,results)=>{
            if(err){
                throw err
            } 

            res.status(200).send(results)
        })
    },
    sendMessage: (req,res) => {
        
        var sql = `insert into message set ?`
        
        
        
    
        db.query(sql,req.body, (err,results)=>{
            if(err){
                throw err
            } 
         
            var sql = `select u.username, m.message from user u join message m on u.userid = m.userid 
            join chat c on c.chatid = m.chatid where c.chatid = ${req.body.chatid} order by m.id desc limit 1`
            db.query(sql, (err,results2)=>{
                if(err){
                    throw err
                } 
                console.log(results2)
                req.app.io.emit(`chat no ${req.body.chatid}`, {type : req.body.chatid, result : results2[0]})
           
                res.status(200).send(results)
            })

            
            
        })
        //

       
    },
    clearMessages: (req,res) => {
        
        var sql =  `delete from message where chatid = ${req.query.chatid}`
        db.query(sql, (err,results)=>{
            if(err){
                throw err
            } 

            req.app.io.emit(`chat no ${req.query.chatid}`, {type : req.query.chatid, result : 'clear'})
            res.status(200).send({ message: 'Clear Messages Success'})
        })
        
        
    },
    getChannel : (req,res)=>{
        var sql = `select u.username, u.userid, c.chatid, c.chatname, uc.id from user u join userchat uc on uc.userid = u.userid
        join chat c on uc.chatid = c.chatid where u.userid = ${req.query.userid}`
        
        db.query(sql, (err,results)=>{
            if(err){
                throw err
            } 

            res.status(200).send(results)
        })
    }
}

// getReviews : (req, res)=>{
//     var sql = `select u.username, r.rating,r.productid, r.description from review r
//      join user u on r.userid = u.userid where r.productid = ${req.params.id} order by r.id desc limit 5`
//     db.query(sql, (err,results)=>{
//         if(err) throw err;
//         // console.log(results) // ARR OF OBJ
//         res.status(200).send(results)
//     })

// }