import {
    Col,
    Row,
    DataTableComponent,
    AsyncComponent,
    ProfileComponent
} from "@common-components";
import {user, text} from "@core";
import {
    Patient,
    patients,
    Payment,
    setting,
    appointments
} from "@modules";
import {computed} from "mobx";
import {formatDate} from "@utils";
import {observer} from "mobx-react";
import {
    CommandBar,
    Checkbox,
    TextField,
    Dropdown,
    IconButton,
    Panel,
    PanelType
} from "office-ui-fabric-react";
import * as React from "react";
import {PaymentModal} from "./payment-modal";
import {parse} from "json2csv";
import {Procedures} from '../data';
import {Appointment} from 'modules/appointments';

@observer
export class PatientPaymentPanel extends React.Component < {
    patient : Patient;
} > {
    state = {
        viewWhich: 0,
        selectedPaymentId: "",
        openAppointment: false,
        checkedAppointmentIds: [""]
    };

    private selectid: string = "";
    private selectappointment: Appointment = undefined;

    @computed get canEdit() {
        return user.currentUser.canEditPatients;
    }

    @computed get formateToCsvData() {
        return this.props.patient.appointments.map(appointment => ({
            Id: appointment._id,
            Status: appointment.status,
            Price: appointment.finalPrice,
            Profit: appointment.profit,
            Paid: appointment.paidAmount,
            Remaining: appointment.outstandingAmount,
            Insurance: appointment.insuranceDetails.discount,
            Discount: appointment.discount,
            Description: appointment.notes,
            Tooth: appointment.involvedTeeth.join(", "),
            Procedure: appointment.procedureId,
            Date: new Date(appointment.date).toString()
        }));
    }

    handleChange = (id : string, key : string) => (e : any, value : string | number) => {
        const payments = this.props.patient.payments.map((payment : any) => {
            if (payment._id === id) {
                payment[key] = value;
            }
            return payment;
        });
        this.props.patient.payments = payments;
    };

    getProcedure = (id : string): Procedures => {
        if (this.props.patient && this.props.patient.procedures) {
            const newPro: Procedures = this.props.patient.procedures.find(pro => {
                return pro.id === id
            });
            return newPro;
        }
    };

    render() {
        const {viewWhich} = this.state;
        const {patient} = this.props;
        const {
            totalDues,
            totalDiscount,
            totalPaid,
            totalRemaining,
            totalProfit,
            totalOverpaid,
            totalInsurance
        } = patient.paymentDetails;
        return (
            <div className="payment">

                {
                viewWhich === 1 ? (
                    <AsyncComponent key="ae"
                        loader={
                            async () => {

                                const apt = new Appointment();
                                apt.patientID = this.props.patient._id;
                                apt.date = new Date().getTime();
                                appointments.list.push(apt);

                                const AppointmentEditorPanel = (await import ("../../appointments/components/appointment-editor")).AppointmentEditorPanel;
                                return (
                                    <AppointmentEditorPanel appointment={apt}
                                        onDismiss={
                                            () => { this.setState({ viewWhich: 0 }); }
                                        }
                                        onDelete={
                                            () => { this.setState({ viewWhich: 0 }); }
                                        }/>
                                );
                            }
                        }/>
                ) : ("")
            }


            {
                viewWhich === 2 ? (
                    <AsyncComponent key="ae"
                        loader={
                            async () => {
                                const AppointmentEditorPanel = (await import ("../../appointments/components/appointment-editor")).AppointmentEditorPanel;
                                return (
                                    <AppointmentEditorPanel appointment={
                                            this.selectappointment
                                        }
                                        onDismiss={
                                            () => { this.setState({ viewWhich: 0 }); }
                                        }
                                        onDelete={
                                            () => { this.setState({ viewWhich: 0 }); }
                                        }/>
                                );
                            }
                        }/>
                ) : ("")
            }

                <Row gutter={6}>
                    <Col sm={4}>Total Dues : {
                        Number(totalRemaining) < 0 ? 0 : totalRemaining
                    }</Col>
                    <Col sm={4}>Discount : {totalDiscount}</Col>
                    <Col sm={4}>Paid : {totalPaid}</Col>
                    <Col sm={4}>Net Profit : {totalProfit}</Col>
                    {/* <Col sm={4}> { Number(totalRemaining) < 0 ? " Overpaid : " + totalOverpaid : " Outstanding : " + totalRemaining   } </Col> */}
                    <Col sm={4}>Insurance : {totalInsurance}</Col>
                </Row>

                <Row className="break-line"></Row>
                <Row className="payment-header">
                    <CommandBar items={
                        [{
                                key: "newPayment",
                                text: "New Payment",
                                iconProps: {
                                    iconName: "Add"
                                },
                                onClick: () => {
                                    this.setState({viewWhich: 1});
                                }

                            }]
                    }/>
                </Row>

                <Row> {
                    this.props.patient.appointments.length !== 0 && (
                        <DataTableComponent maxItemsOnLoad={3}
                            heads={
                                [
                                    "",
                                    text("Id"),
                                    text("Status"),
                                    text("Price"),
                                    text("Profit"),
                                    text("Paid"),
                                    text("Remaining"),
                                    text("Insurance") + "(%)",
                                    text("Discount") + "(%)",
                                    text("Description"),
                                    text("Tooth"),
                                    text("Dentist"),
                                    text("Procedure"),
                                    text("Date"),
                                    text("Signature"),
                                    text("Edit"),
                                    text("Delete")
                                ]
                            }
                            hideSearch={true}
                            rows={
                                this.props.patient.appointments.map((appointment, i) => ({
                                    id: i + "pp",
                                    cells: [
                                        {
                                            dataValue: "",
                                            component: (
                                                <Checkbox checked={
                                                        this.state.checkedAppointmentIds.includes(appointment._id)
                                                    }
                                                    onChange={
                                                        (event, value) => {
                                                            const {checkedAppointmentIds} = this.state;
                                                            if (value) {
                                                                checkedAppointmentIds.push(appointment._id);
                                                                this.setState({checkedAppointmentIds});
                                                            } else {
                                                                const index = checkedAppointmentIds.indexOf(appointment._id);
                                                                if (index > -1) {
                                                                    checkedAppointmentIds.splice(index, 1);
                                                                    this.setState({checkedAppointmentIds});
                                                                }
                                                            }
                                                        }
                                                    }/>
                                            )
                                        },
                                        {
                                            dataValue: appointment._id,
                                            component: <p>{
                                                appointment._id
                                            }</p>
                                        },
                                        {
                                            dataValue: appointment.status,
                                            component: (
                                                <p style={
                                                    {width: "150px"}
                                                }>
                                                    <Dropdown options={
                                                            [
                                                                "Unconfirmed",
                                                                "Confirmed",
                                                                "Checked In",
                                                                "In Progress",
                                                                "Completed",
                                                                "Cancelled",
                                                                "Missed",
                                                            ].map(x => ({key: x.toString(), text: x.toString()}))
                                                        }
                                                        selectedKey={
                                                            appointment.status
                                                        }
                                                        onChange={
                                                            (ev, val) => {
                                                                if (val.key.toString() === "Completed") {
                                                                    appointment.setIsDone(true);
                                                                    // this.props.appointment!.isDone = true;
                                                                } else {
                                                                    appointment.setIsDone(true);
                                                                    // this.props.appointment!.isDone = false;
                                                                }
                                                                if (patient && patient.procedures) {
                                                                    const newPro: any = patient.procedures.map(pro => {
                                                                        if (pro.id === appointment.procedureId) {
                                                                            pro.status = val.key.toString();
                                                                        }
                                                                        return pro;
                                                                    });
                                                                    patient.procedures = newPro;
                                                                }
                                                                appointment !.setStatus(val.key.toString());
                                                            }
                                                        }/>
                                                </p>
                                            )
                                        },
                                        {
                                            dataValue: appointment.finalPrice,
                                            component: <p>{
                                                appointment.finalPrice
                                            }</p>
                                        }, {
                                            dataValue: appointment.profit,
                                            component: <p>{
                                                appointment.profit
                                            }</p>
                                        }, {
                                            dataValue: appointment.paidAmount,
                                            component: <p>{
                                                appointment.paidAmount
                                            }</p>
                                        }, {
                                            dataValue: appointment.outstandingAmount,
                                            component: <p> {
                                                appointment.outstandingAmount < 0 ? 0 : appointment.outstandingAmount
                                            }</p>
                                        }, {
                                            dataValue: appointment.insuranceDetails.discount,
                                            component: <p>{
                                                appointment.insuranceDetails.discount
                                            }</p>
                                        }, {
                                            dataValue: appointment.discount,
                                            component: <p>{
                                                appointment.discount
                                            }</p>
                                        }, {
                                            dataValue: appointment.notes,
                                            component: <p>{
                                                appointment.notes
                                            }</p>
                                        }, {
                                            dataValue: appointment.involvedTeeth,
                                            component: <p>{
                                                appointment.involvedTeeth.join(", ")
                                            }</p>
                                        }
                                        , {
                                            dataValue: appointment.dentist,
                                            component: <p> {
                                                appointment.dentist
                                            }</p>
                                        }
                                        , {
                                            dataValue: appointment.procedureId,
                                            component: <p>{
                                                this.getProcedure(appointment.procedureId) && appointment.procedureId !== "" ? this.getProcedure(appointment.procedureId).name : appointment.procedureId
                                            }</p>
                                        }, {
                                            dataValue: appointment.date,
                                            component: (
                                                <p> {
                                                    formatDate(new Date(appointment.date), "dd/mm/yyyy")
                                                } </p>
                                            )
                                        }, {
                                            dataValue: "",
                                            component: <p>{""}</p>
                                        }, {
                                            dataValue: appointment._id,
                                            component: <IconButton iconProps={
                                                {iconName: "Edit"}
                                            }/>,
                                            onClick: () => {
                                              
                                                this.selectappointment = appointment
                                                this.setState({viewWhich: 2});
                                                console.log("Select Appointment: " + this.selectid)
                                            },
                                            className: "no-label"
                                        }, {
                                            dataValue: appointment._id,
                                            component: <IconButton iconProps={
                                                {iconName: "Delete"}
                                            }/>,
                                            onClick: () => {
                                                var del = confirm("Are you sure you want to delete Appointment?");
                                                if (del) {
                                                    // delete appointment
                                                    // var aparray = this.props.patient.appointments.filter(x => x._id !== payment.appointmentID);

                                                    appointments.deleteByID(appointment._id);

                                                    /*console.log("Delete Payment Old lenght: " + this.props.patient.payments.length)
                              var farray = this.props.patient.payments.filter(x => x._id !== payment._id);
                              this.props.patient.payments = farray;
                              console.log("Delete Payment New length: " + this.props.patient.payments.length) */
                                                }

                                            },
                                            className: "no-label"
                                        }
                                    ]
                                }))as any
                            }/>
                    )
                } </Row>
            </div>
        );
    }
}
