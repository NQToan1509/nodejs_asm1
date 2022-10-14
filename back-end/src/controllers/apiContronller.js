const typeMoviesId= require('../models/genrelist')

const moviesList=require('../models/movieList')

const videoMovie=require('../models/videoList')




exports.getTrending=(req,res,next)=>{
    console.log('page')
    res.redirect('/api/movies/trending/1')
}

exports.getTrendingPage=(req,res,next)=>{
const page=req.params.page
console.log(page)
moviesList.getTrending(page,(movie,total)=>{
    res.send({
        results: movie,
        page:page,
        total_page:total
    })
})
next()
}


exports.getTopRate=(req,res,next)=>{
    res.redirect('/api/movies/top-rate/1')
}

exports.getTopRatePage=(req,res,next)=>{
const page=req.params.page
moviesList.getTopRate(page,(movie,total)=>{
    res.send({
        results: movie,
        page:page,
        total_page:total,
    })
})
next()
}

exports.getDiscover=(req,res,next)=>{
    const page=req.query.page
    const genreId=req.query.genreId
    console.log(page, genreId)
    if(!genreId){  res.status(400).json({code:400,message:"Not found gerne parram"})}
    else{
    moviesList.getDiscover(page,parseInt(genreId),(movie,total,err)=>{
        console.log(movie,err)
        if(!err){
            res.send({
            results: movie,
            page:!page?1:page,
            total_page:total,
            genre_name:typeMoviesId.getDiscoverName(parseInt( genreId))
        })
        }else{
            res.status(400).send({code:400,message:"Not found that gerne id"})
        }
    }) }
    next()
}



exports.getVideo=(req,res,next)=>{
    const id=req.body.film_Id
    console.log(id)
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
if(keySearch){
    moviesList.getSearch(keySearch,page,(movie,total)=>{
        res.send({
            results: movie,
            page:page,
            total_page:total,
        })
    })
}

}