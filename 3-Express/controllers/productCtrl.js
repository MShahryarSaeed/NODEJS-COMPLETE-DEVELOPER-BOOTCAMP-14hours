const ProductClass=require("../models/product.model");

const GetAllProducts=(req,res)=>{

    const AllProducts=ProductClass.findAll();

    

    res.status(200).json({
        status:"All Products",
        products:AllProducts
    })

}

const AddProduct=async(req,res)=>{

    const product=new ProductClass(req.body.name,req.body.price); //calling class in our product.model.js File

    try{
      await  product.save();
    }catch(error){
        res.status(500).json({
            status:"Internal Server Error"
        })
    }

    res.status(201).json({
        status:"Success",
        message:"Product Added Successfully",
        product:product
    })

}

const DeleteProduct=async(req,res)=>{

    const{productId}=req.params;

    let result;

    try{
        result=await ProductClass.deleteOne(+productId);
    }catch(error){
        res.status(500).json({
            status:"Internal Server Error"
        })
    }

    res.status(200).json({
        status:"Product Deleted SuccessFully",
        product:result
    })

}

module.exports={GetAllProducts,AddProduct,DeleteProduct};