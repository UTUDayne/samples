console.log("connected")

let trail_button = document.querySelector("#trail_button")
const trail_div = document.querySelector("#trail_div")
load()

function load(){
	trail_div.innerHTML = ""
	fetch("http://localhost:5000/trails")
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

	delete_button.onclick = function(){
		remove_div(trail);
		trail_div.remove()
		fetch("http://localhost:5000/trails");
	}

	h3.innerHTML = trail.name;
	p.innerHTML = trail.length;
	delete_button.innerHTML = "X";
}

function remove_div(trail){
	console.log("deleting")
	fetch("http://localhost:5000/trails/" + trail.id, {method:"DELETE", headers:{"Content-Type":"application/x-www-form-urlencoded"}})
	.then(function(response){
		console.log(response)
	})
}

trail_button.onclick = function(){
	let name = document.querySelector("#trail_name").value
	let length = document.querySelector("#trail_length").value

	let data = "name="+encodeURIComponent(name)
	data += "&length="+encodeURIComponent(length)

	fetch("http://localhost:5000/trails", {method:"POST", body:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(response => response.json()
		.then(data => {
			console.log(data)
			add_div_with_trail(data)
			data.forEach(trail => add_div_with_trail(trail))

			load()
		})
	)
	console.log(data)

};
