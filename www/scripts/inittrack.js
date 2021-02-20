var cnt = 10000;

require(["../scripts/init_track_scripts/Record"], function(Record) {

	// sort the records by initiative score
	const sortRecords = (force = false) => {
		const autoSort = document.getElementById("auto-sort");
		if (!autoSort.checked && !force) {
			return;
		}


		const initTrack = document.getElementsByClassName("init-track")[0];
		const childrenArr = [...initTrack.children];
		const sortedArr = childrenArr.sort((fstEl, sndEl) => {
			const fId = fstEl.id;
			const sId = sndEl.id;

			const fVal = parseInt(document.getElementById(`${fId}-init-result`).innerText, 10);
			const sVal = parseInt(document.getElementById(`${sId}-init-result`).innerText, 10);

			return fVal > sVal ? -1 : fVal < sVal ? 1 : 0;
		});

		while (initTrack.lastChild) {
			initTrack.lastChild.remove();
		}

		sortedArr.forEach(c => {
			initTrack.appendChild(c);
		});
	}

	const playerNum = 4;
	const initTrack = document.getElementsByClassName("init-track")[0];
	for (let i = 0; i < playerNum; ++i) {
		const record = new Record(`record-${i}`, i === 0 ? "" : "Name", true, 0, 0, sortRecords);
		const currPlayer = record.createPlayer();
		initTrack.appendChild(currPlayer);
	}
	sortRecords(true);
	const nameEl = document.getElementsByClassName(`record-0-name`)[0]
	nameEl.focus();

	const addRecordBtn = document.getElementsByClassName("add-record-btn")[0];
	addRecordBtn.addEventListener("click", () => {
		const initTrack = document.getElementsByClassName("init-track")[0];
		const recordNum = document.getElementById("add-record-num");
		const value = isNotNum(recordNum.value, 0, 30) ? 0 : parseInt(recordNum.value);
		console.log(recordNum.value)
		recordNum.value = value;
		for (let i = 0; i < value; ++i) {
			const newRecord = new Record(`record-${cnt++}`, "", false, 0, 0, sortRecords);
			initTrack.appendChild(newRecord.createPlayer())
			if (i === 0) {
				const nameEl = document.getElementsByClassName(`record-${cnt - 1}-name`)[0]
				nameEl.focus();
			}
		}
	});

	const autoSort = document.getElementById("auto-sort");
	autoSort.addEventListener("change", function(evt) {
		const sortBtn = document.getElementById("do-sort");
		sortBtn.disabled = evt.target.checked
	});

	const sortBtn = document.getElementById("do-sort");
	sortBtn.addEventListener("click", () => sortRecords(true));

	const rollBtn = document.getElementById("do-roll");
	rollBtn.addEventListener("click", () => {
		const initTrack = document.getElementsByClassName("init-track")[0];
		const childrenArr = [...initTrack.children];
		childrenArr.forEach(c => {
			const id = c.id;
			const isPlayer = document.getElementById(`${id}-cbox`);
			if (!isPlayer.checked) {
				const initValueEl = document.getElementById(`${id}-init-value`);
				const initVal = 5 + Math.ceil(100 * Math.random()) % 15;
				initValueEl.value = initVal;

				const initBonusEl = document.getElementById(`${id}-init-bonus`);
				const initBonus = initBonusEl.value;

				const initResEl = document.getElementById(`${id}-init-result`);
				initResEl.innerText = parseInt(initVal, 10) + parseInt(initBonus, 10);
			}
		})
		sortRecords(true);				
	})

});

