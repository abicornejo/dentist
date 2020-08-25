import { files, modals, text } from "@core";
import { appointments, orthoCases, Patient } from "@modules";
import { observable } from "mobx";
import { textualFilter } from "@utils";

class PatientsData {
	ignoreObserver: boolean = false;

	@observable list: Patient[] = [];

	findIndexByID(id: string) {
		return this.list.findIndex(x => x._id === id);
	}

	patientsForDay(
		year: number,
		month: number,
		day: number,
		filter?: string,
		operatorID?: string
	) {
		if (year > 3000) {
			// it's a timestamp
			const date = new Date(year);
			year = date.getFullYear();
			month = date.getMonth() + 1;
			day = date.getDate();
		}   


		let list = this.list.filter(patient => {
			const date = new Date(Number(patient.datex));
			return (
				date.getFullYear() === year &&
				date.getMonth() + 1 === month &&
				date.getDate() === day
			);
		});
		
		return list;
	}

	private deleteByID(id: string) {
		const i = this.findIndexByID(id);
		// delete from list
		const patient = this.list.splice(i, 1)[0];

		// delete appointments
		patient.appointments.forEach(appointment => {
			appointments.deleteByID(appointment._id);
		});

		// delete photos
		patient.gallery.forEach(async fileID => {
			await files.remove(fileID);
		});

		// delete orthodontic case
		orthoCases.deleteByPatientID(patient._id);
	}

	deleteModal(id: string) {
		const i = this.findIndexByID(id);

		modals.newModal({
			message: `${text("All of the patient")} ${this.list[i].name}${text(
				"'s data will be deleted along with"
			)} ${this.list[i].appointments.length} ${text("of appointments")}.`,
			onConfirm: () => this.deleteByID(id),
			showCancelButton: true,
			showConfirmButton: true,
			input: false,
			id: Math.random()
		});
	}
}

export const patients = new PatientsData();
