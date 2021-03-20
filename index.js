const mysql=require('mysql')
const express=require('express')
var app=express();
const bodyparser=require('body-parser')
app.use(bodyparser.json());
var mysqlconnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',//enter the password 
    database:'employedb',
    multipleStatements:true
})
mysqlconnection.connect((err)=>{
    if(!err)
    console.log('Db connected ')
    else
    console.log('Db not connected'+ JSON.stringify(err))
})
app.listen(3000,()=>{
    console.log('server is runnning')
})
app.get('/',(req,res)=>{
    res.send('Hello')
})
app.get('/employes',(req,res)=>{
    mysqlconnection.query('select * from employee',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err)
    })
})
//get employee by particular id
app.get('/employes/:id',(req,res)=>{
    mysqlconnection.query('select * from employee where employeid=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err)
    })
})
//delete employee by particular id
app.delete('/employes/:id',(req,res)=>{
    mysqlconnection.query('delete from employee where employeid=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted successfully');
        else
        console.log(err)
    })
})
//insert an  employee by particular id
app.post('/employes',(req,res)=>{
    let emp=req.body;
    var sql="set @employeid=?;set @name=?;set @rollno=?;set @employeecode=?;\
    call employeaddoredit(@employeid,@name,@rollno,@employeecode);";
    mysqlconnection.query(sql,[emp.employeid,emp.name,emp.rollno,emp.employeecode],(err,rows,fields)=>{
        if(!err)
    {
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send("inserted employeid :"+element[0].employeid) // there is some error in posting employeid next time i havr to solve this.
        });
    }
        else
        console.log(err)
    })
})

//update an  employee by particular id
app.put('/employes',(req,res)=>{
    let emp=req.body;
    var sql="set @employeid=?;set @name=?;set @rollno=?;set @employeecode=?;\
    call employeaddoredit(@employeid,@name,@rollno,@employeecode);";
    mysqlconnection.query(sql,[emp.employeid,emp.name,emp.rollno,emp.employeecode],(err,rows,fields)=>{
        if(!err)
    {
        res.send('updated successfully')
    }
        else
        console.log(err)
    })
})

