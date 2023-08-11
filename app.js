const fs   = require("fs")
const path = require("path")

/*function walk_folder(dir,table=[],level=0) {

	let list = fs.readdirSync(dir)
	
	for ( let file of list ){
	
		let pathx = dir + '\\' + file
		let stats = fs.statSync(pathx)
		
		if( stats.isFile() ){
			table.push(pathx)
		}
		else if ( stats.isDirectory() ){
			level++
			walk_folder(pathx,table,level)
		}
	
	}

	return table
}*/

function walk_folder(dir,obj={},i=0) {

	let list = fs.readdirSync(dir)

	list.forEach( file => {
		
		let pathx = dir + "\\" + file
		
		let stats = fs.statSync(pathx)

		if ( stats.isFile() ) {

			obj[file] = stats.size
			i++
		
		}else if (stats.isDirectory()){

			console.log(i,path.basename(pathx))

			obj[path.basename(pathx)] = {}

			walk_folder(
			pathx,
			obj[path.basename(pathx)],
			i
			)
		}
		
	})

	return obj

}

content = JSON.stringify( walk_folder("__dirname"), null, 2 )

server(content,"plain")

function server(x,n) {

	const http = require("http")
	const PORT = 8080

	http.createServer(function (req, res) {

		res.writeHead(200,{"content-type":`text/${n};charset=utf8`})
		res.end(x)

	}).listen(PORT)
	
	console.log(`Running at port ${PORT}`)
}
