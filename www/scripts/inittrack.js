const isNotNum = (n) => {
	const intN = parseInt(n, 10);
	return Object.is(intN, NaN) || intN >= 10 || intN <= 0;
}


require(["../scripts/init_track_scripts/Record"], function(Record) {
	let playerNum = prompt("Enter the number of players (less than 10)", 4);

	if (isNotNum(playerNum)) {
		while (isNotNum(playerNum = prompt("Enter the NUMBER of players (less than 10)", 4)));
	}

	const initTrack = document.getElementsByClassName("init-track")[0];

	for (let i = 0; i < playerNum; ++i) {
		const record = new Record(`record-${i}`, "Name", 0, 0, () => {}, () => {});
		const currPlayer = record.createPlayer();
		initTrack.appendChild(currPlayer);
	}
	
	//const addBtn = create.addBtn();
	//initTrack.appendChild(addBtn);
});

