import * as React from "react";
import { PressEnter } from "./PressEnter";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "./select.css";

export const CustomSelectDropdown = (props: any) => {
    let selectOptions: any[] = [];
    let onInputKeyDown = (event: any) => {
        switch (event.keyCode) {
            case 13:
                event.preventDefault();
                const highlightNextFieldEvent = new CustomEvent("highlightNextField", {
                    detail: { name: props.id },
                });
                window.dispatchEvent(highlightNextFieldEvent);
                break;
            default:
                break;
        }
    };
    props.options.enumOptions.map((opt: any) => {
        // TODO: Remove once we enable more loan types.  This is a hacky way of disabling the
        // options, but is also temporary.
        if (opt.label.includes("Coming Soon")) {
            selectOptions.push({ value: opt.value, label: opt.label, disabled: true });
        } else {
            selectOptions.push({ value: opt.value, label: opt.label });
        }
    });
    return (
        <div>
            <Select
                name={props.id}
                autoFocus={props.autofocus}
                options={selectOptions}
                value={props.value}
                onChange={(selected: any) => {
                    if (selected) {
                        props.onChange(selected.value);
                    }
                }}
                clearable={false}
                style={{ borderRadius: 0, borderColor: "#000000" }}
                disabled={props.disabled}
                onInputKeyDown={onInputKeyDown}
                placeholder={props.placeholder}
            />
            {(props.options.pressEnter || typeof props.options.pressEnter === "undefined") && (
                <PressEnter detailId={props.id} />
            )}
        </div>
    );
};
