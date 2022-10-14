var fs =require('fs')
const path = require('path')
const p = path.join(
   path.dirname(process.mainModule.filename),
   'src',
   'data',
   'userToken.json'
 );

const user = {
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
module.exports=user.all()