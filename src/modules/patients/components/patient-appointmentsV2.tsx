import {SectionComponent} from "@common-components";
import {text, user} from "@core";
import {
    Appointment, appointments,
    // AppointmentsListV2,
    Patient
} from "@modules";
import {AppointmentsListV2} from "../../../modules/_appointments/components/appointments-listV2";
import {computed} from "mobx";
import {observer} from "mobx-react";
import {DefaultButton, MessageBar, MessageBarType, PrimaryButton} from "office-ui-fabric-react";
import * as React from "react";

@observer
export class PatientAppointmentsPanelV2 extends React.Component<{
    patient : Patient;
    selectedProcedureId : string
}, {}> {
    @computed get appointments() {
        return appointments.list.filter(item => {
            console.log( "Item procedureid: "+ item.procedureId + "&&&" + this.props.selectedProcedureId );
            return( item.patientID === this.props.patient._id && item.procedureId === this.props.selectedProcedureId );
        });
    }

    @computed get canEdit() {
        return user.currentUser.canEditPatients;
    }

    @computed get procedure() {
        return this.props.patient.procedures.find(pro => pro.id === this.props.selectedProcedureId);
    }

    @computed get staffID() {
		return user.currentUser._id;
	}

    l : AppointmentsListV2 | null = null;

    render() {
        return (<div className="spa-panel appointments">
            <SectionComponent title={
                text(`Patient Appointments`)
            }>
                <AppointmentsListV2 ref={
                        l => (this.l = l)
                    }
                    patient={this.props.patient}
                    list={
                        this.appointments
                    }
                    procedure={
                        this.procedure
                    }/> {
                this.appointments.length ? ("") : (<MessageBar messageBarType={
                    MessageBarType.info
                }> {
                    text("This patient does not have any appointment")
                } </MessageBar>)
            }
                <br/> {
                this.canEdit ? (<DefaultButton onClick={
                        () => {
                          
                            const apt = new Appointment();
                            apt.patientID = this.props.patient._id;
                            apt.dentist = user.currentUser.name;
                            apt.finalPrice = this.procedure.fees * this.procedure.quantity;
                            // apt.paidAmount =  this.procedure.paid ? this.procedure.paid : 0;
                            apt.staffID.push(this.staffID)
                            apt.involvedTeeth = this.procedure.tooth;
                            apt.procedureId = this.procedure.id;
                            apt.date = new Date().getTime();
                            appointments.list.push(apt);
                            if (this.l) {
                                this.l.selectedAppointmentID = apt._id;
                            }                        
                        }
                    }
                    iconProps={
                        {iconName: "add"}
                    }
                    text={
                        text("Book new appointment")
                    }/>) : ("")
            } </SectionComponent>
        </div>);
    }
}
