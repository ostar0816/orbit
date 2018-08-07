import * as React from "react";
import { StyledButton } from "../../StyledComponents";
import { JSONSchema4 } from "json-schema";
import { StyledForm, FieldWrapper } from "./styledComponents";
import { ObjectFieldTemplate } from "./ObjectFieldTemplate";
import { FieldTemplate } from "./FieldTemplate";
import { CustomCheckbox } from "./CustomCheckbox";
import { CustomBaseInput } from "./CustomBaseInput";
import { CustomSelectDropdown } from "./CustomSelectDropdown";
import { CustomTextarea } from "./CustomTextarea";
import { animateScroll as scroll } from "react-scroll";
import { PressEnter } from "./PressEnter";

interface FormResponse {
    formData: any;
}

interface Props {
    className?: string;
    schema: JSONSchema4;
    uiSchema?: {};
    formData: any;
    buttonText?: string;
    onHandleChange: (formData: any) => void;
    onHandleSubmit: () => void;
    validate?: (formData: any, errors: any) => any;
    transformErrors?: (errors: any[]) => any[];
}

const widgets = {
    CustomCheckbox: CustomCheckbox,
    BaseInput: CustomBaseInput,
    SelectWidget: CustomSelectDropdown,
    TextareaWidget: CustomTextarea,
};

const paddingTop = 200;
const fieldClassName = "field-wrapper";
const activeClassName = "active";
const pressEnterClassName = "press-enter";

function findAncestor(el: any, cls: string) {
    if (el && el.parentElement) {
        el = el.parentElement;
        while (!el.classList.contains(cls)) {
            el = el.parentElement;
            if (!el) {
                break;
            }
        }
    }
    return el;
}

function highlightNextSibling(el: any) {
    let parentElm = el.parentNode;
    let siblings = parentElm.childNodes;
    let foundCurrentObj: boolean = false;
    let nextSibling: any = el;
    let potentialSibling: any = el;
    let isButton: boolean = false;
    let siblingInputField: HTMLInputElement | null = null;

    const activeElms = document.querySelectorAll("." + fieldClassName + "." + activeClassName);
    const rootElm = activeElms[0];

    for (let sibling of siblings) {
        // First we find the current obj
        if (el === sibling) {
            foundCurrentObj = true;
            let pressEnterDivs = el.getElementsByClassName(pressEnterClassName);
            if (pressEnterDivs.length) {
                if (pressEnterDivs[0].classList.contains(activeClassName)) {
                    pressEnterDivs[0].classList.remove(activeClassName);
                }
            }
            continue;
        }
        if (foundCurrentObj) {
            // Once we found the current obj in the siblings list
            // The element with the same classname can be a potential next sibling
            if (sibling.classList.contains(fieldClassName)) {
                // If we found a match, want to make sure if it has an input field
                isButton = false;
                siblingInputField = sibling.querySelector("input");
                if (!siblingInputField) {
                    siblingInputField = sibling.querySelector("select");
                }
                if (!siblingInputField) {
                    siblingInputField = sibling.querySelector("textarea");
                }
                if (!siblingInputField) {
                    siblingInputField = sibling.querySelector("button");
                    isButton = true;
                }
                if (siblingInputField) {
                    if (siblingInputField.disabled) {
                        continue;
                    }
                    potentialSibling = findAncestor(siblingInputField, fieldClassName);
                    if (potentialSibling) {
                        siblingInputField.focus();
                        nextSibling = potentialSibling;
                        sibling.classList.add(activeClassName);
                        nextSibling.classList.add(activeClassName);
                        if (!isButton) {
                            el.classList.remove(activeClassName);
                        }

                        if (!siblingInputField.required || (siblingInputField.value && !isButton)) {
                            let pressEnterDivs = potentialSibling.getElementsByClassName(
                                pressEnterClassName,
                            );
                            if (pressEnterDivs.length) {
                                if (!pressEnterDivs[0].classList.contains(activeClassName)) {
                                    pressEnterDivs[0].classList.add(activeClassName);
                                }
                            }
                            // Check if this is the last element, we probably want to highlight the group
                            if (isLastElement(potentialSibling)) {
                                highlightGrandParentPressEnter(
                                    potentialSibling,
                                    siblingInputField.value,
                                    siblingInputField.required,
                                );
                            }
                        }

                        scroll.scrollTo(potentialSibling.offsetTop - paddingTop);
                        break;
                    }
                }
            }
        }
    }
    // If nextSibling is still the same as the original element, we probably need to move a level up
    if (nextSibling === el) {
        el.classList.remove(activeClassName);
        parentElm = findAncestor(el, fieldClassName);
        if (parentElm) {
            const activeChildren = parentElm.querySelectorAll(
                "." + fieldClassName + "." + activeClassName,
            );
            for (let activeChild of activeChildren as any) {
                activeChild.classList.remove(activeClassName);
            }
            // el.classList.remove(activeClassName);
            highlightNextSibling(parentElm);
        }
    } else {
        const grandParentElm = findAncestor(
            findAncestor(siblingInputField, fieldClassName),
            fieldClassName,
        );
        if (grandParentElm && grandParentElm !== rootElm) {
            siblings = grandParentElm.querySelectorAll("." + fieldClassName);
            for (let sibling of siblings as any) {
                if (!sibling.classList.contains(activeClassName)) {
                    sibling.classList.add(activeClassName);
                }
            }
        }
    }
}

