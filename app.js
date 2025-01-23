const express=require("express")
const app=express()
app.use(express.json())
const mongoose=require('mongoose')
const PORT=8000
const mongourl="mongodb://localhost:27017/Mongo"
const { v4: uuidv4 } = require('uuid');

mongoose
.connect("mongodb+srv://saranyasundar1111:hoE01AuUx35CWN70@cluster0.kwuvk.mongodb.net/Mongo")
.then(()=>{
    console.log("Db connected")
    app.listen(PORT,()=>{
        console.log("My server is running")
    })
})

const expenseSchema=new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true}
});

const expenseModal= mongoose.model("expense-tracker",expenseSchema);//clname,schema name

app.post("/api/expenses",async(req,res)=>
{
    const {title,amount}=req.body;
    const newExpense=new expenseModal({
        id:uuidv4(),
        title:title,
        amount:amount
    });
    const savedExpense=await newExpense.save();
    res.status(200).json(savedExpense);
});

app.get("/api/expenses",async(req,res)=>
            {
                
            
                    const result= await expenseModal.find({})
                    res.json(result);
                });
app.get("/api/expensesById/:id",async(req,res)=>
 {
    const {id}=req.params ;
        const result= await expenseModal.findOne({id});
        res.json(result);
    
 });

 

 /*app.get("/api/expensesBytitle/:title",async(req,res)=>
{
    const {title}=req.params;

        const result= await expenseModal.findOne({title});
        res.json(result);
    
}) */

app.put("/api/expensesUpdate/:id",async(req,res)=>
{
    const {id}= req.params;
    const{title,amount}=req.body;
    const updatedExpense = await expenseModal.findOneAndUpdate(
       {id:id},
       {title:title,
        amount:amount
       }
       
    );
    res.status(200).json(updatedExpense);
})

app.delete("/api/expensesDel/:id",async(req,res)=>
    {
       const {id}=req.params ;
           const result= await expenseModal.deleteOne({id});
           res.json(result);
       
    });
                 
                           
   
                     
                
            