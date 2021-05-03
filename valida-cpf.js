class ValidaCpf {
	constructor(cpfEnviado) {
		Object.defineProperties(this, {
			cpfLimpo: {
				configurable: false,
				enumerable: false,
				writable: false,
				value: cpfEnviado.replace(/\D+/g, ""),
			},
			generateDigit: {
				enumerable: false,
				writable: false,
				configurable: false,
				value: (cpfParcial) => {
					if (!cpfParcial) return false;
					if (typeof cpfParcial !== "string") return false;
					if (cpfParcial.length > 10 || cpfParcial.length < 9) return false;

					cpfParcial = Array.from(cpfParcial);
					let counter = cpfParcial.length + 1;

					let digit = cpfParcial.reduce((amount, item) => {
						amount += item * counter;
						counter--;
                        return amount;
					}, 0);
					digit = 11 - (digit % 11);

					return digit > 9 ? 0 : digit;
				},
			},
		});
	}

	isSequence() {
		return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
	}

	valida() {
		if (this.isSequence()) return false;
		if (!this.cpfLimpo) return false;
		if (typeof this.cpfLimpo !== "string") return false;
		if (this.cpfLimpo.length != 11) return false;

		let cpfParcial = this.cpfLimpo.slice(0, -2);

		let digit = String(this.generateDigit(cpfParcial));
		digit = digit.concat(String(this.generateDigit(cpfParcial.concat(digit))));

		return cpfParcial.concat(digit) === this.cpfLimpo;
	}
}

let validaCpf = new ValidaCpf("003.700.153-12");
console.log(validaCpf.valida());