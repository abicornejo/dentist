(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./src/common-components/editable-list/editable-list.tsx":
/*!***************************************************************!*\
  !*** ./src/common-components/editable-list/editable-list.tsx ***!
  \***************************************************************/
/*! exports provided: EditableListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EditableListComponent\", function() { return EditableListComponent; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @common-components */ \"./src/common-components/index.ts\");\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/index.module.js\");\n/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! office-ui-fabric-react */ \"./node_modules/office-ui-fabric-react/lib/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nlet EditableListComponent = class EditableListComponent extends react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"] {\n    constructor() {\n        super(...arguments);\n        this.valueToAdd = \"\";\n        this.expandIndex = -1;\n    }\n    addItem() {\n        if (this.valueToAdd.replace(/\\W/, \"\").length) {\n            this.props.value.push(this.valueToAdd);\n            this.valueToAdd = \"\";\n            (this.props.onChange || (() => { }))(this.props.value);\n        }\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](\"div\", { className: \"elc-c\", style: this.props.style },\n            react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](\"div\", { className: \"editable-list\" },\n                react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](\"div\", { className: \"input\", style: this.props.value.length\n                        ? {}\n                        : { borderBottom: \"none\" } },\n                    react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Row\"], null,\n                        react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { xs: this.props.disabled ? 24 : 20, sm: this.props.disabled ? 24 : 21 },\n                            react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](\"input\", { className: \"new-item-input\", style: this.props.value.length > 0\n                                    ? undefined\n                                    : { borderBottom: \"none\" }, placeholder: this.props.label || undefined, onKeyDown: keydown => {\n                                    if (keydown.keyCode === 13) {\n                                        this.addItem();\n                                        keydown.preventDefault();\n                                    }\n                                }, onKeyUp: keyUp => {\n                                    if (keyUp.keyCode === 13) {\n                                        this.addItem();\n                                        keyUp.preventDefault();\n                                    }\n                                }, value: this.valueToAdd, onChange: e => (this.valueToAdd = e.target.value), disabled: this.props.disabled })),\n                        react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { xs: 4, sm: 3, style: { textAlign: \"right\" } }, this.props.disabled ? (\"\") : (react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__[\"Icon\"], { className: \"input-icon\", iconName: \"Add\", onClick: () => {\n                                this.addItem();\n                            } }))))),\n                this.props.value.length ? (react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](\"div\", { className: \"items\" },\n                    react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__[\"DetailsList\"], { compact: true, items: [\n                            ...this.props.value.map((x, i) => [\n                                react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](\"div\", { id: i.toString() },\n                                    this.expandIndex === i ? (react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](\"div\", { className: \"list-item\" },\n                                        react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__[\"TextField\"], { multiline: true, value: x, onBlur: () => (this.expandIndex = -1), disabled: this.props.disabled, autoFocus: true, onChange: (e, val) => {\n                                                this.props.value[i] = val;\n                                                (this.props\n                                                    .onChange ||\n                                                    (() => { }))(this.props.value);\n                                            } }))) : (react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](\"div\", { className: \"el-expander\", onClick: () => {\n                                            this.expandIndex = i;\n                                        } }, x.length > 30\n                                        ? x.substr(0, 25) +\n                                            \"...\"\n                                        : x)),\n                                    react__WEBPACK_IMPORTED_MODULE_5__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__[\"IconButton\"], { className: \"delete\", iconProps: {\n                                            iconName: \"trash\"\n                                        }, onClick: e => {\n                                            this.expandIndex = -1;\n                                            this.props.value.splice(i, 1);\n                                            (this.props.onChange ||\n                                                (() => { }))(this.props.value);\n                                        }, disabled: this.props.disabled }))\n                            ])\n                        ], isHeaderVisible: false, selectionMode: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__[\"SelectionMode\"].none }))) : (\"\"))));\n    }\n};\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_2__[\"observable\"]\n], EditableListComponent.prototype, \"valueToAdd\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_2__[\"observable\"]\n], EditableListComponent.prototype, \"expandIndex\", void 0);\nEditableListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx_react__WEBPACK_IMPORTED_MODULE_3__[\"observer\"]\n], EditableListComponent);\n\n\n\n//# sourceURL=webpack:///./src/common-components/editable-list/editable-list.tsx?");

/***/ }),

/***/ "./src/modules/patients/components/patient-details.tsx":
/*!*************************************************************!*\
  !*** ./src/modules/patients/components/patient-details.tsx ***!
  \*************************************************************/
