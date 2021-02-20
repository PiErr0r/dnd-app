define([], function() {

	class Record {
		constructor(className, name, isPlayer, initValue, initBonus, onChangeCallback) {
			this.name = name;
			this.initValue = initValue;
			this.initBonus = initBonus;
			this.className = className;
			this.onChangeCallback = onChangeCallback;
			this.isPlayer = isPlayer;
		}

		/**
			Event listeners for input elements in a record
			*/

		changeInitValue(evt) {
			evt.preventDefault();
			const value = evt.target.value;
			if (isNotNum(value, -1000, 1000)) {
				this.initValue = 0;
			} else {
				this.initValue = parseInt(value, 10);
			}

			const initValueEl = document.getElementById(`${this.className}-init-value`);
			initValueEl.value = this.initValue;

			this.changeInitLabel.bind(this)();
			this.onChangeCallback();
		}

		changeInitBonus(evt, buttonChange) {
			// had to add this atrocity until I find out how to change this class insted of injecting the value in the element
			const value = evt === null ? (parseInt(document.getElementById(`${this.className}-init-bonus`).value, 10) + buttonChange) : evt.target.value;
			if (isNotNum(value, -1000, 1000)) {
				this.initBonus = 0;
			} else {
				this.initBonus = parseInt(value, 10);
			}

			const initBonusEl = document.getElementById(`${this.className}-init-bonus`);
			initBonusEl.value = this.initBonus;

			this.changeInitLabel.bind(this)();
			this.onChangeCallback();
		}

		changeInitLabel() {
			const initValueEl = document.getElementById(`${this.className}-init-value`);
			this.initValue = parseInt(initValueEl.value, 10);
			const initBonusEl = document.getElementById(`${this.className}-init-bonus`);
			this.initBonus = parseInt(initBonusEl.value, 10);

			const initLabelEl = document.getElementById(`${this.className}-init-result`);
			initLabelEl.innerText = parseInt(this.initValue, 10) + parseInt(this.initBonus, 10);
		}

		changeName(evt) {
			evt.preventDefault();
			this.name = evt.target.value;
		}

		handleDelete() {
			const thisEl = document.getElementById(this.className);
			thisEl.remove();
		}

		/**
			Create all elements in a record
		  */

		createInitBonus() {
			const divInitBonus = document.createElement("div");
			divInitBonus.classList.add("init-bonus");

			const decBtn = document.createElement("button");
			decBtn.classList.add("init-btn");
			decBtn.setAttribute("tabindex","-1")
			decBtn.addEventListener("click", () => this.changeInitBonus.bind(this)(null, -1));

			const decImg = document.createElement("img");
			decImg.setAttribute("src", "../images/chevron-left-solid.svg");
			decBtn.appendChild(decImg)

			const incBtn = document.createElement("button");
			incBtn.classList.add("init-btn");
			incBtn.setAttribute("tabindex","-1")
			incBtn.addEventListener("click", () => this.changeInitBonus.bind(this)(null, 1));

			const incImg = document.createElement("img");
			incImg.setAttribute("src", "../images/chevron-right-solid.svg");
			incBtn.appendChild(incImg)

			const inputNum = document.createElement("input");
			inputNum.classList.add("is-num");
			inputNum.setAttribute("id", `${this.className}-init-bonus`);
			inputNum.setAttribute("type", "text");
			inputNum.setAttribute("value", this.initBonus);
			inputNum.addEventListener("change", this.changeInitBonus.bind(this));

			divInitBonus.appendChild(decBtn);
			divInitBonus.appendChild(inputNum);
			divInitBonus.appendChild(incBtn);			
			return divInitBonus;
		}

		createInitValue() {
			const divInitValue = document.createElement("div");
			divInitValue.setAttribute("title", "Roll + Dex bonus = Initiative");
			divInitValue.classList.add("init-value");
			divInitValue.classList.add("input-wrapper");

			const inputNum = document.createElement("input");
			inputNum.classList.add("init-value-input");
			inputNum.classList.add("is-num");
			inputNum.setAttribute("id", `${this.className}-init-value`);
			inputNum.setAttribute("type", "text");
			inputNum.setAttribute("value", `${this.initValue}`);
			inputNum.addEventListener("change", this.changeInitValue.bind(this));

			const plusLabel = document.createElement("label");
			plusLabel.classList.add("init-label");
			plusLabel.innerText = "+";

			const initBonus = this.createInitBonus();

			const eqLabel = document.createElement("label");
			eqLabel.classList.add("init-label");
			eqLabel.innerText = "=";

			const resLabel = document.createElement("label");
			resLabel.innerText = `${this.initValue + this.initBonus}`;
			resLabel.classList.add("init-label");
			resLabel.classList.add("init-label-result");
			resLabel.setAttribute("id", `${this.className}-init-result`);

			divInitValue.appendChild(inputNum);
			divInitValue.appendChild(plusLabel);
			divInitValue.appendChild(initBonus);
			divInitValue.appendChild(eqLabel);
			divInitValue.appendChild(resLabel);
			return divInitValue;	
		}

		createName() {
			const divName = document.createElement("div");
			divName.classList.add("input-wrapper");

			const inputText = document.createElement("input");
			inputText.classList.add(`${this.className}-name`);
			inputText.classList.add("record-name");
			inputText.setAttribute("type", "text");
			inputText.setAttribute("value", this.name);
			inputText.addEventListener("change", this.changeName);

			divName.appendChild(inputText);
			return divName;
		}

		createIsPlayerCBox() {
			const divCBox = document.createElement("div");
			divCBox.classList.add("input-wrapper-noborder");
			divCBox.setAttribute("title", "Is player?");

			const cBox = document.createElement("input");
			cBox.setAttribute("type", "checkbox");
			cBox.setAttribute("id", `${this.className}-cbox`);
			cBox.checked = this.isPlayer

			divCBox.appendChild(cBox);
			return divCBox
		}

		createDeleteBtn() {
			const btn = document.createElement("button");
			btn.classList.add("record-action");
			btn.setAttribute("tabindex", "-1");

			const img = document.createElement("img");
			img.setAttribute("src", "../images/trash-alt-regular.svg");

			btn.appendChild(img);
			btn.addEventListener("click", this.handleDelete.bind(this));
			return btn;	
		}

		createActions() {
			const actionDiv = document.createElement("div");
			actionDiv.classList.add("record-actions");

			const deleteBtn = this.createDeleteBtn();
			actionDiv.appendChild(deleteBtn)

			return actionDiv;
		}

		createPlayer() {
			const pDiv = document.createElement("div");
			pDiv.setAttribute("id", `${this.className}`)
			pDiv.classList.add("record");

			const isPlayer = this.createIsPlayerCBox();
			const name = this.createName();
			const initValue = this.createInitValue();
			const actions = this.createActions();

			pDiv.appendChild(isPlayer);
			pDiv.appendChild(name);
			pDiv.appendChild(initValue);
			pDiv.appendChild(actions);

			return pDiv
		}
	}

	return Record;
});