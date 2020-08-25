(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[48],{

/***/ "./src/modules/endodontic/components/page.endodontic.tsx":
/*!***************************************************************!*\
  !*** ./src/modules/endodontic/components/page.endodontic.tsx ***!
  \***************************************************************/
/*! exports provided: EndoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EndoPage\", function() { return EndoPage; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @common-components */ \"./src/common-components/index.ts\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core */ \"./src/core/index.ts\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @modules */ \"./src/modules/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils */ \"./src/utils/index.ts\");\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/index.module.js\");\n/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! office-ui-fabric-react */ \"./node_modules/office-ui-fabric-react/lib/index.js\");\n/* harmony import */ var _patients_components_dental_history__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../patients/components/dental-history */ \"./src/modules/patients/components/dental-history.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n\n\n\n\nlet EndoPage = class EndoPage extends react__WEBPACK_IMPORTED_MODULE_9__[\"Component\"] {\n    constructor() {\n        super(...arguments);\n        this.showAdditionPanel = false;\n        this.newPatientName = \"\";\n        this.selectedId = \"\";\n        this.viewWhich = 0;\n    }\n    get selectedCase() {\n        return _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].list.find(endoCase => endoCase._id === this.selectedId);\n    }\n    get selectedPatient() {\n        if (this.selectedCase) {\n            if (this.selectedCase.patient) {\n                return this.selectedCase.patient;\n            }\n        }\n    }\n    get canEdit() {\n        return _core__WEBPACK_IMPORTED_MODULE_2__[\"user\"].currentUser.canEditOrtho;\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { className: \"orthodontic-cases-component p-15 p-l-10 p-r-10\" },\n            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"DataTableComponent\"], { maxItemsOnLoad: 10, className: \"orthodontic-cases-data-table\", heads: [\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Endodontic Patient\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Started/Finished Laboratory\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Last/Next Appointment\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Total/Outstanding Payments\")\n                ], rows: _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].filtered\n                    .filter(orthoCase => orthoCase.patient)\n                    .map(orthoCase => {\n                    const patient = orthoCase.patient || new _modules__WEBPACK_IMPORTED_MODULE_3__[\"Patient\"]();\n                    return {\n                        id: orthoCase._id,\n                        searchableString: orthoCase.searchableString,\n                        cells: [\n                            {\n                                dataValue: patient.name,\n                                component: (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null,\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileComponent\"], { name: patient.name, secondaryElement: react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"span\", null,\n                                            Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(Object(_modules__WEBPACK_IMPORTED_MODULE_3__[\"genderToString\"])(patient.gender)),\n                                            \" \",\n                                            \"- \",\n                                            patient.age,\n                                            \" \",\n                                            Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"years old\")), size: 3 }),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"br\", null),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient Details\") },\n                                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                                iconName: \"DietPlanNotebook\"\n                                            }, onClick: () => {\n                                                this.selectedId =\n                                                    orthoCase._id;\n                                                this.viewWhich = 1;\n                                            } })),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Dental History\") },\n                                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                                iconName: \"Teeth\"\n                                            }, onClick: () => {\n                                                this.selectedId =\n                                                    orthoCase._id;\n                                                this.viewWhich = 2;\n                                            } })),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Endodontic Case Sheet\") },\n                                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                                iconName: \"GroupedList\"\n                                            }, onClick: () => {\n                                                this.selectedId =\n                                                    orthoCase._id;\n                                                this.viewWhich = 3;\n                                            } })),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Orthodontic Album\") },\n                                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                                iconName: \"TripleColumn\"\n                                            }, onClick: () => {\n                                                this.selectedId =\n                                                    orthoCase._id;\n                                                this.viewWhich = 4;\n                                            } })),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Gallery and X-Rays\") },\n                                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                                iconName: \"PhotoCollection\"\n                                            }, onClick: () => {\n                                                this.selectedId =\n                                                    orthoCase._id;\n                                                this.viewWhich = 5;\n                                            } })),\n                                    _core__WEBPACK_IMPORTED_MODULE_2__[\"user\"].currentUser\n                                        .canViewAppointments ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient Appointments\") },\n                                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                                iconName: \"Calendar\"\n                                            }, onClick: () => {\n                                                this.selectedId =\n                                                    orthoCase._id;\n                                                this.viewWhich = 6;\n                                            } }))) : (\"\"),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Delete\") },\n                                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button delete\", iconProps: {\n                                                iconName: \"Trash\"\n                                            }, onClick: () => _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].deleteModal(orthoCase._id), disabled: !this.canEdit })))),\n                                className: \"no-label\"\n                            },\n                            {\n                                dataValue: orthoCase.isFinished\n                                    ? Infinity\n                                    : orthoCase.startedDate,\n                                component: (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null,\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: orthoCase.isStarted\n                                            ? Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"formatDate\"])(orthoCase.startedDate, _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"date_format\"), _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"month_format\"))\n                                            : \"\", subText: orthoCase.isStarted\n                                            ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Started Lab Order\")\n                                            : Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Has not started yet\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"info\" })), onClick: () => { }, initialsColor: orthoCase.isStarted\n                                            ? office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].teal\n                                            : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"br\", null),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: orthoCase.isFinished\n                                            ? Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"formatDate\"])(orthoCase.finishedDate, _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"date_format\"), _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"month_format\"))\n                                            : \"\", subText: orthoCase.isFinished\n                                            ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Finished Laboratory\")\n                                            : Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Has not finished yet\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"CheckMark\" })), onClick: () => { }, initialsColor: orthoCase.isFinished\n                                            ? office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].blue\n                                            : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }))),\n                                className: \"hidden-xs\"\n                            },\n                            {\n                                dataValue: (patient.nextAppointment || {\n                                    date: 0\n                                }).date,\n                                component: (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null,\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: patient.lastAppointment\n                                            ? patient\n                                                .lastAppointment\n                                                .treatment\n                                                ? patient\n                                                    .lastAppointment\n                                                    .treatment\n                                                    .item\n                                                : \"\"\n                                            : \"\", subText: patient.lastAppointment\n                                            ? Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"formatDate\"])(patient\n                                                .lastAppointment\n                                                .date, _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"date_format\"), _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"month_format\"))\n                                            : Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"No last appointment\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"Previous\" })), onClick: () => { }, initialsColor: patient.lastAppointment\n                                            ? undefined\n                                            : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"br\", null),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: patient.nextAppointment\n                                            ? patient\n                                                .nextAppointment\n                                                .treatment\n                                                ? patient\n                                                    .nextAppointment\n                                                    .treatment\n                                                    .item\n                                                : \"\"\n                                            : \"\", subText: patient.nextAppointment\n                                            ? Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"formatDate\"])(patient\n                                                .nextAppointment\n                                                .date, _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"date_format\"), _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"month_format\"))\n                                            : Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"No next appointment\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"Next\" })), onClick: () => { }, initialsColor: patient.nextAppointment\n                                            ? undefined\n                                            : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }))),\n                                className: \"hidden-xs\"\n                            },\n                            {\n                                dataValue: patient.totalPayments,\n                                component: (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null,\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"currencySymbol\") +\n                                            patient.totalPayments.toString(), subText: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Payments made\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"CheckMark\" })), onClick: () => { }, initialsColor: patient.totalPayments >\n                                            0\n                                            ? office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].darkBlue\n                                            : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"br\", null),\n                                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"currencySymbol\") +\n                                            (patient.differenceAmount <\n                                                0\n                                                ? patient.outstandingAmount.toString()\n                                                : patient.differenceAmount >\n                                                    0\n                                                    ? patient.overpaidAmount.toString()\n                                                    : \"0\"), subText: patient.differenceAmount <\n                                            0\n                                            ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Outstanding amount\")\n                                            : patient.differenceAmount >\n                                                0\n                                                ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Overpaid amount\")\n                                                : Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"No outstanding amount\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"Cancel\" })), onClick: () => { }, initialsColor: patient.differenceAmount !==\n                                            0\n                                            ? office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].darkRed\n                                            : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }))),\n                                className: \"hidden-xs\"\n                            }\n                        ]\n                    };\n                }), commands: this.canEdit\n                    ? [\n                        {\n                            key: \"addNew\",\n                            title: \"Add new\",\n                            name: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Add new\"),\n                            onClick: () => (this.showAdditionPanel = true),\n                            iconProps: {\n                                iconName: \"Add\"\n                            }\n                        }\n                    ]\n                    : [] }),\n            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Panel\"], { isOpen: this.showAdditionPanel, type: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PanelType\"].smallFixedFar, closeButtonAriaLabel: \"Close\", isLightDismiss: true, onDismiss: () => {\n                    this.showAdditionPanel = false;\n                } },\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"h4\", null, Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Choose patient\")),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"br\", null),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"TagInputComponent\"], { strict: true, value: [], options: _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].patientsWithNoOrtho.map(patient => ({\n                        key: patient._id,\n                        text: patient.name\n                    })), onAdd: val => {\n                        this.showAdditionPanel = false;\n                        const orthoCase = new _modules__WEBPACK_IMPORTED_MODULE_3__[\"EndoCase\"]();\n                        orthoCase.patientID = val.key;\n                        _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].list.push(orthoCase);\n                        this.selectedId = orthoCase._id;\n                        this.viewWhich = 3;\n                    }, placeholder: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(`Type to select patient`) }),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"br\", null),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"hr\", null),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"h4\", null, \"Or add new patient\"),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"br\", null),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TextField\"], { placeholder: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(`Patient name`), value: this.newPatientName, onChange: (e, v) => (this.newPatientName = v) }),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"DefaultButton\"], { onClick: () => {\n                        const newPatient = new _modules__WEBPACK_IMPORTED_MODULE_3__[\"Patient\"]();\n                        newPatient.name = this.newPatientName;\n                        const orthoCase = new _modules__WEBPACK_IMPORTED_MODULE_3__[\"EndoCase\"]();\n                        orthoCase.patientID = newPatient._id;\n                        _modules__WEBPACK_IMPORTED_MODULE_3__[\"patients\"].list.push(newPatient);\n                        _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].list.push(orthoCase);\n                        this.newPatientName = \"\";\n                        this.selectedId = orthoCase._id;\n                        this.viewWhich = 3;\n                    }, iconProps: {\n                        iconName: \"add\"\n                    }, text: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Add new\") })),\n            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Panel\"], { isOpen: !!(this.selectedCase &&\n                    this.selectedPatient &&\n                    this.viewWhich), type: this.viewWhich === 2 ? office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PanelType\"].custom : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PanelType\"].medium, customWidth: '100%', closeButtonAriaLabel: \"Close\", isLightDismiss: true, onDismiss: () => {\n                    this.selectedId = \"\";\n                    this.viewWhich = 0;\n                }, onRenderNavigation: () => {\n                    if (!this.selectedCase) {\n                        return react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null);\n                    }\n                    if (!this.selectedPatient) {\n                        return react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null);\n                    }\n                    return (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Row\"], { className: \"panel-heading\" },\n                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { span: 22 },\n                            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileComponent\"], { name: this.selectedPatient.name, secondaryElement: react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"span\", null,\n                                    this.viewWhich === 1\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient Details\")\n                                        : \"\",\n                                    this.viewWhich === 2\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Dental History\")\n                                        : \"\",\n                                    this.viewWhich === 3\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Endodontic Case Sheet\")\n                                        : \"\",\n                                    this.viewWhich === 4\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Orthodontic Album\")\n                                        : \"\",\n                                    this.viewWhich === 5\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Gallery and X-Rays\")\n                                        : \"\",\n                                    this.viewWhich === 6\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient Appointments\")\n                                        : \"\"), size: 3 })),\n                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { span: 2, className: \"close\" },\n                            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { iconProps: { iconName: \"cancel\" }, onClick: () => {\n                                    this.selectedId = \"\";\n                                    this.viewWhich = 0;\n                                } }))));\n                } },\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null, this.selectedCase && this.selectedPatient ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { className: \"ortho-single-component\" },\n                    this.viewWhich === 1 ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"AsyncComponent\"], { key: \"patient-detail\", loader: () => tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](this, void 0, void 0, function* () {\n                            const PatientDetailsPanel = (yield __webpack_require__.e(/*! import() */ 9).then(__webpack_require__.bind(null, /*! ../../patients/components/patient-details */ \"./src/modules/patients/components/patient-details.tsx\")))\n                                .PatientDetailsPanel;\n                            return (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](PatientDetailsPanel, { patient: this.selectedPatient }));\n                        }) })) : (\"\"),\n                    this.viewWhich === 2 && (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null,\n                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { style: { width: '100%' } },\n                            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { style: { width: '65%', backgroundColor: '#fff', padding: '8px', marginLeft: 'auto' } },\n                                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_patients_components_dental_history__WEBPACK_IMPORTED_MODULE_8__[\"DentalHistoryPanel\"], { patient: this.selectedPatient, onClick: (val) => {\n                                        let diag = new _modules__WEBPACK_IMPORTED_MODULE_3__[\"Diagnosis\"]();\n                                        diag.id = val.key;\n                                        diag.name = val.name;\n                                        diag.tooth = Number(val.tooth);\n                                        diag.diagnosis = val.diagnosis;\n                                        this.selectedPatient.diagnosis.push(diag);\n                                    } })),\n                            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { style: { width: '100%', borderTop: '1px solid #999' } })))),\n                    this.viewWhich === 3 ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"AsyncComponent\"], { key: \"ortho-case-sheet\", loader: () => tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](this, void 0, void 0, function* () {\n                            const Component = (yield __webpack_require__.e(/*! import() */ 15).then(__webpack_require__.bind(null, /*! ./case-sheet */ \"./src/modules/endodontic/components/case-sheet.tsx\")))\n                                .EndoCaseSheetPanel;\n                            return this.selectedCase ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](Component, { orthoCase: this.selectedCase })) : (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null));\n                        }) })) : (\"\"),\n                    this.viewWhich === 4 ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"AsyncComponent\"], { key: \"ortho-records\", loader: () => tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](this, void 0, void 0, function* () {\n                            const Component = (yield __webpack_require__.e(/*! import() */ 16).then(__webpack_require__.bind(null, /*! ./records */ \"./src/modules/endodontic/components/records.tsx\")))\n                                .OrthoRecordsPanel;\n                            return this.selectedCase ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](Component, { orthoCase: this.selectedCase })) : (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null));\n                        }) })) : (\"\"),\n                    this.viewWhich === 5 ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"AsyncComponent\"], { key: \"ortho-gallery\", loader: () => tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](this, void 0, void 0, function* () {\n                            const Component = (yield __webpack_require__.e(/*! import() */ 34).then(__webpack_require__.bind(null, /*! ./ortho-gallery */ \"./src/modules/endodontic/components/ortho-gallery.tsx\")))\n                                .OrthoGalleryPanel;\n                            return this.selectedCase ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](Component, { orthoCase: this.selectedCase })) : (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", null));\n                        }) })) : (\"\"),\n                    this.viewWhich === 6 ? (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_modules__WEBPACK_IMPORTED_MODULE_3__[\"PatientAppointmentsPanel\"], { patient: this.selectedPatient })) : (\"\"))) : (\"\")))));\n    }\n};\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], EndoPage.prototype, \"showAdditionPanel\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], EndoPage.prototype, \"newPatientName\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], EndoPage.prototype, \"selectedId\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], EndoPage.prototype, \"viewWhich\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"computed\"]\n], EndoPage.prototype, \"selectedCase\", null);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"computed\"]\n], EndoPage.prototype, \"selectedPatient\", null);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"computed\"]\n], EndoPage.prototype, \"canEdit\", null);\nEndoPage = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx_react__WEBPACK_IMPORTED_MODULE_6__[\"observer\"]\n], EndoPage);\n\n\n\n//# sourceURL=webpack:///./src/modules/endodontic/components/page.endodontic.tsx?");

/***/ }),

/***/ "./src/modules/patients/components/dental-history.tsx":
/*!************************************************************!*\
  !*** ./src/modules/patients/components/dental-history.tsx ***!
  \************************************************************/
/*! exports provided: DentalHistoryPanel */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Shorthand property assignments are valid only in destructuring patterns (401:41)\\nYou may need an appropriate loader to handle this file type.\\n|                                 value: text(diagnosisData[c]),\\n|                                 title: diagnosisData[c].title,\\n>                                 onChange = {}()\\n|                             })) }),\\n|                         \\\" undefined} }))} searchable=\\\",\");\n\n//# sourceURL=webpack:///./src/modules/patients/components/dental-history.tsx?");

/***/ })

}]);