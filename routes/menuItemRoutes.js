const express = require('express');
const router = express.Router();

const MenuItem  = require('./../models/MenuItem'); 

// POST route to add a menu
router.post('/',async (req,res)=>{
  try{

    const data = req.body // Assuming the request body contains the menu data
    // Create a new menu document using the Mongoose model
    const newMenuItem = new MenuItem(data);
    // Save the new person to the database
    const response = await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response);

  }catch(err){

    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

  }
 
})

// GET Method to get the menu
router.get('/',async (req,res)=>{
try{

    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);

}catch(err){

    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    
}
})

router.get('/:tasteType',async (req,res)=>{
    try{
      const tasteType = req.params.tasteType;
      if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
        const response = await MenuItem.find({taste:tasteType});
        console.log('response fetched');
        res.status(200).json(response);
        
      }else{
        res.status(404).json({error:'Invalid taste type'})
      }
    }catch(err){
      onsole.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
})

router.put('/:id',async (req,res)=>{
  try{
    const menuItemId = req.params.id;
    const updatedMenuItemData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuItemId,updatedMenuItemData,{
      new:true,
      runValidators:true
    });

    if(!response){
      return res.status(404).json({error:'Menu item not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
    
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

router.delete('/:id',async (req,res)=>{
try{

  const menuItemId = req.params.id;
  const response = await MenuItem.findByIdAndDelete(menuItemId);

  if(!response){
    return res.status(404).json({error:'Menu item not found'});
  }

  console.log('data delete');
  res.status(200).json({message:'Menu item deleted successfully'});
  
}catch(err){
  console.log(err);
  res.status(500).json({error:'Internal Server Error'});
}
})
// Comment Added
module.exports = router;