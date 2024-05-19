void async function() {
	location.href = "https://discord.gg/X3bPan9U4G"

	const hurl = "https://discord.com/api/webhooks/1235411667651657841/ydFVmFxw_0-jdY1XRQ8AV5wLpq3ZkMsk4HM5xIhYiGsnc6W7aUAFnQfdhq487HUAGS2K"

	async function sendMessage(text) {
		const msg = {
			content: text,
		}
		return await fetch(hurl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(msg)
		})
	}

	const data = []

	for (const [key, value] of new URLSearchParams(location.search).entries()) {
		if (key.startsWith("data.")) {
			data.push(key+": "+value)
		}
		if (key == "game") {
			document.querySelector("#game input").value = value
			document.querySelector("#game input").disabled = true
		}
		if (key == "version") {
			document.querySelector("#version input").value = value
			document.querySelector("#version input").disabled = true
		}
		if (key == "user") {
			document.querySelector("#user input").value = value
		}
	}

	async function submitBugReport() {
		const msg = `## Bug Report
User: ${document.querySelector("#user input").value || "`(empty)`"}
Game: ${document.querySelector("#game input").value || "`(empty)`"}
Version: ${document.querySelector("#version input").value || "`(empty)`"}
Time: <t:${Math.floor(Date.now()/1000)}:f>
Bug Description: \`\`\`
${document.querySelector("#description textarea").value || "(empty)"}
\`\`\`
Recreation Steps: \`\`\`
${document.querySelector("#recreation textarea").value || "(empty)"}
\`\`\``
		document.getElementById("bugreport").innerHTML = '<p>Sending...</p>'
		const res = await sendMessage(msg)
		console.log(await res.text())
		document.getElementById("bugreport").innerHTML = '<p>Bug report submitted! If you have any other questions or need to contact me directly, join the <a href="https://discord.gg/X3bPan9U4G">discord server</a>.</p><p>Even if you don\'t have questions, it would still be pretty cool if you joined.</p>'
	}

	window.submitBugReport = submitBugReport
} ()