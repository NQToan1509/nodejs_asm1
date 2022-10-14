 const fs=require('fs')
 const path = require('path')
 const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'genreList.json'
  );
 const typeMoviesId = {
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
getDiscoverName:(genreId)=>{
	const MoviesId=typeMoviesId.all().filter((item)=>{return item.id==genreId})
	console.log(MoviesId)
	return MoviesId[0].name
}

}