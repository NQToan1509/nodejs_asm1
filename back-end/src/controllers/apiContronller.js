const typeMoviesId= require('../models/genrelist')

const moviesList=require('../models/movieList')

const videoMovie=require('../models/videoList')

exports.getTrendingPage=(req,res,next)=>{
    const page=req.query.page?req.query.page:1
    moviesList.getTrending(page,(movie,total)=>{
        res.json({
            results: movie,
            page:page,
            total_page:total
        })
    })

}

exports.getTopRatePage=(req,res,next)=>{
    const page=req.query.page?req.query.page:1
    moviesList.getTopRate(page,(movie,total)=>{
        res.json({
            results: movie,
            page:page,
            total_page:total,
        })
    })

}

exports.getDiscover=(req,res,next)=>{
    const page=req.query.page
    const genreId=req.query.genreId
   
    if(!genreId){  res.status(400).json({code:400,message:"Not found gerne parram"})}
    else{
        moviesList.getDiscover(page,parseInt(genreId),(movie,total,err)=>{
            if(!err){
                res.json({
                    results: movie,
                    page:!page?1:page,
                    total_page:total,
                    genre_name:typeMoviesId.getDiscoverName(parseInt( genreId))
                })
            }else{
                res.status(400).json({code:400,message:"Not found that gerne id"})
            }
        }) 
    }
  
}



exports.getVideo=(req,res,next)=>{
    const id=req.query.film_Id
    console.log(id,'id')
    if(id){
    videoMovie.getVideoId(id,(videoMovie)=>{
        if(videoMovie.length>0){
            res.send(videoMovie)
        }else{
            res.status(404).json({code:404,message:"Not found video"})
        }
    })
    }else{
        res.status(400).json({code:400, message:"Not found film_id parram"})
    }

}


exports.getSearch =(req,res,next)=>{
    const page=req.body.page? req.body.page:1
    const keySearch=req.body.keyword
    const mediaType=req.body.mediaType
    const language=req.body.language
    const year=req.body.year

    if(keySearch){
        moviesList.getSearch(keySearch,page,mediaType,language,year,(movie,total)=>{
            res.send({
                results: movie,
                page:page,
                total_page:total,
            })
        })
    }

}



exports.get404=(req,res,next)=>{
    res.status(401).json({message:'route not found'})
}

