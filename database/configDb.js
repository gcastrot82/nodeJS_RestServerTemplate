const mongoose = require('mongoose');


const dbConecction = async() =>{

    try{

        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex:true,
            // useFindAndModify:false
        });


        console.log('base de Datos online')

    }catch(error){
        console.log(error);
        
        throw new Error('Error al iniciar la BD');
    }


}



module.exports = {
    dbConecction
}