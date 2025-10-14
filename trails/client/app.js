console.log("connected")

let trail_button = document.querySelector("#trail_button")
const trail_div = document.querySelector("#trail_div")
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
	let delete_button = document.createElement("button")
	trail_div.append(div)
	div.append(h3)
	div.append(p)
	div.append(p2)
	div.append(delete_button)

	h3.innerHTML = trail.name
	p.innerHTML = trail.length
	delete_button.innerHTML = "X"
}

function remove_div(trail){
	console.log("deleting")
	trail.remove()
	fetch("http://localhost:5500/trails/" + trail.id, {method:"DELETE", headers:{"Content-Type":"application/x-www-form-urlencoded"}
	}).then(function(response){
		console.log(response)
	})
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

delete_button.onclick = function(){
	let trail_div = delete_button.parentElement;
	remove_div(trail_div)

	fetch("http://localhost:5500/trails")
}
