return EL`div.left`(
	EL `h1` ("Hello world!"),
	EL `p` (`
This is a test post to make sure that the news page works as expected.
Which if I set everything up right, it is working.
Most small stuff will happen on the discord.`),
	EL `a` (`https://discord.gg/X3bPan9U4G`)
	.$({ href: "https://discord.gg/X3bPan9U4G" }),
)