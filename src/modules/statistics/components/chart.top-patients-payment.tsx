import { BarChartComponent } from "@common-components";
import { text } from "@core";
import { Chart, statistics } from "@modules";
import { computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
    
@observer
class Component extends React.Component<{}, {}> {
	@computed
	get selectedProcedures() {
		const selectedProcedures: {
			procedure: any;
			profit: number;
			times: number;
        }[] = [];
		
		statistics.selectedAppointments.forEach((appointment) => {
			if (!appointment.isPaid || appointment.procedureId === undefined) {
				return;
			}
			
			appointment.patient.paymentDetails.totalPaid
		})

		return selectedProcedures;
	}
	@computed
	get values() {
		return this.selectedProcedures.map((procedure, i) => ({
			x: i,
			y: procedure.profit,
			times: procedure.times,
			title: procedure.procedure.name
		}));
	}
	render() {
		return (
			<div>
				<BarChartComponent
					{...{
						height: 400,
						notStacked: true,
						data: {
							xLabels: this.values.map(x => x.title),
							bars: [
								{
									label: text("Profits"),
									data: this.values.map(x => x.y)
								},
								{
									label: text("Applied times"),
									data: this.values.map(x => x.times)
								}
							]
						}
					}}
				/>
			</div>
		);
	}
}

export const topPatientByPaymentChart: Chart = {
	Component,
	name: "Top 5 Patient by Payment",
	description: "Top 5 patient by payment",
	tags: "top 5 paitent by payment",
	className: "col-xs-12 col-lg-6"
};
