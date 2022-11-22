import {DataTypes, Model} from 'sequelize';
import {db} from '../config/index'


export interface FoodAttributes{
    id:string;
    name:string;
    description:string;
    category:string;
    foodType:string;
    readyTime:number;
    price:number;
    rating:number;
    vendorId:string;
   
   
    
  
   
   
}

export class FoodInstance extends Model<FoodAttributes>{}

FoodInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    category:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    foodType:{
        type:DataTypes.STRING,
        allowNull:false,
       
    },
    readyTime:{
        type:DataTypes.NUMBER,
        allowNull:true
    },
   price:{
        type:DataTypes.NUMBER,
        allowNull:true
    },
    rating:{
        type:DataTypes.NUMBER,
        allowNull:true
    },
    vendorId:{
        type:DataTypes.UUIDV4,
        allowNull:false,
       
    }

},
{
    sequelize:db,
    tableName:'food'
})