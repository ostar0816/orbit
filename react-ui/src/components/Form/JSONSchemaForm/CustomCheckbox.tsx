import * as React from "react";
import { CheckboxLabel, Checkmark } from "./styledComponents";

export const CustomCheckbox = function(props: any) {
    return (
        <CheckboxLabel>
            <span>
                {props.schema.title} {props.required ? "*" : null}
            </span>
            <input type="checkbox" onChange={() => props.onChange(!props.value)} />
            <Checkmark />
        </CheckboxLabel>
    );
};
