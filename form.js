const formTextValidation = document.querySelectorAll(".form-text");

formTextValidation.forEach((item) => (item.style.display = "none"));

class ValidaForm {
	constructor() {
		this.form = document.forms[0];
		this.form.addEventListener("submit", (e) => {
			this.validar(e);
		});
	}

	validar(e) {
		e.preventDefault();
		this.clearErrorMessage();
		if (!this.form) return false;

		let formEl = Array.from(this.form.elements);
		formEl.forEach((formItem) => {
			if (formItem.type !== "submit" && formItem.value == "") {
				this.showError(
					formItem,
					`${formItem.id.replace("input", "")} não pode estar vazio...`
				);
			}
		});
	}

	validaSenha() {}

	showError(formEl, message) {
		let el = document.createElement("li");
		el.innerText = message;
		formEl.nextElementSibling.style.display = "block";
		formEl.nextElementSibling.firstElementChild.appendChild(el);
	}

	clearErrorMessage() {
		let formElements = [...this.form.elements];
		formElements.forEach((el) => {
			if (el.type != "submit") {
				el.nextElementSibling.firstElementChild.firstElementChild
					? el.nextElementSibling.firstElementChild.removeChild(
							el.nextElementSibling.firstElementChild.firstElementChild
					  )
					: true;
			}
		});
	}
}

let validaForm = new ValidaForm();
