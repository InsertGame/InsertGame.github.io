const express = require('express')
const crypto = require("crypto")
const fs = require("fs")
const app = express()
const port = 8080

require("./sortnews.js")()

let pass = false;

app.use(express.json())
app.use(express.static('public'))

app.get("/getpass", (req, res)=>{
	console.log(pass = crypto.randomUUID())
	res.end("done")
})

app.post("/post", (req, res)=>{
	if (pass && req.body.pass == pass) {
		fs.writeFileSync("./public/posts/"+Date.now()+".js", req.body.post)
		require("./sortnews.js")()
		res.end("done")
	} else
	res.end("wrong")
	pass = false
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})