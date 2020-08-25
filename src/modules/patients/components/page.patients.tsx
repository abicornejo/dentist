import {
  AsyncComponent,
  Col,
  DataTableComponent,
  ProfileComponent,
  ProfileSquaredComponent,
  Row,
  TagComponent,
  stringToTagType,
} from "@common-components";
import { router, text, user } from "@core";
import {
  genderToString,
  Patient,
  PatientAppointmentsPanel,
  PatientAppointmentsPanelV2,
  PatientGalleryPanel,
  PatientPaymentPanel,
  patients,
  staff,
  appointments,
  setting,
  insurances,
  EndoCase,
  endoCases,
  Diagnosis,
} from "@modules";
import { formatDate } from "@utils";
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import {
  Icon,
  IconButton,
  Panel,
  PanelType,
  PersonaInitialsColor,
  TooltipHost,
  Dropdown,
  Dialog,
  DialogType,
  ChoiceGroup,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  Button,
  TextField,
  Modal,
} from "office-ui-fabric-react";
import * as React from "react";
import { EditableListComponent } from "common-components/editable-list/editable-list";
import { format } from "date-fns";
import { Table } from "react-bootstrap";
import { DentalHistoryPanel } from "./dental-history";
import { PatientMedicalHistory } from './patient-medical.history';
import { PatientOverview } from './patient-overview';
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { parse, unparse } from "papaparse";
// import { moment } from 'moment';

@observer
export class PatientsPage extends React.Component<{}, {}> {
  state = {
    dialog: {
      open: false,
      procedureId: "",
      status: "",
    },
    endodontic: {
      open: false,
      endoCaseId: "",
    },
    tableTabIndex: 0,
    showMoreProcedure: true,
    viewAppointment: false,
    selectedProcedureId: "",
    showMoreReports: true,
    addNewReport: false,
    newReportValue: "",
    searchProcedure: ''
  };
  location = router.currentLocation.split("/");

  inputElement: any = null;

  @observable selectedId: string = this.location[1];

  @observable viewWhich: number =
    this.location.length === 3 ? 5 : this.location[1] ? 1 : 0;

  @computed get selectedCase() {
    return endoCases.list.find(
      (endoCase) => endoCase._id === this.state.endodontic.endoCaseId
    );
  }

  @computed
  get patient() {
    return patients.list.find((patient) => patient._id === this.selectedId);
  }

  getStaffByAppointment = (procedureId: string): string[] => {
    const foundAppointment = appointments.list.find(
      (appointment) => appointment.procedureId === procedureId
    );
    const staffName: string[] = [];
    if (foundAppointment && foundAppointment.staffID.length) {
      foundAppointment.staffID.forEach((id) => {
        const foundStaff = staff.list.find((s) => s._id === id);
        if (foundStaff) {
          staffName.push(foundStaff.name);
        }
      });
    }
    return staffName;
  };

  @computed get canEdit() {
    return user.currentUser.canEditPatients;
  }


  getFormatedTimeString = (formatedTime: number) => {

    let hr: any = new Date(formatedTime).getHours();
    let min: any = new Date(formatedTime).getMinutes();
    let isPast = '';
    if (hr > 12) {
      hr = hr - 12;
      hr = (hr > 10) ? hr : '0' + hr;
      isPast = " PM";
    } else {
      isPast = " AM";
    }

    if (min < 10) {
      min = '0' + min
    }

    return `${hr}:${min} ${isPast}`
  }

  getAppointementDate = (patientId: string) => {
    const filetredId = appointments.list.filter((obj) => obj.patientID === patientId)

    if (filetredId && filetredId.length) {
      return <React.Fragment>
        <label className={'columnText'}>Appointments date & time</label>
        {
          filetredId.map((obj) => {
            return <React.Fragment> <p style={{ float: 'left' }}>{
              formatDate(new Date(obj.date),
                setting.getSetting('date_format'),
                setting.getSetting("month_format"))
            }</p>
              <p style={{ float: 'right' }}>{
                this.getFormatedTimeString(obj.date)
              }</p>
            </React.Fragment >
          })
        }
      </React.Fragment>
    }
    return ''

  }

