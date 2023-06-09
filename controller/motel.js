import {Campground}  from '../models/campground.js'
import {Review} from '../models/review.js'
import bodyParser  from 'body-parser';
import CatchAsync from '../utils/CatchAsync.js';
import ExpressError from '../utils/ExpressError.js';


export const homeController =async (req,res)=>{
    const motels=await Campground.find();
    res.render("home",{motels})
}


export const addMotelController= (req,res)=>{
    res.render('addMotel')}

export const addMotelPostController= CatchAsync(async(req,res)=>{
        const motel= await new Campground({
        title:req.body.name,
        price:req.body.price
    }).save();
    res.redirect('/')
})

export const showController=  async (req,res)=>{
    const id=req.params.id;
    const motel=await Campground.findById(id).populate('review');
     
   res.render('show',{motel,id});
}

export const editController= async (req,res)=>{
    const id=req.params.id;
    const motel=await Campground.findById(id);
    
    res.render('edit',{motel}); 
}

export const editPostController= async (req,res)=>{
    const id=req.params.id;
    const motel=await Campground.findByIdAndUpdate(id,{title:req.body.title, location:req.body.loc})
    res.redirect("/")
}

export const deleteController=async (req,res)=>{
    const id=req.params.id;
   const a=  await  Campground.findByIdAndDelete(id);
     console.log(`Deleted motel with id ${id}`);
     res.redirect("/")
}