/*! exports provided: PatientDetailsPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PatientDetailsPanel\", function() { return PatientDetailsPanel; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _common_components_editable_list_editable_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common-components/editable-list/editable-list */ \"./src/common-components/editable-list/editable-list.tsx\");\n/* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @common-components */ \"./src/common-components/index.ts\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core */ \"./src/core/index.ts\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @modules */ \"./src/modules/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils */ \"./src/utils/index.ts\");\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/index.module.js\");\n/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! office-ui-fabric-react */ \"./node_modules/office-ui-fabric-react/lib/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n\n\n\n\nlet PatientDetailsPanel = class PatientDetailsPanel extends react__WEBPACK_IMPORTED_MODULE_9__[\"Component\"] {\n    get canEdit() {\n        return _core__WEBPACK_IMPORTED_MODULE_3__[\"user\"].currentUser.canEditPatients;\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { className: \"spd-pn\" },\n            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"SectionComponent\"], { title: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(`Basic Info`) },\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { className: \"name\" },\n                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_8__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(`Name`), value: this.props.patient.name, onChange: (ev, name) => (this.props.patient.name = name), disabled: !this.canEdit })),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"Row\"], { gutter: 6 },\n                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], { sm: 12 },\n                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { className: \"birth\" },\n                            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_8__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Birth year / age\"), value: this.props.patient.birthYear.toString(), onChange: (ev, year) => (this.props.patient.birthYear = Object(_utils__WEBPACK_IMPORTED_MODULE_5__[\"num\"])(year)), type: \"number\", disabled: !this.canEdit }))),\n                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], { sm: 12 },\n                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { className: \"gender\" },\n                            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_8__[\"Dropdown\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Gender\"), selectedKey: this.props.patient.gender === _modules__WEBPACK_IMPORTED_MODULE_4__[\"Gender\"].male\n                                    ? \"male\"\n                                    : \"female\", options: [\n                                    { key: \"male\", text: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Male\") },\n                                    { key: \"female\", text: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Female\") },\n                                ], onChange: (ev, val) => {\n                                    if (val.key === \"male\") {\n                                        this.props.patient.gender = _modules__WEBPACK_IMPORTED_MODULE_4__[\"Gender\"].male;\n                                    }\n                                    else {\n                                        this.props.patient.gender = _modules__WEBPACK_IMPORTED_MODULE_4__[\"Gender\"].female;\n                                    }\n                                }, disabled: !this.canEdit }))))),\n            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"SectionComponent\"], { title: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(`Contact Info`) },\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_8__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Phone\"), value: this.props.patient.phone, onChange: (ev, phone) => (this.props.patient.phone = phone), type: \"number\", disabled: !this.canEdit }),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_8__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"WhatsApp Phone\"), value: this.props.patient.whatsapphone, onChange: (ev, phone) => (this.props.patient.whatsapphone = phone), type: \"telephone\", disabled: !this.canEdit }),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_8__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Email\"), value: this.props.patient.email, onChange: (ev, email) => (this.props.patient.email = email), disabled: !this.canEdit }),\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_8__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Address\"), value: this.props.patient.address, onChange: (ev, address) => (this.props.patient.address = address), disabled: !this.canEdit })),\n            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"SectionComponent\"], { title: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(`Other Notes`) },\n                react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"Row\"], { gutter: 6 },\n                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], { md: 12 },\n                        \" \",\n                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"TagInputComponent\"], { disabled: !this.canEdit, className: \"patient-tags\", placeholder: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Labels\"), options: [\"\"]\n                                .concat(..._modules__WEBPACK_IMPORTED_MODULE_4__[\"patients\"].list.map((patient) => patient.labels.map((label) => label.text)))\n                                .map((x) => ({\n                                key: x,\n                                text: x,\n                            }))\n                                .reduce((arr, item) => {\n                                if (arr.findIndex((x) => x.key === item.key) === -1) {\n                                    arr.push(item);\n                                }\n                                return arr;\n                            }, []), onChange: (newVal) => {\n                                this.props.patient.labels = newVal.map((item) => {\n                                    return {\n                                        text: item.text,\n                                        type: Object(_common_components__WEBPACK_IMPORTED_MODULE_2__[\"getRandomTagType\"])(item.text),\n                                    };\n                                });\n                            }, value: this.props.patient.labels.map((label) => ({\n                                key: label.text,\n                                text: label.text,\n                            })) })),\n                    react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], { md: 12 },\n                        react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](\"div\", { className: \"medical-history\" },\n                            react__WEBPACK_IMPORTED_MODULE_9__[\"createElement\"](_common_components_editable_list_editable_list__WEBPACK_IMPORTED_MODULE_1__[\"EditableListComponent\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_3__[\"text\"])(\"Notes\"), value: this.props.patient.medicalHistory, onChange: (newVal) => {\n                                    this.props.patient.medicalHistory = newVal;\n                                }, style: { marginTop: \"0\" }, disabled: !this.canEdit })))))));\n    }\n};\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_6__[\"computed\"]\n], PatientDetailsPanel.prototype, \"canEdit\", null);\nPatientDetailsPanel = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx_react__WEBPACK_IMPORTED_MODULE_7__[\"observer\"]\n], PatientDetailsPanel);\n\n\n\n//# sourceURL=webpack:///./src/modules/patients/components/patient-details.tsx?");

/***/ })

}]);