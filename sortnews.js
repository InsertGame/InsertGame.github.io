const fs = require("fs")

var dir = 'public/posts/';

String.template = function(...args) {
	let t = [...args]
	let Z = [...t[0].raw]
	while (Z.length > 1) {
		let c = Z.pop()
		let b = t.pop()
		let a = Z.pop()
		Z.push(a+b+c)
	}
	return Z[0]
}

var lastTag = {}
var lastId = {}
var lastClass = {}

var firstTag = {}
var firstId = {}
var firstClass = {}

function EL(...args) {
	let a = String.template(...args)
	let tag = a.replace(/[#\.][^#\.]+/gm, "").trimEnd().trimStart()
	let id = a.match(/[#][^#\.]+/gm)
	let classes = a.match(/[\.][^#\.]+/gm)
	id = id || []
	classes = classes || []
	return function(...elems) {
		let elem = {
			tag: tag,
			id: id.join(" "),
			className: classes.join(" "),
			body: elems,
			$: function(obj) {
				return elem
			}
		}
		firstTag[tag] = firstTag[tag] || elem
		firstId[id.join(" ")] = firstId[id.join(" ")] || elem
		firstClass[classes.join(" ")] = firstClass[classes.join(" ")] || elem
		lastTag[tag] = elem
		lastId[id.join(" ")] = elem
		lastClass[classes.join(" ")] = elem
		return elem
	}
}

function NEWS(title, author, ...elems) {
	return EL`div.left`(
		EL`h1`(title),
		EL`b`("Author: "+author),
		...elems,
	)
}

function func(txt) {
	return eval(`(function(){${txt}})`)
}

fs.readdir(dir, function(err, files){
  	files = files.map(function (fileName) {
		return {
	  		name: fileName,
	  		time: fs.statSync(dir + '/' + fileName).mtime.getTime()
		};
  	})
  	.sort(function (a, b) {
		return b.time - a.time; })
  	.map(function (v) {
		return v.name; });

	let archive = "return EL`div.left`(EL`h1`('Archive'),"
	let latest
	for (let i = 0; i < files.length; i++) {
		if (files[i] == "archive.js") continue
		latest = latest || files[i].replace(".js","")
		lastTag = {}
		lastId = {}
		lastClass = {}
		firstTag = {}
		firstId = {}
		firstClass = {}
		let a = func(fs.readFileSync('./public/posts/'+files[i], "utf-8"))()
		archive += "EL`quote.clickable`(EL`h3`("+JSON.stringify(firstTag.h1.body[0])+"),EL`p`("+JSON.stringify(firstTag.p.body[0])+")).on('click',()=>{window.location = 'news.html?"+files[i].split(".")[0]+"'}),"
	}
	archive += ").$({hideToContents:true})"
	fs.writeFileSync("./public/posts/archive.js", archive)
	fs.writeFileSync("./public/latest.js", "const LATEST = "+JSON.stringify(latest))
});