var fs =require('fs')
const path = require('path')
const p = path.join(
   path.dirname(process.mainModule.filename),
   'data',
   'videoList.json'
 );

const videos = {
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

module.exports={
	getVideoId:(id,cb)=>{
		const movieTraler=
			videos
				.all()
				.filter((item)=>item.id==id)
		if(movieTraler.length>0){
			const movieTraler2=
				videos
					.all()
					.filter((item)=>item.id==id)[0].videos
					.filter((item)=>(item.official==true && item.site=='YouTube' && item.type=='Trailer'))
					.sort(function(a,b){
						const c = new Date(a.published_at);
						const d = new Date(b.published_at);
						return d-c;
						});


			if(movieTraler2.length==0){
				const movieTeaser=
				videos
					.all()
					.filter((item)=>item.id==id)[0].videos
					.filter((item)=>(item.official==true && item.site=='YouTube' &&  item.type=='Teaser'))
					.sort(function(a,b){
						const c = new Date(a.published_at);
						const d = new Date(b.published_at);
						return d-c;
						});
					cb([movieTeaser[0]])
				
			}else{
				console.log(movieTraler2)
				cb([movieTraler2[0]])
			}
		}else{
			cb(movieTraler)
		}
		
		
	}
}