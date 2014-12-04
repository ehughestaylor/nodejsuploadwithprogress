var fs = require('fs'); //require filesystem module 
var http = require('http');

http.createServer(function(request, response){ //read the request 
	var newFile = fs.createWriteStream("readme_copy.md");
	var fileBytes = request.headers['content-length'];
	var uploadedBytes = 0; //initialized
	request.on('readable', function(){
		var chunk = null;
		while(null !== (chunk = request.read())){
			uploadedBytes += chunk.length;
			var progress = (uploadedBytes/ fileBytes) * 100;
			response.write("progress: " + parseInt(progress, 10) + "%\n");
		}
	});
	request.pipe(newFile); //pipe request to the new file

	request.on('end',function(){
		response.end('uploaded!');
	});

}).listen(8080);
