const createRoute = (route) => {
	const rDiv = document.createElement("div");
	rDiv.classList.add("single-route");
	const rH = document.createElement("h6");
	rH.innerText =route.name
	const rA = document.createElement("a");
	rA.setAttribute("href", route.path)
	const rImg = document.createElement("img");
	if (route.img) {
		rImg.setAttribute("src", "images/" + route.img);
	}

	rA.appendChild(rH);
	if (route.img) {
		rA.appendChild(rImg);
	}
	rDiv.appendChild(rA);

	return rDiv;
}

require(["scripts/web_data/routes"], function(_) {
	const { routes } = _;
	const routesContainer = document.getElementsByClassName("routes-container")[0];
	
	routes.forEach(r => {
		const singleRoute = createRoute(r);
		routesContainer.appendChild(singleRoute);
	});
});