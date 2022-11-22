import {DataTypes, Model} from 'sequelize';
import {db} from '../config/index'
import { FoodInstance } from './foodModel';


export interface VendorAttributes{
    id:string;
    name:string;
    ownerName:string;
    pincode:string;
    phone:string;
    address:string;
    email:string;
    password:string;
    salt:string;
    serviceAvailable:boolean;
    rating:number;
    role:string;
   
    
  
   
   
}

export class VendorInstance extends Model<VendorAttributes>{}

VendorInstance.init({
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
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:"Email address is required"
            },
            isEmail:{
                msg:"Please provide a valid email"
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"password is required"
            },
            notEmpty:{
                msg:"provide a password"
            }
        }
    },
    ownerName:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    serviceAvailable:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
    },
    salt:{
        type:DataTypes.STRING,
        allowNull:false,
       
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Phone number is required"
            },
            notEmpty:{
                msg:"Provide a phone number"
            }
        }
    },
    
   pincode:{
        type:DataTypes.STRING,
        allowNull:true
    },
    rating:{
        type:DataTypes.NUMBER,
        allowNull:true
    },
   
    role:{
        type:DataTypes.STRING,
        allowNull:true, 
    }

},
{
    sequelize:db,
    tableName:'vendor'
});

VendorInstance.hasMany(FoodInstance,{foreignKey:'vendorId',as: 'food'});
FoodInstance.belongsTo(VendorInstance,{foreignKey:'vendorId',as: 'vendor'});