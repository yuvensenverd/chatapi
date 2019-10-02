var db = require('../database')

module.exports = {
   loginUser : (req,res) =>{
    var sql = `select userid, username, password from user where username = '${req.body.username}' AND password = '${req.body.password}'`
    db.query(sql, (err,results)=>{
        if(err){
            throw err
        } 
        if(results.length === 0){
            return res.status(500).send({status : 'error', err : 'USERNAME OR PASSWORD INCORRECT'})
        }
   
        res.status(200).send(results)
    })
   },
   registerUser : (req,res) =>{
       console.log(req.body)
       var sql = `select * from user where username = '${req.body.username}' AND email = '${req.body.email}' AND isfacebook = 1`
       db.query(sql,req.body, (err,results)=>{
        if(err){
            throw err
        } 
        if(results.length === 0){
             sql = `insert into user set ?`
            db.query(sql,req.body, (err,results)=>{
                if(err){
                    throw err
                } 
                // SUKSES REGISTER
                sql = `select * from user where username = '${req.body.username}' AND email = '${req.body.email}' AND isfacebook = 1`
                db.query(sql, (err,results3)=>{

                    res.status(200).send(results3)
                })
        
          
                })
        }else{
            // UDHA LOGIN
            res.status(200).send(results)
        }
       
   
        
        }
    )
   }
}
