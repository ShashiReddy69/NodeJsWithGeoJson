// Controller/userData.js
// userController || logic 
const userModel=require('../Model/user');
// signup user data here
exports.usersData=(req,res)=>{
    console.log(req.body)
    const name=req.body.name;
    const mobileNumber=req.body.mobileNumber;
    const email=req.body.email;
    const address={
        street:req.body.address.street,
        locality:req.body.address.locality,
        city:req.body.address.city,
        state:req.body.address.state,
        pincode:req.body.address.pincode,
        CoordinatesType:{
            type:req.body.address.CoordinatesType.type,
            coordinates:req.body.address.CoordinatesType.coordinates
        }
    }
    console.log("hello",address)
    const userSignUp=new userModel({
        name:name,
        mobileNumber:mobileNumber,
        email:email,
        "address.street":address.street,
        "address.locality":address.locality,
        "address.city":address.city,
        "address.state":address.state,
        "address.pincode":address.pincode,
        "address.CoordinatesType.type":address.CoordinatesType.type,
        "address.CoordinatesType.coordinates":address.CoordinatesType.coordinates
    })
    console.log("hi",userSignUp)
  userSignUp.save().then(result=>{
    res.status(200).json({
        message:"data created successfully",
        Data:result
    })
}).catch(error=>{
    res.status(500).json({
        message:error
    })
    console.log(error)
})
}
// get users data with pagination
exports.getUsersData=(req,res)=>{
  const limit=req.params.limit ? parseInt(req.params.limit) : 10;
// if you want to skip then uncomment below line
 // const skip=req.params.skip ? parseInt(req.params.skip): 1;
  //  userModel.find().sort({createdAt:'asc'}).limit(limit).skip((skip-1)*limit).then(result=>{
     userModel.find().sort({createdAt:'asc'}).limit(limit).then(result=>{
        res.status(200).json({
            message:"data fetched successfully",
            Data:result
        })
    }).catch(error=>{
        res.status(500).json({
            message:error
        })
        console.log(error)
    })
}
// sort by coordinates
// exports.getDataByParams=(req,res)=>{
//     const point={
//         type:"Point",
//         coordinates:[parseFloat(req.params.longitude),parseFloat(req.params.latitude)]
//     };
//     console.log("point",point)
//     const payload={
//                 $geoNear:{
//                     near:point,
//                     spherical:true,
//                     distanceField:"dist.calculated",
//                     maxDistance:10,
//                     includeLocs:"dist.location"
//                 }
//     };
//     console.log("payload",payload)
//     userModel.find(payload).then(result=>{
//                 res.status(200).json({
//                     message:"fetched successfully",
//                     Data:result
//                 })
//             }).catch(err=>{
//                 res.status(500).json({
//                     message:err
//                 })
//             })
// }
// sort by coordinates with another example
exports.getDataByParams=(req,res)=>{
    var maxDistance=2;
    maxDistance/=6371;
    // var coords=[];
    // coords[0]=req.params.longitude;
    // coords[1]=req.params.latitude;
      // const payload={
    //     "address.CoordinatesType.coordinates":{
    //         $geoNear:{
    //         $near:{type:"Point",coordinates:[longitude,latitude]},
    //         $maxDistance:maxDistance,
    //         spherical:true
    //     }
    // }
    // }
    // const payload={
    //     "address.CoordinatesType.coordinates":{
    //         $geoWithin:{
    //        $centerSphere:[[longitude,latitude],maxDistance]
           
    //     }
    // }
    // }
    // coordinates from params
    //const longitude=req.params.longitude;
    //const latitude=req.params.latitude;
    // coordinates from body
    const longitude=req.body.longitude;
    const latitude=req.body.latitude;
    const payload={
        "address.CoordinatesType.coordinates":{
            $nearSphere: {
                $geometry: {
                   type : "Point",
                   coordinates : [ longitude, latitude ]
                },
                $maxDistance: maxDistance
             }
           
        }
    }

    console.log(payload)
    userModel.find(payload).then(result=>{
        res.status(200).json({
            message:"fetched successfully",
            Data:result
        })
    }).catch(err=>{
        res.status(500).json({
            message:err
        })
    })
}
// update user data by id
exports.updateDataById=(req,res)=>{
    const id=req.params.id;
    const update={
         name:req.body.name,
         mobileNumber:req.body.mobileNumber,
         email:req.body.email,
         street:req.body.address.street,
         "address.locality":req.body.address.locality,
         "address.city":req.body.address.city,
         "address.state":req.body.address.state,
         "address.pincode":req.body.address.pincode,
         "address.CoordinatesType.type":req.body.address.CoordinatesType.type,
         "address.CoordinatesType.coordinates":req.body.address.CoordinatesType.coordinates
    }
    userModel.updateOne({_id:id},update,{returnOriginal:false}).then(result=>{
        res.status(200).json({
            message:"updated successfully",
            Data:result
        })
    }).catch(error=>{
        res.status(500).json({
            message:error
        })
        console.log(error)
    })
}
 // delete data by id
exports.deleteData=(req,res)=>{
    const id=req.params.id;
    userModel.findByIdAndDelete({_id:id}).then(result=>{
        res.status(200).json({
            message:"deleted successfully",
            Data:result
        })
    }).catch(error=>{
        res.status(500).json({
            message:error
        })
        console.log(error)
    })
}
