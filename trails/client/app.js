console.log("connected")

API_URL = "http://localhost:5000/trails"
let editID = null;

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
	document.querySelector("#trail_name").innerHTML = ""
	document.querySelector("#trail_length").innerHTML = ""
	
}

function add_div_with_trail(trail){
	let div = document.createElement("div")
	let h3 = document.createElement("h3")
	let p = document.createElement("p")
	let p2 = document.createElement("p")
	let delete_button = document.createElement("button")
	let edit_button = document.createElement("button")
	trail_div.append(div)
	div.append(h3)
	div.append(p)
	div.append(p2)
	div.append(delete_button)
	div.append(edit_button)
	//Empty the forms afterwards

	delete_button.onclick = function(){
		let confirmation = confirm("Are you sure?")
		console.log(confirmation)
		if(confirmation == true){
			remove_div(trail);
			load()
		}
	}

	edit_button.onclick = function(){
		edit_trail(trail)
		load()
	}

	h3.innerHTML = trail.name;
	p.innerHTML = trail.length;
	delete_button.innerHTML = "X";
}

function remove_div(trail){
	console.log("deleting")
	fetch(API_URL + "/" + trail.id, {method:"DELETE", headers:{"Content-Type":"application/x-www-form-urlencoded"}})
	.then(function(response){
		console.log(response)
	})
}

function edit_trail(trail){
	let submit_method = null
	let url = API_URL
	console.log("Editing")
	document.querySelector("#trail_name_edit").value = trail.name
	document.querySelector("#trail_length_edit").value = trail.length
	let data = "name="+encodeURIComponent(trail.name)
	data = "&length="+encodeURIComponent(trail.length)
	const button_text = document.querySelector("#trail_button_edit").innerHTML
	if(button_text == "SAVE"){
		submit_method = "PUT"
		editID = trail.id
		url = API_URL + "/" + editID
	} else {
		submit_method = "PUSH"
	}
	fetch(url, {method:submit_method, body:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}})
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
