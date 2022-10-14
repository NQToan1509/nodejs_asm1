 var fs =require('fs')
 const path = require('path')
 const p = path.join(
	path.dirname(process.mainModule.filename),
	'src',
	'data',
	'movieList.json'
  );
  const p2 = path.join(
	path.dirname(process.mainModule.filename),
	'src',
	'data',
	'mediaTypeList.json'
  );
  const moviesType = {
	all: function() {
		return JSON.parse(fs.readFileSync(p2,
			(err, fileContent) => {
			if (err) {
			  cb([]);
			} else {
			  cb(JSON.parse(fileContent));
			}
		  }));
	},
}
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


const filterSearch=(movies, mediaType,language,year)=>{
	let movie=movies
	const  movieSearchMediaType=
		mediaType
		?moviesType.all().includes(mediaType.toLowerCase()) && mediaType.toLowerCase()== 'all'
			? movie.filter((item)=>item.media_type===mediaType)
			:movie
		:movie

	const movieSearchLanguage= 
		language
		?language.toLowerCase()=="en-us" || language.toLowerCase()=="jp"|| language.toLowerCase()==="kr"
			? language.toLowerCase()=="en-us"
				?movieSearchMediaType.filter((item)=>item.origin_country?item.origin_country[0].toLowerCase()==='us':false)
				:movieSearchMediaType.filter((item)=>item.origin_country && item.origin_country.length>0 ?item.origin_country[0].toLowerCase()===language.toLowerCase():false)
			:movieSearchMediaType
		:movieSearchMediaType

	const movieSearchYear= 
		year
			? movieSearchLanguage.filter((item)=>{
				const d= new Date(item.first_air_date)
				const yearItem= d.getFullYear()
				return yearItem===parseInt(year)
			})
			: movieSearchLanguage

return movieSearchYear

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

	getSearch:(keysearch,page, mediaType,language,year,cb)=>{
		console.log('data')
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
		const moviefilters=filterSearch(movieSearch,mediaType,language,year)
		const movie= moviefilters.length>20? moviefilters.slice((page-1)*20,(page-1)*20+20):moviefilters
		cb(movie,Math.floor(moviefilters.length/20))
			}			
	}
