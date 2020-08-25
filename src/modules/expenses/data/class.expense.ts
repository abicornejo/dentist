import { ExpenseJSON } from "./interface.expense-json";
import { generateID } from "@utils";
import { computed, observable } from "mobx";

export class Expense {
	// Observables
	_id: string = generateID();
	@observable name: string = "";
	@observable price: number = 0;
	@observable type: string = "";
	@observable description: string = "";
	@observable date: number = new Date().getTime();
	@observable repeat: boolean = false;
	@observable days: number = 0;
	@observable count: number = 0;	

	@computed
	get searchableString() {
		return `
			${this.name} description ${this.description}
		`.toLowerCase();
	}

	public toJSON(): ExpenseJSON {
		return {
			_id: this._id,
			name: this.name,
			price: this.price,
			type: this.type,
			description: this.description,
			date: this.date,
			repeat: this.repeat,
			days: this.days,
			count: this.count
		};
	}

	constructor(json?: ExpenseJSON) {
		if (json) {
			this.fromJSON(json);
		}
	}

	fromJSON(json: ExpenseJSON) {
		this._id = json._id;
		this.name = json.name;
		this.price = json.price,
		this.type = json.type,
		this.description = json.description,
		this.date = json.date,
		this.repeat = json.repeat
		this.days = json.days
		this.count = json.count
	}
}
