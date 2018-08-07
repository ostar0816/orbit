import { JSONSchema4 } from "json-schema";

export const schema: JSONSchema4 = {
    type: "object",
    properties: {
        inputText: {
            type: "string",
            title: "Input Text",
            description:
                "You can specify the description content inside the schema object, or uiSchema by using `ui:description`",
        },
        inputNumber: {
            type: "number",
            title: "Input Number",
        },
        group: {
            title: "This is the title of the grouped fields",
            type: "object",
            description:
                "Make sure you add `group-field` classNames for each fields inside the uiSchema",
            properties: {
                someInput: {
                    type: "string",
                    title: "Some input",
                },
                anotherInput: {
                    type: "string",
                    title: "Another input",
                },
            },
        },
        checkboxField: {
            type: "boolean",
            title: "This is a checkbox",
        },
        selectDropdown: {
            type: "string",
            title: "Select dropdown",
            enum: ["option1", "option2", "option3"],
            enumNames: ["Option 1", "Option 2", "Option 3"],
        },
        radioButton: {
            type: "string",
            title: "Radio Button",
            enum: ["option1", "option2", "option3"],
            enumNames: ["Option 1", "Option 2", "Option 3"],
            default: "option1",
        },
    },
};

export const uiSchema = {
    inputText: {
        "ui:placeholder": "Specify the placeholder text in the uiSchema",
        "ui:autofocus": true,
    },
    inputNumber: {
        "ui:placeholder": "This input only accepts number",
        "ui:help": "You can specify the help content inside uiSchema",
    },
    group: {
        someInput: {
            classNames: "group-field",
        },
        anotherInput: {
            classNames: "group-field",
        },
    },
    checkboxField: {
        "ui:widget": "CustomCheckbox",
        "ui:options": {
            label: false,
            required: true,
        },
    },
    selectDropdown: {
        "ui:placeholder": "Pick your selection here",
    },
    radioButton: {
        "ui:widget": "radio",
    },
};
