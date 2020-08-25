import { BarChartComponent } from "@common-components";
import { text } from "@core";
import {
	Chart,
	Gender,
	Patient,
	statistics,
} from "@modules";
import { computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { appointments } from 'modules/appointments';

@observer
class Component extends React.Component<{}, {}> {
	@computed
	get selectedProcedures() {
		const selectedProcedures: {
			procedure: any;
			male: number;
			female: number;
		}[] = [];

		appointments.list.forEach((appointment) => {
			if
				(!appointment.isPaid ||
				appointment.patientID === "" ||
				appointment.procedureId === ""
			) {
				return;
			}

			appointment.patient.procedures.forEach((procedure) => {
				if (procedure.id !== "") {
						const i = selectedProcedures.findIndex(
							(proc) => proc.procedure.id == procedure.id
						);
						if (selectedProcedures.length === 0) {
							selectedProcedures.push({
								procedure: procedure,
								male: 0,
								female: 0,
							})
						}
						
						if (i > -1) {
							if (
								(appointment.patient || new Patient()).gender ===
								Gender.female
							){
								selectedProcedures[i].female++;
							} else {
								selectedProcedures[i].male++;
							}
						}
					}
			});
		});
		return selectedProcedures;
	}

	render() {
		return (
			<div>
				<BarChartComponent
					{...{
						horizontal: true,
						height: 400,
						notStacked: true,
						data: {
							xLabels: this.selectedProcedures.map(
								x => ""
							),
							bars: [
								{
									label: text("Male"),
									data: this.selectedProcedures.map(
										x => x.male
									)
								},
								{
									label: text("Female"),
									data: this.selectedProcedures.map(
										x => x.female
									)
								}
							]
						}
					}}
				/>
			</div>
		);
	}
}

export const proceduresByGenderChart: Chart = {
	Component,
	name: "Procedures by gender",
	description: "applied procedures by patients gender",
	tags: "A breakdown of applied procedures by patients gender throughout the selected date",
	className: "col-xs-12 col-lg-6"
};
