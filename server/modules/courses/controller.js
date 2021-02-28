const list = async(req, res)=>{
    try{
        const { page=1, limit=10 ,sort={}} = req.body;
        const options = {
            page: page || 1,
            limit: limit || 10,
            sort
        };

        let filter ={};
        let data =await global.courses.getAll(options);
        res.send(data);
    }catch(e){
        res.sendError({
            message:JSON.stringify(e)
        })
    }
};

const create = async (req,res) =>{
    try{
        let { body: json } = req;
        json.createdAt= new Date();

        let resp = await global.courses.create(json);

        res.send({message:"Successfully added course record"});
    }catch(e){
        res.sendError({
            message: "failed to insert course record"
        })
    }
};

const update = async (req, res)=>{
    try{
        let { body } = req;
        let resp = await global.courses.update(body);
        
        res.send({message:"successfully updated the record"});

    }catch(e){
        res.sendError({
            message:"failed to update the record"
        })
    }
};

const remove = async (req,res)=>{
    try{
        let { id } = req.body;
        let resp = await global.courses.delete(id);
        res.send({message:"successfully deleted the record"});
    }catch(e){
        res.sendError({
            message:"failed to delete the record"
        })
    }
};

module.exports ={
    create,
    list,
    update,
    remove
}