  onChange(e: any) {
    console.log(" Files: " + e.target.files[0].name);
    parse(e.target.files[0], {
      complete: (result: any) => {
        let datax = result.data;
        const found = datax.some(
          (e: any) =>
            e.id !== undefined &&
            e.name !== undefined &&
            e.birth !== undefined &&
            e.gender !== undefined &&
            e.tags !== undefined &&
            e.address !== undefined &&
            e.email !== undefined &&
            e.phone !== undefined &&
            e.labels !== undefined &&
            e.history !== undefined &&
            e.gallery !== undefined &&
            e.diagnosis !== undefined
        );
        if (found) {
          //alert('Working!')
          console.log("Found val: " + JSON.stringify(datax));
          for (let val of datax) {
            if (val.id !== "") {
              var patient = new Patient();
              var foundItem = patients.list.find(
                (patient) => patient._id === val.id
              );
              if (foundItem) {
                break;
              }

              console.log("Diagnosis val: " + JSON.parse(val.diagnosis).length);

              if (val.diagnosis) {
                patient.diagnosis = JSON.parse(JSON.stringify(val.diagnosis));
              }
              patient._id = val.id;
              patient.name = val.name;
              patient.birthYear = val.birth;
              patient.gender = val.gender;
              patient.tags = val.tags;
              patient.address = val.address;
              patient.email = val.email;
              patient.phone = val.phone;
              if (val.diagnosis) {
                JSON.parse(val.diagnosis).map((diag: any) => {
                  if (diag) {
                    const proc = new Diagnosis(diag);
                    patient.diagnosis.push(proc);

                    patient.teeth[Number(diag.tooth)].diagnosis_key = diag.name;

                    patient.teeth[Number(diag.tooth)].diagnosis_val =
                      diag.diagnosis;
                  }
                });
              }
              if (val.labels) {
                JSON.parse(val.labels).map((x: any) => {
                  patient.labels.push({
                    text: x.text,
                    type: stringToTagType(x.type),
                  });
                });
              }

              if (val.history) {
                patient.medicalHistory = JSON.parse(val.history);
              }
              if (val.gallery) {
                patient.gallery = JSON.parse(val.gallery);
              }
              patients.list.push(patient);
              alert("Added data into Patients Database");
            }
          }
        } else {
          alert(
            "Sorry, this CSV file does not match the required Format. Please get the proper format before Uploading."
          );
        }
        //console.log("CSV results:"+ JSON.stringify(result.data));
      },
      header: true,
    });
  }

