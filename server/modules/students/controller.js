const { Students } = require("../../models");

const list = async(req, res)=>{
    try{
        const { page=1, limit=10 ,sort={}} = req.body;
        const options = {
            page: page || 1,
            limit: limit || 10,
            sort
        };

        let filter ={};
     let data =await Students.paginate(filter,options);
     res.send(data);
    }catch(e){
        res.status(500).json({
            message:JSON.stringify(e)
        })
    }
};

const create = async (req,res) =>{
    try{
        
        let { body } = req;
        let resp = await Students.create(body);

        res.json({message:"Successfully added student record"});
    }catch(e){
        res.status(500).json({
            message: "failed to insert student record"
        })
    }
};

const update = async (req, res)=>{
    try{
        let { id } = req.params;
        let { body } = req;
        let resp = await Students.updateOne({_id: id},{
            $set:{
                ...body
            }
        });
        
        res.json({message:"successfully updated the record"});

    }catch(e){
        res.status(500).json({
            message:"failed to update the record"
        })
    }
};

const remove = async (req,res)=>{
    try{
        let { id } = req.params;
        let resp = await Students.remove({_id: id});
        res.json({message:"successfully deleted the record"});
    }catch(e){
        res.status(500).json({
            message:"failed to delete the record"
        })
    }
};

module.exports={
    list,
    create,
    update,
    remove
};
