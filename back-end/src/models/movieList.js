 var fs =require('fs')
 const path = require('path')
 const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'movieList.json'
  );
 
 const movies = {
	all: function() {
		return JSON.parse(fs.readFileSync(p,
			(err, fileContent) => {
			if (err) {
			  cb([]);
			} else {
			  cb(JSON.parse(fileContent));
			}
		  }));
	},
}

module.exports= {
	getTrending:(page,cb)=>{
	const movietrending = movies
				.all()
				.sort((a,b)=>b.popularity-a.popularity)
				.slice((page-1)*20,(page-1)*20+20)
	cb(movietrending,Math.floor(movies.all().length/20))
	},

	getTopRate:(page,cb)=>{
		const movieTopRate = movies
					.all()
					.sort((a,b)=>b.vote_average-a.vote_average)
					.slice((page-1)*20,(page-1)*20+20)
		cb(movieTopRate,Math.floor(movies.all().length/20))
	},

	getDiscover:(page,genreId,cb)=>{
		// console.log(page,genreId)
		const movieDiscover = movies
					.all()
					.filter((item)=>{ return item.genre_ids? item.genre_ids.includes( genreId):false})
			if(movieDiscover.length>0){
				const movie=movieDiscover.slice(((!page ?1:page)-1)*20,((!page?1:page)-1)*20+20)
				cb(movie,Math.floor(movieDiscover.length/20),0)
			}else{
				cb(movieDiscover,Math.floor(movies.all().length/20),1)
			}	
					
	},

	getSearch:(keysearch,page,cb)=>{
		const movieSearch= 
			movies
				.all()
				.filter((item)=>{ 
					if(item.title){
						return item.overview.toLowerCase().search(keysearch.toLowerCase())>0 || item.overview.toLowerCase().search(keysearch.toLowerCase())>0
					}else if(item.overview ){
					return item.overview.toLowerCase().search(keysearch.toLowerCase())>0
					}
				} )
				
		const movie= movieSearch.slice((page-1)*20,(page-1)*20+20)
		cb(movie,Math.floor(movieSearch.length/20))
			}			
	}
