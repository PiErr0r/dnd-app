
define([], function() {

	class Record {
		constructor(className, name, initValue, initBonus, onChangeCallback, handleAdd) {
			this.name = name;
			this.initValue = initValue;
			this.initBonus = initBonus;
			this.className = className;
			this.onChangeCallback = onChangeCallback;
		}


		/**
			Event listeners for input elements in a record
			*/

		handleSave(a, b) {
			console.log("save", a, b)
		} 

		changeInitValue(a, b, c) {
			console.log(a, b, c);
			console.log(this.className);
		}

		/**
			Create all elements in a record
		  */
		createInitBonus() {
			const divInitBonus = document.createElement("div");
			divInitBonus.classList.add("init-bonus");
			divInitBonus.classList.add("input-wrapper");

			const decBtn = document.createElement("button");
			decBtn.classList.add("init-btn");
			decBtn.addEventListener("click", () => this.changeInitBonus(null, this.initBonus - 1));
			const decImg = document.createElement("img");
			decImg.setAttribute("src", "../images/chevron-left-solid.svg");
			decBtn.appendChild(decImg)

			const incBtn = document.createElement("button");
			incBtn.classList.add("init-btn");
			incBtn.addEventListener("click", () => this.changeInitBonus(null, this.initBonus + 1));
			const incImg = document.createElement("img");
			incImg.setAttribute("src", "../images/chevron-right-solid.svg");
			incBtn.appendChild(incImg)

			const inputNum = document.createElement("input");
			inputNum.classList.add(`${this.className}-init-bonus`);
			inputNum.setAttribute("type", "text");
			inputNum.setAttribute("value", this.initBonus);
			inputNum.addEventListener("change", this.changeInitBonus);

			divInitBonus.appendChild(decBtn);
			divInitBonus.appendChild(inputNum);
			divInitBonus.appendChild(incBtn);			
			return divInitBonus;
		}

		createInitValue() {
			const divInitValue = document.createElement("div");
			divInitValue.classList.add("init-value");
			divInitValue.classList.add("input-wrapper");

			const inputNum = document.createElement("input");
			inputNum.classList.add(`${this.className}-init-value`);
			inputNum.setAttribute("type", "text");
			inputNum.setAttribute("value", this.initValue);
			inputNum.addEventListener("change", this.changeInitValue);

			divInitValue.appendChild(inputNum);
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

		createEditBtn() {
			const btn = document.createElement("button");
			btn.classList.add("record-action")
			const img = document.createElement("img");
			img.setAttribute("src", "../images/edit-regular.svg");
			btn.appendChild(img);
			btn.addEventListener("click", this.handleEdit);
			return btn;
		}

		createSaveBtn() {
			const btn = document.createElement("button");
			btn.classList.add("record-action")
			const img = document.createElement("img");
			img.setAttribute("src", "../images/save-regular.svg");
			btn.appendChild(img);
			btn.addEventListener("click", this.handleSave);
			return btn;
		}

		createActions() {
			const actionDiv = document.createElement("div");
			actionDiv.classList.add("record-actions");
			const editBtn = this.createEditBtn();
			const saveBtn = this.createSaveBtn();
			actionDiv.appendChild(editBtn);
			actionDiv.appendChild(saveBtn);
			return actionDiv;
		}

		createPlayer() {
			const pDiv = document.createElement("div");
			pDiv.classList.add("record");
			const name = this.createName();
			const initValue = this.createInitValue();
			const initBonus = this.createInitBonus();
			//const actions = this.createActions();

			pDiv.appendChild(name);
			pDiv.appendChild(initValue);
			pDiv.appendChild(initBonus);
			//pDiv.appendChild(actions);

			return pDiv
		}

		static asd() {
			console.log("test")
		}
	}

	return Record;
});