function highlightElement(clickedElm: any) {
    let parentElm: any = clickedElm;
    if (!parentElm.classList.contains(fieldClassName)) {
        parentElm = findAncestor(clickedElm, fieldClassName);
        if (!parentElm) {
            return;
        }
    }
    if (parentElm.classList.contains(activeClassName)) {
        return;
    }

    // Removed all active elements
    const activeElms = document.querySelectorAll("." + fieldClassName + "." + activeClassName);
    const rootElm = activeElms[0];
    let counter = 0;
    for (let elm of activeElms as any) {
        // We don't want to remove root's active class
        if (counter === 0) {
            counter++;
            continue;
        }
        elm.classList.remove(activeClassName);
    }

    parentElm.classList.add(activeClassName);

    // Removed all active press enter elements
    let pressEnterDivs = document.getElementsByClassName(pressEnterClassName);
    if (pressEnterDivs.length) {
        for (let pressEnterDiv of pressEnterDivs as any) {
            if (pressEnterDiv.classList.contains(activeClassName)) {
                pressEnterDiv.classList.remove(activeClassName);
            }
        }
    }

    let inputField = parentElm.querySelector("input");
    if (!inputField) {
        inputField = parentElm.querySelector("select");
    }
    if (!inputField) {
        inputField = parentElm.querySelector("textarea");
    }
    if (inputField) {
        // If the field is disabled, do nothing
        if (inputField.disabled) {
            return;
        }
        const inputFieldParent = findAncestor(inputField, fieldClassName);
        if (inputFieldParent) {
            inputField.focus();
            inputFieldParent.classList.add(activeClassName);
            scroll.scrollTo(inputFieldParent.offsetTop - paddingTop);

            if (!inputField.required || inputField.value) {
                pressEnterDivs = inputFieldParent.getElementsByClassName(pressEnterClassName);
                if (pressEnterDivs.length) {
                    if (!pressEnterDivs[0].classList.contains(activeClassName)) {
                        pressEnterDivs[0].classList.add(activeClassName);
                    }
                }
                // Check if this is the last element, we probably want to highlight the group
                if (isLastElement(inputFieldParent)) {
                    highlightGrandParentPressEnter(
                        inputFieldParent,
                        inputField.value,
                        inputField.required,
                    );
                }
            }
        }
    }

    // We need to highlight the grandparent as well (Especially for grouped fields)
    const grandParentElm = findAncestor(findAncestor(inputField, fieldClassName), fieldClassName);
    if (grandParentElm && grandParentElm !== rootElm) {
        grandParentElm.classList.add(activeClassName);

        // If this is actually a grouped field, it should have siblings
        // and we want to highlight the sibligs as well
        const siblings = grandParentElm.querySelectorAll("." + fieldClassName);
        for (let sibling of siblings as any) {
            if (!sibling.classList.contains(activeClassName)) {
                sibling.classList.add(activeClassName);
            }
        }
    }
}

function isLastElement(el: any) {
    const siblings = el.parentNode.childNodes;
    if (el === siblings[siblings.length - 1]) {
        return true;
    } else {
        return false;
    }
}

function highlightGrandParentPressEnter(elm: any, value: any, required: boolean) {
    let grandParentElm = findAncestor(elm, fieldClassName);
    if (grandParentElm) {
        let pressEnterDivs = grandParentElm.getElementsByClassName(pressEnterClassName);
        // Display the last pressEnterDivs elm
        if (!required || (value && pressEnterDivs.length)) {
            pressEnterDivs[pressEnterDivs.length - 1].classList.add(activeClassName);
        } else {
            pressEnterDivs[pressEnterDivs.length - 1].classList.remove(activeClassName);
        }
    }
}

class JSONSchemaForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleHighlightNextField = this.handleHighlightNextField.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keypress", this.handleKeyPress);
        window.addEventListener("keyup", this.handleKeyUp);
        window.addEventListener("click", this.handleClick);
        window.addEventListener("highlightNextField", this.handleHighlightNextField);

        // Always set the root element as active
        const rootElm = document.querySelector("." + fieldClassName);
        if (rootElm) {
            rootElm.classList.add(activeClassName);
            // Then we want to highlight the first input child
            let inputField: any = rootElm.querySelector("input");
            if (!inputField) {
                inputField = rootElm.querySelector("select");
            }
            if (!inputField) {
                inputField = rootElm.querySelector("textarea");
            }
            if (inputField) {
                highlightElement(inputField);
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keypress", this.handleKeyPress);
        window.removeEventListener("keyup", this.handleKeyUp);
        window.removeEventListener("click", this.handleClick);
        window.removeEventListener("highlightNextField", this.handleHighlightNextField);
    }

    handleChange(response: FormResponse) {
        this.props.onHandleChange(response.formData);
    }

    handleSubmit() {
        this.props.onHandleSubmit();
    }

    handleError(response: FormResponse) {
        const fieldErrors = document.getElementsByClassName(
            "field-error-message",
        ) as HTMLCollectionOf<HTMLElement>;

        if (fieldErrors.length) {
            const rootElm = document.querySelector("." + fieldClassName);

            if (rootElm && !rootElm.classList.contains(activeClassName)) {
                rootElm.classList.add(activeClassName);
            }

            const firstError = fieldErrors[0];
            highlightElement(firstError);
        }
    }

    handleKeyPress(event: any) {
        if (event! && event!.key! && event!.target! && event.key === "Enter") {
            if (
                event.target.nodeName === "INPUT" ||
                event.target.nodeName === "SELECT" ||
                event.target.nodeName === "TEXTAREA"
            ) {
                event.preventDefault();
                let value: any = "";
                switch (event.target.nodeName) {
                    case "INPUT":
                    case "TEXTAREA":
                        value = event.target.value;
                        break;
                    case "SELECT":
                        value = event.target.options[event.target.selectedIndex].value;
                        break;
                    default:
                        break;
                }
                if (event.target.required && !value) {
                    return;
                }
                const parentElm = findAncestor(event.target, fieldClassName);
                if (parentElm) {
                    highlightNextSibling(parentElm);
                }
            } else if (event.target.nodeName === "BODY") {
                // If user press enter on body, then we want to either highlight the next sibling
                // Or trigger a form submission
                //
                const activeElms = document.querySelectorAll(
                    "." + fieldClassName + "." + activeClassName,
                );
                // We know that the first active elm is root
                // Check if the 2nd elm has press enter active
                if (activeElms.length > 1) {
                    let pressEnterDivs = activeElms[1].getElementsByClassName(pressEnterClassName);
                    if (
                        pressEnterDivs.length &&
                        pressEnterDivs[0].classList.contains(activeClassName)
                    ) {
                        const isButton = activeElms[1]!.querySelector("button")! ? true : false;
                        if (isButton) {
                            this.handleSubmit();
                        } else {
                            highlightNextSibling(activeElms[1]);
                        }
                    }
                }
            }
        }
    }

    handleKeyUp(event: any) {
        if (
            event! &&
            event!.key! &&
            event!.target! &&
            event.key !== "Enter" &&
            (event.target.nodeName === "INPUT" ||
                event.target.nodeName === "SELECT" ||
                event.target.nodeName === "TEXTAREA")
        ) {
            let value: any = "";
            switch (event.target.nodeName) {
                case "INPUT":
                case "TEXTAREA":
                    value = event.target.value;
                    break;
                case "SELECT":
                    value = event.target.options[event.target.selectedIndex].value;
                    break;
                default:
                    break;
            }
            if (event.key === "Tab") {
                highlightElement(event.target);
            } else {
                const parentElm = findAncestor(event.target, fieldClassName);
                if (parentElm && isLastElement(parentElm)) {
                    highlightGrandParentPressEnter(parentElm, value, event.target.required);
                }
            }
        }
    }

    handleClick(event: any) {
        if (event! && event!.target!) {
            highlightElement(event.target);
        }
    }

    handleHighlightNextField(event: any) {
        if (event.detail.name === "form_submit_button") {
            this.handleSubmit();
        } else {
            let elm = document.querySelector('input[name="' + event.detail.name + '"]');
            if (!elm) {
                elm = document.querySelector("div#" + event.detail.name);
            }
            if (elm) {
                const parentElm = findAncestor(elm, fieldClassName);
                if (parentElm) {
                    highlightNextSibling(parentElm);
                }
            }
        }
    }

    render() {
        return (
            <StyledForm
                autocomplete="off"
                className={this.props.className}
                schema={this.props.schema}
                uiSchema={this.props.uiSchema}
                formData={this.props.formData}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                onError={this.handleError}
                ObjectFieldTemplate={ObjectFieldTemplate}
                FieldTemplate={FieldTemplate}
                showErrorList={false}
                widgets={widgets}
                validate={this.props.validate}
                transformErrors={this.props.transformErrors}
            >
                <FieldWrapper className="field-wrapper button-container">
                    <StyledButton type="submit" className="button">
                        {this.props.buttonText || "Submit"}
                    </StyledButton>
                    <PressEnter detailId="form_submit_button" />
                </FieldWrapper>
            </StyledForm>
        );
    }
}

export { JSONSchemaForm };
