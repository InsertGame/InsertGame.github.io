if (document.getElementById("game") && false) {
	function beep(duration=50, frequency=440, volume=0.25, type="square", callback, delay=0) {
		const audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
		var oscillator = audioCtx.createOscillator();
		var gainNode = audioCtx.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		oscillator.gainNode = gainNode
		
		if (volume){gainNode.gain.value = volume;}
		if (frequency){oscillator.frequency.value = frequency;}
		if (type){oscillator.type = type;}
		if (callback){oscillator.onended = callback;}
		
		oscillator.start(audioCtx.currentTime + (delay / 1000));
		oscillator.stop(audioCtx.currentTime + ((duration + delay) / 1000));
		return oscillator
	}
	function beepsong(notes, bpm=120) {
		const audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)
		let pos = 0
		for (let i = 0; i < notes.length; i++) {
			const length = 240000/bpm/notes[i][1]
			const frequency = notes[i][0]
			if (frequency != null) {
				var oscillator = audioCtx.createOscillator()
				var gainNode = audioCtx.createGain()
				
				oscillator.connect(gainNode)
				gainNode.connect(audioCtx.destination)
				
				gainNode.gain.value = 0.25
				oscillator.frequency.value = frequency
				oscillator.type = "square"
				
				oscillator.start(audioCtx.currentTime + (pos / 1000))
				oscillator.stop(audioCtx.currentTime + ((length + pos) / 1000))
			}
			pos += length
		}
	}

	const canvas = document.getElementById("canvas")
	
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

	let started = false

	function setLoop(cb, ms, times) {
		return new Promise(function(resolve){
			let index = 0
			let i = setInterval(function(){
				cb(index)
				index++
				if (index >= times) {
					clearInterval(i)
					resolve()
				}
			}, ms)
		})
	}

	function when(event) {
		return new Promise(function(resolve){
			addEventListener(event, function(e) {
				e.preventDefault()
				resolve(e)
			}, {once:true})
		})
	}

	function wait(ms) {
		return new Promise(function(resolve){
			setTimeout(resolve, ms)
		})
	}

	canvas.onclick = async function() {
		if (started) return
		started = true

		const ctx = canvas.getContext("2d")
		ctx.imageSmoothingEnabled = false
		ctx.font = "20px monospace"
		ctx.textAlign = "center"
		ctx.textBaselnie = "middle"

		const WIDTH = 438
		const HEIGHT = 308
		const width = 438/4
		const height = 308/4

		const char_1 = document.getElementById("char-1")
		const char_2 = document.getElementById("char-2")
		const char_3 = document.getElementById("char-3")
		const char_4 = document.getElementById("char-4")
		const cube = document.getElementById("cube")
		const sphere = document.getElementById("sphere")
		const onei = document.getElementById("one")
		const select = document.getElementById("select")

		let char = 0
		let shape = 0
		let one = 0

		ctx.fillStyle = "black"
		let osc = beep(5000, 110)
		await setLoop((i)=>{
			osc.gainNode.gain.value = 0.125 + 0.125*(i%2)
			ctx.fillRect(0, i*20, WIDTH, 20)
		}, 50, HEIGHT/20)
		osc.stop()
		ctx.fillStyle = "white"
		ctx.fillText("INSERT COIN", WIDTH/2, 250)
		await when("keyup")
		beep(50, 440, 0.25, "square", ()=>beep(50, 660))
		while (true) {
			ctx.fillStyle = "black"
			ctx.fillRect(0, 0, WIDTH, HEIGHT)
			ctx.fillStyle = "white"
			ctx.fillText("SELECT CHARACTER", WIDTH/2, 250)
			ctx.scale(4, 4)
			ctx.drawImage(char_1, width/2-4-16, height/2-4)
			ctx.drawImage(char_3, width/2-4+16, height/2-4)
			ctx.drawImage(select, width/2-4-16+32*char, height/2-12)
			ctx.scale(1/4, 1/4)
			const ch = await when("keyup")
			if (ch.code == "KeyA" || ch.code == "ArrowLeft") {
				beep()
				char = 0
			}
			if (ch.code == "KeyD" || ch.code == "ArrowRight") {
				beep()
				char = 1
			}
			if (ch.code == "Space") {
				beep(50, 440, 0.25, "square", ()=>beep(50, 660))
				break
			}
		}
		while (true) {
			ctx.fillStyle = "black"
			ctx.fillRect(0, 0, WIDTH, HEIGHT)
			ctx.fillStyle = "white"
			ctx.fillText("CUBE OR SPHERE", WIDTH/2, 250)
			ctx.scale(4, 4)
			ctx.drawImage(cube, width/2-4-16, height/2-4)
			ctx.drawImage(sphere, width/2-4+16, height/2-4)
			ctx.drawImage(select, width/2-4-16+32*shape, height/2-12)
			ctx.scale(1/4, 1/4)
			const ch = await when("keyup")
			if (ch.code == "KeyA" || ch.code == "ArrowLeft") {
				beep()
				shape = 0
			}
			if (ch.code == "KeyD" || ch.code == "ArrowRight") {
				beep()
				shape = 1
			}
			if (ch.code == "Space") {
				beep(50, 440, 0.25, "square", ()=>beep(50, 660))
				break
			}
		}
		while (true) {
			ctx.fillStyle = "black"
			ctx.fillRect(0, 0, WIDTH, HEIGHT)
			ctx.fillStyle = "white"
			ctx.fillText("YOU CAN ONLY CHOOSE ONE", WIDTH/2, 250)
			ctx.scale(4, 4)
			ctx.drawImage(onei, width/2-4-16, height/2-4)
			ctx.drawImage(onei, width/2-4+16, height/2-4)
			ctx.drawImage(select, width/2-4-16+32*one, height/2-12)
			ctx.scale(1/4, 1/4)
			const ch = await when("keyup")
			if (ch.code == "KeyA" || ch.code == "ArrowLeft") {
				beep()
				one = 0
			}
			if (ch.code == "KeyD" || ch.code == "ArrowRight") {
				beep()
				one = 1
			}
			if (ch.code == "Space") {
				beep(50, 440, 0.25, "square", ()=>beep(50, 660))
				break
			}
		}
		ctx.fillStyle = "black"
		ctx.fillRect(0, 0, WIDTH, HEIGHT)
		ctx.fillStyle = "white"
		ctx.fillText("LEVEL 1", WIDTH/2, 250)
		beepsong([
			[220, 8],
			[330, 8],
			[440, 8],
			[330, 8],
			[195.9977, 8],
			[293.6648, 8],
			[195.9977*2, 8],
			[293.6648, 8],
			[220, 2],
		], 200)
		await wait(3000)
		ctx.fillStyle = "black"
		ctx.fillRect(0, 0, WIDTH, HEIGHT)
	}
}