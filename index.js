var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")
var path = require('path')

const app=express()

app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connecting to Database"))
db.once('open',()=> console.log("connected to database"))

app.post("/sign_up",(req,res)=> {
    var name=req.body.name
    var email=req.body.email
    var password=req.body.password

    var data={
        "name":name,
        "email":email,
        "password":password
        }
        db.collection('users').insertOne(data,(error,collection) => {
            if(error){
                throw error;
            }
            console.log("Record Inserted Successfully")
        // })
        // return res.redirect('signup_successful.html')
        console.log(__dirname);
        return res.sendFile(path.join(__dirname+'/signup_successful.html'))
           })
})
const port=3001
app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    // return res.redirect('index.html')
    return res.sendFile(path.join(__dirname,'/index.html'));
})
app.listen(port, () =>{

console.log(`Listening on port ${port}`)

})