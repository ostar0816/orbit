import * as React from "react";
import { PressEnter } from "./PressEnter";

export const CustomBaseInput = (props: any) => {
    return (
        <div>
            <input
                type="text"
                className="form-control"
                id={props.id}
                name={props.id}
                placeholder={props.placeholder}
                required={props.required}
                disabled={props.disabled}
                readOnly={props.readonly}
                onChange={(event) => props.onChange(event.target.value)}
            />
            {(props.options.pressEnter || typeof props.options.pressEnter === "undefined") && (
                <PressEnter detailId={props.id} />
            )}
        </div>
    );
};
