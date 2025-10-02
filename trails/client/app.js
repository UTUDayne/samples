console.log("connected")

let trail_button = querySelector("#trail_button")
const trail_div = querySelector("#trail_div")
load()

function load(){
	trail_div.innerHTML = ""
	fetch("http://localhost:5500/trails")
	.then(function(response){
		response.json()
		.then(function(data) {
			console.log(data)
			add_div_with_trail(data)
			data.forEach(trail => add_div_with_trail(trail))
		})

	})
}

function add_div_with_trail(trail){
	let div = document.createElement("div")
	let h3 = document.createElement("h3")
	let p = document.createElement("p")
	let p2 = document.createElement("p")
	trail_div.append(div)
	div.append(h3)
	div.append(p)
	div.append(p2)

	h3.innerHTML = trail.name
	p.innerHTML = trail.length
}

trail_button.onclick = function(){
	let name = document.querySelector("#trail_name").value
	console.log(name)

	let data = "name="+encodeURIComponent(name)
	//data += "&description"+encodeURIComponent(description)

	fetch("http://localhost:5500/trails", {method:"POST", body:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(response){
		response.json().then(function(data){
			console.log(data)
			add_div_with_trail(data)
			data.forEach(trail => add_div_with_trail(trail))

			load()
		})
	})


	console.log(data)

}
