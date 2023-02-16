fetch(`posts/${document.location.search.replace("?","") || LATEST}.js`)
.then(e=>e.text())
.then(code=>{
	let el = Function(code)()
	if (!el.hideToContents) document.body.append(
		EL `a.left` (
			EL `button.secondary` ("View all posts")
		).$({ href: "https://insertgame.repl.co/news.html?archive" })
	)
	document.body.append(el)
})
.catch(_=>{
	console.error(_)
	document.body.append(
		EL `h1` ("404 Not found"),
		EL `p` ("The post you were looking for does not exist. Either it was moved, or it never existed in the first place. I don't know, likely story is it's a mystery to us as well."),
		EL `a` (
			EL `button` ("View all posts")
		).$({ href: "https://insertgame.repl.co/news.html?archive" }),
	)
})