  render() {
    let procedureList =
      this.patient &&
        this.patient.procedures &&
        this.patient.procedures.length > 1
        ? [...this.patient.procedures]
        : [];
    procedureList.reverse();
    procedureList.pop();
    if (this.state.showMoreProcedure) {
      procedureList.splice(3);
    }

    if (this.state.searchProcedure){
        procedureList = procedureList.filter(item => item.name.indexOf(this.state.searchProcedure) !== -1);
    }


    const reportsList =
      this.patient && this.patient.reports.length
        ? [...this.patient.reports]
        : [];
    reportsList.reverse();
    if (this.state.showMoreReports) {
      reportsList.splice(3);
    }
    return (
      <div className="patients-component p-15 p-l-10 p-r-10">
        <input
          type="file"
          name="import"
          onChange={this.onChange}
          ref={(input) => (this.inputElement = input)}
          accept=".csv"
          style={{ opacity: 0 }}
        />

        {this.patient ? (
          <Panel
            key={this.selectedId + this.viewWhich}
            isOpen={!!this.patient}
            type={
              this.viewWhich === 2 || this.viewWhich === 5 || this.viewWhich === 7
                ? PanelType.custom
                : PanelType.medium
            }
            customWidth={"100%"}
            closeButtonAriaLabel="Close"
            isLightDismiss={true}
            onDismiss={() => {
              this.selectedId = "";
              this.viewWhich = 0;
            }}
            onRenderNavigation={() => {
              return (
                <Row className="panel-heading">
                  <Col span={22}>
                    <ProfileComponent
                      name={this.patient!.name}
                      secondaryElement={
                        <div>
                          {this.viewWhich === 1 ? text("Patient Details") : ""}
                          {this.viewWhich === 2 ? text("Dental History") : ""}
                          {this.viewWhich === 3
                            ? text("Gallery and X-Rays")
                            : ""}
                          {this.viewWhich === 4
                            ? text("Patient Appointments")
                            : ""}
                          {this.viewWhich === 5 ? text("Financial") : ""}
                          {this.viewWhich === 6 ? text('Medical History') : ''}
                        </div>
                      }
                      size={3}
                    />
                  </Col>
                  <Col span={2} className="close">
                    <IconButton
                      iconProps={{ iconName: "cancel" }}
                      onClick={() => {
                        this.selectedId = "";
                        this.viewWhich = 0;
                      }}
                    />
                  </Col>
                </Row>
              );
            }}
          >
            {this.viewWhich === 1 ? (
              <AsyncComponent
                key=""
                loader={async () => {
                  const PatientDetailsPanel = (
                    await import("./patient-details")
                  ).PatientDetailsPanel;
                  return <PatientDetailsPanel patient={this.patient!} />;
                }}
              />
            ) : (
                ""
              )}
            {this.viewWhich === 2 ? (
              <div>
                <Panel
                  //  key={this.selectedId + this.state.viewAppointment}
                  isOpen={
                    this.state.viewAppointment || this.state.endodontic.open
                  }
                  type={PanelType.medium}
                  customWidth={"100%"}
                  closeButtonAriaLabel="Close"
                  isLightDismiss={true}
                  onDismiss={() => {
                    this.setState({
                      viewAppointment: false,
                      endodontic: { open: false, procedureId: "" },
                    });
                  }}
                  onRenderNavigation={() => {
                    return (
                      <Row className="panel-heading">
                        <Col span={22}>
                          <ProfileComponent
                            name={this.patient!.name}
                            secondaryElement={
                              <div>
                                {(this.state.viewAppointment &&
                                  text("Patient Appointments")) ||
                                  (this.state.endodontic.open &&
                                    text("Endodontic Case Sheet"))}
                              </div>
                            }
                            size={3}
                          />
                        </Col>
                        <Col span={2} className="close">
                          <IconButton
                            iconProps={{ iconName: "cancel" }}
                            onClick={() => {
                              this.setState({
                                viewAppointment: false,
                                endodontic: { open: false, procedureId: "" },
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    );
                  }}
                >
                  {this.state.endodontic.open ? (
                    <AsyncComponent
                      key=""
                      loader={async () => {
                        const EndoCaseSheetPanelV2 = (
                          await import("./case-sheetV2")
                        ).EndoCaseSheetPanelV2;
                        return (
                          <EndoCaseSheetPanelV2 orthoCase={this.selectedCase} />
                        );
                      }}
                    />
                  ) : (
                      ""
                    )}

                  {
                    console.log('this.state.selectedProcedureId ', this.state.selectedProcedureId)

                  }
                  {
                    console.log('this.patient ', this.patient)
                  }

                  {this.state.viewAppointment ? (<PatientAppointmentsPanelV2
                    selectedProcedureId={this.state.selectedProcedureId}
                    patient={this.patient}
                  />
                  ) : (
                      ""
                    )}
                </Panel>
                <div style={{ width: "100%" }}>
                  <div style={{ width: "100%", padding: "8px" }}>
                    {this.state.addNewReport ? (
                      <div>
                        <Modal isOpen={true} containerClassName="container">
                          <div className="modal-header">
                            <Row gutter={12}>
                              <Col sm={24}>
                                <h4>Add New Report</h4>
                              </Col>
                            </Row>
                          </div>
                          <div style={{ padding: "10px" }}>
                            <Row gutter={12}>
                              <Col sm={24}>
                                <TextField
                                  value={this.state.newReportValue}
                                  multiline
                                  autoAdjustHeight
                                  onChange={(ev, reportValue) =>
                                    this.setState({
                                      newReportValue: reportValue,
                                    })
                                  }
                                  style={{ width: "95%", height: "500px" }}
                                />
                              </Col>
                            </Row>
                            <Row gutter={12}>
                              <div style={{ float: "right" }}>
                                <DefaultButton
                                  text="Cancel"
                                  onClick={() => {
                                    this.setState({
                                      addNewReport: false,
                                      newReportValue: "",
                                    });
                                  }}
                                  style={{ "margin-right": "15px" }}
                                />
                                <PrimaryButton
                                  text="Save"
                                  onClick={() => {
                                    debugger;
                                    if (this.state.newReportValue !== "") {
                                      const reports = [
                                        ...this.patient.reports,
                                        this.state.newReportValue,
                                      ];
                                      this.patient.reports = reports;
                                      this.setState({
                                        addNewReport: false,
                                        newReportValue: "",
                                      });
                                    }
                                  }}
                                />
                              </div>
                            </Row>
                          </div>
                        </Modal>
                      </div>
                    ) : (
                        <DentalHistoryPanel
                          toggleProcedureTable={() =>
                            this.setState({ tableTabIndex: 1 })
                          }
                          patient={this.patient!}
                        // orthoCase={this.getOrthoCaseData()}
                        />
                      )}
                  </div>
                </div>
                {/* <div style={{ width: '100%', borderTop: '1px solid #999' }}>
									<AsyncComponent
										key=""
										loader={async () => {
											const ProceduresPanel = (await import("./patient-procedures"))
												.PatientProcedures;

											return (
												<ProceduresPanel patient={this.patient!} />

											);
										}}
									/>
								</div> */}
                <div
                  style={{
                    width: "100%",
                    borderTop: "1px solid #999",
                    marginTop: "20px",
                  }}
                >
                  <div className="d-flex mt-3">
                    <p
                      style={
                        this.state.tableTabIndex === 0
                          ? {
                            color: "#2d89ef",
                            padding: "10px",
                            cursor: "pointer",
                          }
                          : { padding: "10px", cursor: "pointer" }
                      }
                      onClick={() => {
                        this.setState({ tableTabIndex: 0 });
                      }}
                    >
                      Diagnosis Table
                    </p>
                    <p
                      style={
                        this.state.tableTabIndex === 1
                          ? {
                            color: "#2d89ef",
                            padding: "10px",
                            cursor: "pointer",
                          }
                          : { padding: "10px", cursor: "pointer" }
                      }
                      onClick={() => {
                        this.setState({ tableTabIndex: 1 });
                      }}
                    >
                      Procedure Table
                    </p>
                    <p
                      style={
                        this.state.tableTabIndex === 2
                          ? {
                            color: "#2d89ef",
                            padding: "10px",
                            cursor: "pointer",
                          }
                          : { padding: "10px", cursor: "pointer" }
                      }
                      onClick={() => {
                        this.setState({ tableTabIndex: 2 });
                      }}
                    >
                      Report
                    </p>
                  </div>
                  {this.state.tableTabIndex === 0 && (
                    <DataTableComponent
                      maxItemsOnLoad={3}
                      className={"patients-data-table"}
                      heads={[
                        text("Tooth No."),
                        text("Tooth Place"),
                        text("Diagnosis"),
                        text("Notes"),
                        text("Date"),
                        text("Delete"),
                      ]}
                      rows={this.patient.teeth
                        .filter((t) => t.diagnosis && t.diagnosis.id !== "")
                        .map((t, index) => ({
                          id: index + "tt",
                          searchableString: t.diagnosis.value,
                          cells: [
                            {
                              dataValue: t.ISO,
                              component: <p>{t.ISO}</p>,
                            },
                            {
                              dataValue: t.ISO,
                              component: <p>{t.Palmer}</p>,
                            },
                            {
                              dataValue: t.diagnosis.id,
                              component: <p>{t.diagnosis.value}</p>,
                            },
                            {
                              dataValue: "note",
                              component: (
                                <EditableListComponent
                                  label={text("History notes")}
                                  value={
                                    this.patient
                                      ? this.patient.teeth[t.ISO] ? this.patient.teeth[t.ISO].notes: []
                                      : []
                                  }
                                  disabled={!this.canEdit}
                                  onChange={(e) => {
                                    if (this.patient) {
                                      this.patient.teeth[t.ISO].notes = e;
                                      this.patient.triggerUpdate++;
                                    }
                                  }}
                                  style={{ width: "calc(100vw/4)" }}
                                />
                              ),
                            },
                            {
                              dataValue: t.diagnosis.date.toString(),
                              component: (
                                <p>
                                  {format(
                                    new Date(t.diagnosis.date),
                                    "dd/mm/yyyy"
                                  )}
                                </p>
                              ),
                            },
                            {
                              dataValue: "delete",
                              component: (
                                <IconButton
                                  className="action-button delete"
                                  iconProps={{
                                    iconName: "Trash",
                                  }}
                                  onClick={() => {
                                    this.patient
                                      ? (this.patient.teeth[t.ISO].diagnosis = {
                                        id: "",
                                        value: "",
                                        date: new Date(),
                                      })
                                      : null;
                                  }}
                                  disabled={!this.canEdit}
                                />
                              ),
                            },
                          ],
                        }))}
                    />
                  )}
                  {this.state.tableTabIndex === 1 && (
                    <React.Fragment>
                      {this.state.dialog.open && (
                        <Dialog
                          hidden={!this.state.dialog.open}
                          onDismiss={() => {
                            this.setState({
                              dialog: {
                                open: false,
                                procedureId: "",
                                status: "",
                              },
                            });
                          }}
                          dialogContentProps={{
                            type: DialogType.largeHeader,
                            title: "Status of procedure",
                          }}
                        >
                          <ChoiceGroup
                            selectedKey={this.state.dialog.status}
                            options={[
                              { key: "Completed", text: "Completed" },
                              { key: "Not Completed", text: "Not Completed" },
                              { key: "In Processing", text: "In Processing" },
                              { key: "Delayed", text: "Delayed" },
                              { key: "Discontinued", text: "Discontinued" },
                            ]}
                            onChange={(key, value) => {
                              this.setState({
                                dialog: {
                                  ...this.state.dialog,
                                  status: value.key.toString(),
                                },
                              });
                            }}
                          />
                          <DialogFooter>
                            <PrimaryButton
                              disabled={!this.state.dialog.status}
                              onClick={() => {
                                const { procedures } = this.patient;
                                const newPro = procedures.map((procedure) => {
                                  if (
                                    this.state.dialog.procedureId ===
                                    procedure.id
                                  ) {
                                    procedure.status = this.state.dialog.status;
                                  }
                                  return procedure;
                                });
                                const i = appointments.list.findIndex(
                                  (app) =>
                                    app.procedureId ===
                                    this.state.dialog.procedureId
                                );
                                if (i > -1) {
                                  appointments.list[
                                    i
                                  ].status = this.state.dialog.status;
                                  if (
                                    this.state.dialog.status === "Completed"
                                  ) {
                                    appointments.list[i].isDone = true;
                                  } else {
                                    appointments.list[i].isDone = false;
                                  }
                                }
                                this.patient.procedures = newPro;
                                this.setState({
                                  dialog: {
                                    open: false,
                                    procedureId: "",
                                    status: "",
                                  },
                                });
                              }}
                              text="Save"
                            />
                            <DefaultButton
                              onClick={() => {
                                this.setState({
                                  dialog: {
                                    open: false,
                                    procedureId: "",
                                  },
                                });
                              }}
                              text="Cancel"
                            />
                          </DialogFooter>
                        </Dialog>
                      )}
                      <input onChange={(e) => this.setState({searchProcedure : e.target.value})} style={{float: 'right' }} type="text" placeholder="search" value={this.state.searchProcedure} />
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Action</th>
                            <th>Tooth No</th>
                            <th>Tooth Place</th>
                            <th>Created On</th>
                            <th>Procedure</th>
                            <th>Surface</th>
                            <th>Status</th>
                            <th>Note</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Dentist</th>
                            <th>Appointment</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {procedureList.map((pro, index) => (
                            <tr key={index}>
                              <td>
                                <div style={{ display: "flex" }}>
                                  <TooltipHost content={text("Change status")}>
                                    <IconButton
                                      className="action-button"
                                      iconProps={{
                                        iconName: "DietPlanNotebook",
                                      }}
                                      onClick={() => {
                                        this.setState({
                                          dialog: {
                                            open: true,
                                            procedureId: pro.id,
                                            status: pro.status,
                                          },
                                        });
                                      }}
                                    />
                                  </TooltipHost>
                                  <TooltipHost content={text("Add endo")}>
                                    <IconButton
                                      className="action-button"
                                      onClick={() => {
                                        if (pro.endoCaseId) {
                                          this.setState({
                                            endodontic: {
                                              open: true,
                                              endoCaseId: pro.endoCaseId,
                                            },
                                          });
                                        } else {
                                          const orthoCase = new EndoCase();

                                          const { procedures } = this.patient;
                                          const newPro = procedures.map(
                                            (procedure) => {
                                              if (pro.id === procedure.id) {
                                                procedure.endoCaseId =
                                                  orthoCase._id;
                                              }
                                              return procedure;
                                            }
                                          );
                                          endoCases.list.push(orthoCase);
                                          this.patient.procedures = newPro;
                                          this.setState({
                                            endodontic: {
                                              open: true,
                                              endoCaseId: orthoCase._id,
                                            },
                                          });
                                        }
                                      }}
                                      iconProps={{
                                        iconName: "link",
                                      }}
                                    />
                                  </TooltipHost>
                                </div>
                              </td>
                              <td>
                                {pro.tooth!.length > 0 &&
                                  pro.tooth.map((t) => `${t} `)}
                              </td>
                              <td>
                                {pro.tooth.map(
                                  (t) => this.patient.teeth[t].Palmer
                                )}
                              </td>
                              <td>{new Date(pro.date).toLocaleString()}</td>
                              <td>{pro.name}</td>
                              <td>
                                <TextField
                                  value={pro.surface}
                                  onChange={(e, value) => {
                                    const { procedures } = this.patient;
                                    const newPro = procedures.map(
                                      (procedure) => {
                                        if (procedure.id === pro.id) {
                                          procedure.surface = value;
                                        }
                                        return procedure;
                                      }
                                    );
                                    this.patient.procedures = newPro;
                                  }}
                                />
                              </td>
                              <td>{pro.status}</td>
                              <td>
                                <EditableListComponent
                                  label={text("History notes")}
                                  value={
                                    this.patient
                                      ? this.patient.teeth[pro.tooth[0]] ? this.patient.teeth[pro.tooth[0]].notes: []
                                      : []
                                  }
                                  disabled={!this.canEdit}
                                  onChange={(e) => {
                                    if (this.patient) {
                                      this.patient.teeth[
                                        pro.tooth[0]
                                      ].notes = e;
                                      this.patient.triggerUpdate++;
                                    }
                                  }}
                                  style={{
                                    width: "calc(40vw/4)",
                                    "margin-top": "0px",
                                    "padding-right": "10px",
                                  }}
                                />
                              </td>
                              <td>x{pro.quantity}</td>
                              <td>${pro.quantity * pro.fees}.00</td>
                              <td>
                                {this.getStaffByAppointment(pro.id).map(
                                  (name) => (
                                    <div>{name}</div>
                                  )
                                )}
                              </td>
                              <td>
                                <TooltipHost content={text("Add Appointment")}>
                                  <IconButton
                                    className="action-button"
                                    iconProps={{
                                      iconName: "Calendar",
                                    }}
                                    onClick={() => {
                                      this.setState({
                                        viewAppointment: true,
                                        selectedProcedureId: pro.id,
                                      });
                                      //  this.viewWhich = 4;
                                    }}
                                  />
                                </TooltipHost>
                              </td>
                              <td>
                                <TooltipHost content={text("Delete Procedure")}>
                                  <IconButton
                                    className="action-button delete"
                                    iconProps={{
                                      iconName: "Trash",
                                    }}
                                    onClick={() => {
                                      const procedures = this.patient.procedures.filter(
                                        (patientPro) => patientPro.id !== pro.id
                                      );
                                      this.patient.procedures = procedures;
                                    }}
                                  />
                                </TooltipHost>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      {procedureList && procedureList.length > 0 && (
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            this.setState({
                              showMoreProcedure: !this.state.showMoreProcedure,
                            })
                          }
                        >
                          {this.state.showMoreProcedure
                            ? "Load more"
                            : "Load less"}
                        </button>
                      )}
                    </React.Fragment>
                  )}

                  {this.state.tableTabIndex === 2 && (
                    <>
                      <div style={{ float: "right" }}>
                        <DefaultButton
                          onClick={() => {
                            debugger;
                            this.setState({ addNewReport: true });
                          }}
                          iconProps={{ iconName: "add" }}
                          text={text("Add new report")}
                        />
                      </div>
                      <div>
                        <Table hover>
                          <thead>
                            <tr>
                              <th style={{ width: "15%" }}>Serial No.</th>
                              <th style={{ width: "75%" }}>Report</th>
                              <th style={{ width: "10%" }}>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportsList.map((report, index) => (
                              <tr key={index}>
                                <td>{`${index + 1}`}</td>
                                <td>
                                  {" "}
                                  <Col sm={24}>{report}</Col>
                                </td>
                                <td>
                                  <IconButton
                                    className="action-button delete"
                                    iconProps={{
                                      iconName: "Trash",
                                    }}
                                    onClick={(event) => {
                                      debugger;
                                      const rowIndex =
                                        event.target.parentNode.parentNode
                                          .parentNode.parentNode.rowIndex;
                                      const reportsRows = [
                                        ...this.patient.reports,
                                      ];
                                      reportsRows.reverse();
                                      reportsRows.splice(rowIndex - 1, 1);
                                      this.patient.reports = reportsRows;
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        {reportsList && reportsList.length > 0 && (
                          <button
                            className="btn btn-secondary"
                            onClick={() =>
                              this.setState({
                                showMoreReports: !this.state.showMoreReports,
                              })
                            }
                          >
                            {this.state.showMoreReports
                              ? "Load more"
                              : "Load less"}
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
                ""
              )}
            {this.viewWhich === 3 ? (
              <PatientGalleryPanel patient={this.patient} />
            ) : (
                ""
              )}
            {this.viewWhich === 4 ? (
              <PatientAppointmentsPanel patient={this.patient} />
            ) : (
                ""
              )}
            {this.viewWhich === 5 ? (
              <PatientPaymentPanel patient={this.patient} />
            ) : (
                ""
              )}
            {this.viewWhich === 6 ? (
              <PatientMedicalHistory patient={this.patient} />
            ) : ("")}
            {this.viewWhich === 7 ? (
              <PatientOverview patient={this.patient} />
            ) : ("")}
          </Panel>
        ) : (
            ""
          )}
        {
          console.log('patients -------', JSON.stringify(appointments))
        }
        <DataTableComponent
          maxItemsOnLoad={10}
          className={"patients-data-table"}
          heads={[
            text("ID"),
            text("Patient"),
            text("Contact"),
            text("Last/Next Appointment"),
            text("Total/Outstanding Payments"),
            text("Insurance"),
            text("Label"),
          ]}
          rows={patients.list.map((patient) => ({
            id: patient._id,
            searchableString: patient.searchableString,
            cells: [
              {
                dataValue: patient.datex,
                component: (
                  <div className={'clearfix'}>
                    <label className={'columnText'}># { patient._id } </label>
                    <br></br> <br></br>
                    {
                     /* formatDate(new Date(),
                        setting.getSetting('date_format'),
                        setting.getSetting("month_format"))*/
                    }
                   { new Date( Number(patient.datex) ).toDateString() }

                  </div>
                ),
                className: "no-label",
              },
              {
                dataValue:
                  patient.name +
                  " " +
                  patient.age +
                  " " +
                  genderToString(patient.gender),
                component: (
                  <div>
                    <ProfileComponent
                      name={patient.name}
                      secondaryElement={
                        <span>
                          {text(genderToString(patient.gender))} - {patient.age}{" "}
                          {text("years old")}
                        </span>
                      }
                      size={3}
                    />
                    <br />

                    <TooltipHost content={text("Patient Details")}>
                      <IconButton
                        className="action-button"
                        iconProps={{
                          iconName: "DietPlanNotebook",
                        }}
                        onClick={() => {
                          this.selectedId = patient._id;
                          this.viewWhich = 1;
                        }}
                      />
                    </TooltipHost>

                    <TooltipHost content={text("Dental History")}>
                      <IconButton
                        className="action-button"
                        iconProps={{
                          iconName: "Teeth",
                        }}
                        onClick={() => {
                          this.selectedId = patient._id;
                          this.viewWhich = 2;
                        }}
                      />
                    </TooltipHost>

                    <TooltipHost content={text("Gallery and X-Rays")}>
                      <IconButton
                        className="action-button"
                        iconProps={{
                          iconName: "PhotoCollection",
                        }}
                        onClick={() => {
                          this.selectedId = patient._id;
                          this.viewWhich = 3;
                        }}
                      />
                    </TooltipHost>

                    {user.currentUser.canViewAppointments ? (
                      <TooltipHost content={text("Patient Appointments")}>
                        <IconButton
                          className="action-button"
                          iconProps={{
                            iconName: "Calendar",
                          }}
                          onClick={() => {
                            this.selectedId = patient._id;
                            this.viewWhich = 4;
                          }}
                        />
                      </TooltipHost>
                    ) : (
                        ""
                      )}

                    <TooltipHost content={text("Medical History")}>
                      <IconButton
                        className="action-button"
                        iconProps={{
                          iconName: "AddEvent",
                        }}
                        onClick={() => {
                          this.selectedId = patient._id;
                          this.viewWhich = 6;
                        }}
                      />
                    </TooltipHost>


                    <TooltipHost content={text("Financial")}>
                      <IconButton
                        className="action-button"
                        iconProps={{
                          iconName: "FinancialSolid",
                        }}
                        onClick={() => {
                          this.selectedId = patient._id;
                          this.viewWhich = 5;
                        }}
                      />
                    </TooltipHost>

                    
                    <TooltipHost content={text("Overview")}>
                      <IconButton
                        className="action-button"
                        iconProps={{
                          iconName: "CompanyDirectory",
                        }}
                        onClick={() => {
                           this.selectedId = patient._id;
                           this.viewWhich = 7;
                        }}
                      />
                    </TooltipHost>

                    <TooltipHost content={text("WhatsApp")}>
                      <IconButton
                        className="action-button"
                        onClick={() => {
                          window.location.href = `https://web.whatsapp.com/send?phone=+${
                            patient.whatsapphone
                            }&text=${setting.getSetting("message_body")}`;
                        }}
                        onRenderIcon={() => (
                          <WhatsappIcon size={20} round crossOrigin />
                        )}
                      />
                    </TooltipHost>

                    <TooltipHost content={text("SMS")}>
                      <IconButton
                        className="action-button"
                        iconProps={{
                          iconName: "Mail",
                        }}
                        onClick={() => this.setState({ smsDialog: true })}
                      />
                    </TooltipHost>

                    <TooltipHost content={text("Delete")}>
                      <IconButton
                        className="action-button delete"
                        iconProps={{
                          iconName: "Trash",
                        }}
                        onClick={() => patients.deleteModal(patient._id)}
                        disabled={!this.canEdit}
                      />
                    </TooltipHost>

                    <div
                      style={{
                        position: "relative",
                        "max-width": "32px",
                        left: "185px",
                        bottom: "90px",
                      }}
                    >
                      <TooltipHost
                        id="medical-history"
                        content={
                          <div styles={{ padding: "10px" }}>
                            <div>
                              <h6
                                style={{
                                  "text-align": "center",
                                  color: "#106ebe",
                                  "font-size": "12px",
                                  "font-weight": "600",
                                }}
                              >
                                Alerts
                              </h6>
                              {patient.alerts.trim() !== "" ? (
                                <li
                                  style={{
                                    "font-size": "12px",
                                    color: "rgb(102, 102, 102)",
                                  }}
                                >
                                  {patient.alerts}
                                </li>
                              ) : (
                                  <p style={{ "text-align": "center" }}>
                                    No Data
                                  </p>
                                )}
                            </div>
                            <div style={{ "margin-top": "10px" }}>
                              <h6
                                style={{
                                  "text-align": "center",
                                  color: "#106ebe",
                                  "font-size": "12px",
                                  "font-weight": "600",
                                }}
                              >
                                Allergies
                              </h6>
                              {patient.allergies.trim() !== "" ? (
                                <li
                                  style={{
                                    "font-size": "12px",
                                    color: "rgb(102, 102, 102)",
                                  }}
                                >
                                  {patient.allergies}
                                </li>
                              ) : (
                                  <p style={{ "text-align": "center" }}>
                                    No Data
                                  </p>
                                )}
                            </div>
                          </div>
                        }
                      >
                        <IconButton
                          className="action-button"
                          iconProps={{
                            iconName: "AddEvent",
                          }}
                          style={{ border: "none" }}
                        />
                      </TooltipHost>
                    </div>
                  </div>
                ),
                className: "no-label",
              },
              {
                dataValue: patient.phone,
                component: (
                  <div>
                    <label>
                      {" "}
                      <b>Phone: </b> {patient.phone}{" "}
                    </label>{" "}
                    <br></br> <br></br>
                    <label>
                      {" "}
                      <b>WhatsApp: </b>
                      {patient.whatsapphone}{" "}
                    </label>{" "}
                    <br></br> <br></br>
                    <label>
                      {" "}
                      <b> Email: </b> {patient.email}{" "}
                    </label>
                    <br></br> <br></br>
                    <label>
                      {" "}
                      <b> Address: </b>
                      {patient.address}{" "}
                    </label>{" "}
                    <br></br>
                  </div>
                ),
              },
              {
                dataValue: (
                  patient.lastAppointment ||
                  patient.nextAppointment || { date: 0 }
                ).date,
                component: (
                  <div>
                    <ProfileSquaredComponent
                      text={
                        patient.lastAppointment
                          ? patient.lastAppointment.treatment
                            ? patient.lastAppointment.treatment.type
                            : ""
                          : ""
                      }
                      subText={
                        patient.lastAppointment
                          ? formatDate(
                            patient.lastAppointment.date,
                            setting.getSetting("date_format")
                          )
                          : text("No last appointment")
                      }
                      size={3}
                      onRenderInitials={() => <Icon iconName="Previous" />}
                      onClick={() => { }}
                      initialsColor={
                        patient.lastAppointment
                          ? undefined
                          : PersonaInitialsColor.transparent
                      }
                    />
                    <br />
                    <ProfileSquaredComponent
                      text={
                        patient.nextAppointment
                          ? patient.nextAppointment.treatment
                            ? patient.nextAppointment.treatment.type
                            : ""
                          : ""
                      }
                      subText={
                        patient.nextAppointment
                          ? formatDate(
                            patient.nextAppointment.date,
                            setting.getSetting("date_format")
                          )
                          : text("No next appointment")
                      }
                      size={3}
                      onRenderInitials={() => <Icon iconName="Next" />}
                      onClick={() => { }}
                      initialsColor={
                        patient.nextAppointment
                          ? undefined
                          : PersonaInitialsColor.transparent
                      }
                    />
                  </div>
                ),
                className: "hidden-xs",
              },
              {
                dataValue: patient.totalPayments,
                component: (
                  <div>
                    <ProfileSquaredComponent
                      text={
                        setting.getSetting("currencySymbol") +
                        patient.totalPayments.toString()
                      }
                      subText={text("Payments made")}
                      size={3}
                      onRenderInitials={() => <Icon iconName="CheckMark" />}
                      onClick={() => { }}
                      initialsColor={
                        patient.totalPayments > 0
                          ? PersonaInitialsColor.darkBlue
                          : PersonaInitialsColor.transparent
                      }
                    />
                    <br />
                    <ProfileSquaredComponent
                      text={
                        setting.getSetting("currencySymbol") +
                        (patient.differenceAmount < 0
                          ? patient.outstandingAmount.toString()
                          : patient.differenceAmount > 0
                            ? patient.overpaidAmount.toString()
                            : "0")
                      }
                      subText={
                        patient.differenceAmount < 0
                          ? text("Outstanding amount")
                          : patient.differenceAmount > 0
                            ? text("Overpaid amount")
                            : text("No outstanding amount")
                      }
                      size={3}
                      onRenderInitials={() => <Icon iconName="Cancel" />}
                      onClick={() => { }}
                      initialsColor={
                        patient.differenceAmount !== 0
                          ? PersonaInitialsColor.darkRed
                          : PersonaInitialsColor.transparent
                      }
                    />
                  </div>
                ),
                className: "hidden-xs",
              },
              {
                dataValue: patient.insurance ? patient.insurance.name : "",
                component: (
                  <div>
                    <Dropdown
                      options={
                        insurances.list.map((insurance) => ({
                          key: insurance._id,
                          text: insurance.name,
                        })) as any
                      }
                      selectedKey={
                        patient.insurance ? patient.insurance._id : ""
                      }
                      onChange={(e, value) => {
                        const foundInsurance = insurances.list.find(
                          ({ _id }) => value.key === _id
                        );
                        const newPatient: any = patient;
                        newPatient.insurance = foundInsurance;
                        const i = patients.findIndexByID(patient._id);
                        patients.list[i] = newPatient;
                      }}
                    />
                  </div>
                ),
                className: "hidden-xs",
              },
              {
                dataValue: patient.labels.map((x) => x.text).join(","),
                component: (
                  <div>
                    {patient.labels.map((label, index) => {
                      return (
                        <TagComponent
                          key={index}
                          text={label.text}
                          type={label.type}
                        />
                      );
                    })}
                  </div>
                ),
                className: "hidden-xs",
              },
            ],
          }))}
          commands={
            this.canEdit
              ? [
                {
                  key: "addNew",
                  title: "Add new",
                  name: text("Add new"),
                  onClick: () => {
                    const patient = new Patient();
                    patient.datex = new Date().getTime().toString()
                    
                    patients.list.push(patient);
                    this.selectedId = patient._id;
                    this.viewWhich = 1;
                  },
                  iconProps: {
                    iconName: "Add",
                  },
                },
                {
                  key: "addImport",
                  title: "Import Patients",
                  name: text("Import Patients"),
                  onClick: () => {
                    this.inputElement.click();
                  },
                  iconProps: {
                    iconName: "Edit",
                  },
                },
                {
                  key: "addExport",
                  title: "Export Patients",
                  name: text("Export Patients"),
                  onClick: () => {
                    var d = confirm(
                      "Are you sure you want to export this Patient data?"
                    );
                    if (d) {
                      let patient: Patient[] = patients.list;
                      /*let fields = ["id", "name", "birthyear", "gender", "tags",
                       "address", "email", "phone", "labels", "history",
                       "gallery", "diagnosis", "age", "appointments", 
                       "Last appointments", "Next appointments", "Primary Teeth",
                        "Permanent teeth", "Total Payments", "Outstanding", 
                      "Over Paid Amount", "Difference Amount"]*/

                      let newpat = patient.map((pat) => {
                        return {
                          Id: pat._id,
                          Name: pat.name,
                          "Birth Year": pat.birthYear,
                          Gender: pat.gender,
                          Tags: pat.tags,
                          Address: pat.address,
                          Email: pat.email,
                          Phone: pat.phone,
                          Labels: pat.labels,
                          History: JSON.stringify(pat.medicalHistory),
                          Gallery: JSON.stringify(pat.gallery),
                          Diagnosis: JSON.stringify(pat.diagnosis),
                          Age: pat.age,
                          Appointments: JSON.stringify(pat.appointments),
                          "Last Appointments": JSON.stringify(
                            pat.lastAppointment
                          ),
                          "Next Appointments": JSON.stringify(
                            pat.nextAppointment
                          ),
                          "Primary Teeth": pat.nextAppointment,
                          "Permanent teeth": pat.hasPrimaryTeeth,
                          "Total Payments": pat.totalPayments,
                          Outstanding: pat.outstandingAmount,
                          "Over Paid Amount": pat.overpaidAmount,
                          "Difference Amount": pat.differenceAmount,
                        };
                      });

                      var csv = unparse(newpat);

                      var blob = new Blob([csv]);
                      var a = window.document.createElement("a");
                      a.href = window.URL.createObjectURL(blob);
                      a.download = "patients.csv";
                      document.body.appendChild(a);
                      a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                      document.body.removeChild(a);
                    }
                  },
                  iconProps: {
                    iconName: "Edit",
                  },
                },
              ]
              : []
          }
        />
      </div>
    );
  }
}
