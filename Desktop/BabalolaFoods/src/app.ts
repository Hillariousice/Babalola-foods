import express,{Request,Response} from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users';
import indexRouter from './routes/index';
import{db} from './config/index'
import adminRouter from './routes/admin'
import vendorRouter from './routes/vendor'


//Sequelize connection
db.sync().then(()=>{
    console.log("DB connected successfully")
}).catch(err=>{console.log(err)})


const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser())



//Router middleware
app.use('/',indexRouter)
app.use('/users',userRouter)
app.use('/admins',adminRouter)
app.use('/vendors',vendorRouter)
 
// app.get('/about',(req:Request,res:Response)=>{
//     res.status(200).json({
//         message:'Success'
//     })
// })


const port = 4000;
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})

export default app;



