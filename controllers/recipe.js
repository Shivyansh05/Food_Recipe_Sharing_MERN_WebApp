import {Recipe} from '../Models/Recipe.js'
import {SavedRecipe} from '../Models/SavedRecipe.js'

export const deleterec=async(req,res)=>{
  const {id}=req.body;
  try{
   const del = await SavedRecipe.deleteOne({recipe:id});
  if(del){
    console.log(del)
  }
  const delrec = await Recipe.deleteOne({_id:id})
  console.log(delrec)
  } catch(err){
   console.log(err)
  }
  res.json(id)
}

export const editrec=async(req,res)=>{
  const {ing,ins,id}=req.body;
  try{
  const editt = await Recipe.findByIdAndUpdate(id,{ingrediants: ing,instructions: ins},{new:true})
  if(editt) console.log(editt)
  } catch(err){
    res.json(err)
  }
  res.json(id)
}

export const add = async (req,res)=>{
    const { title,ingrediants,instructions,imgurl } =
      req.body;
      
      try {
        const recipe = await Recipe.create({
          title,
          ingrediants,
          instructions,
          imgurl,
          user: req.user,
        });
       
        res.json({message:"Recipe Created Successfully..!",recipe})
      } catch (error) {
        res.json({message:error})
      }
} 


export const getAllRecipe = async (req,res) =>{
    const recipe = await Recipe.find();
    res.json({recipe}) 
}


export const getRecipeById = async (req,res)=>{
    const id = req.params.id
    try { 
        let recipe = await Recipe.findById(id)

        if(!recipe) res.json({message:'recipe not exist'})

        res.json({message:"recipe by id", recipe})
        
    } catch (error) {
        res.json({message:error})
    }
}

export const getRecipeByUserId = async (req,res) =>{
 const userId = req.params.id;
 try {
   let recipe = await Recipe.find({user:userId});

   if (!recipe) res.json({ message: "recipe not exist" });

   res.json({ message: "recipe by userId", recipe });
 } catch (error) {
   res.json({ message: error });
 }
}

export const savedRecipeById = async (req,res) =>{
    const id = req.params.id

    let recipe = await SavedRecipe.findOne({recipe:id})

    if(recipe) return res.json({message:"recipe already saved"})

    recipe = await SavedRecipe.create({recipe:id})
    
    res.json({message:"Recipe saved Successfully..!"})
}

export const getSavedRecipe  = async (req,res) =>{
    const recipe = await SavedRecipe.find()
    res.json({recipe})
}