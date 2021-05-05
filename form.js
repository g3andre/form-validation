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

		//Validação campos preenchidos
		let formEl = Array.from(this.form.elements);
		formEl.forEach((formItem) => {
			if (formItem.type !== "submit" && formItem.value == "") {
				this.showError(
					formItem,
					`${formItem.id.replace("input", "")} não pode estar vazio...`
				);
			}

			//Valida o CPF
			if( formItem.previousElementSibling.innerText.toUpperCase().includes('CPF')){
				let validaCpf = new ValidaCpf(formItem.value);
				if( !validaCpf.valida() ) this.showError(formItem, 'CPF inválido...')
			}
		});

		//Validação dos campos de senha 
		let passwords = document.querySelectorAll('[type="password"]');
		let message = this.isInvalidPassword(passwords[0], passwords[1]);

		if (message) this.showError(passwords[0], message);
	}

	isInvalidPassword(input1, input2) {
		if (input1.value.trim() != input2.value.trim())
			return "Senhas devem ser iguais...";
		if (input1.value.length < 6 || input1.value.length > 8)
			return "A senha deve ter entre 6 e 8 caracteres...";

		return false;
	}

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
