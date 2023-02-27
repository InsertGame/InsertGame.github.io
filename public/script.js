// if (window.location.host == "insert-games.onrender.com") window.location.host = "insert.games"

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

function EL(...args) {
	let a = String.template(...args)
	let tag = a.replace(/[#\.][^#\.]+/gm, "").trimEnd().trimStart()
	let id = a.match(/[#][^#\.]+/gm)
	let classes = a.match(/[\.][^#\.]+/gm)
	let elem = document.createElement(tag)
	if (id) elem.id = id.join(" ").replaceAll("#","")
	if (classes) elem.className = classes.join(" ").replaceAll(".","")
	elem.$ = function(props) {
		for (const [k,v] of Object.entries(props) ) {
			elem[k]=v
		}
		return elem
	}
	elem.on = function(...a) {
		this.addEventListener(...a)
		return this
	}
	return function(...e) {
		elem.append(...e)
		return elem
	}
}
function post(url, body) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(body));
}
function NEWS(title, author, ...elems) {
	return EL`div.left`(
		EL`h1`(title),
		EL`b`("Author: "+author),
		...elems
	)
}
function HTML(...args) {
	let a = String.template(...args)
	let tag = a.replace(/[#\.][^#\.]+/gm, "").trimEnd().trimStart()
	let id = a.match(/[#][^#\.]+/gm)
	let classes = a.match(/[\.][^#\.]+/gm)
	let elem = document.createElement(tag)
	if (id) elem.id = id.join(" ").replaceAll("#","")
	if (classes) elem.className = classes.join(" ").replaceAll(".","")
	elem.$ = function(props) {
		for (const [k,v] of Object.entries(props) ) {
			elem[k]=v
		}
		return elem
	}
	elem.on = function(...a) {
		this.addEventListener(...a)
		return this
	}
	return function(...e) {
		let b = String.template(...args)
		elem.innerHTML = b
		return elem
	}
}