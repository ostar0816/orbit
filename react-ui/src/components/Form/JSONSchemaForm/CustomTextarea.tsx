import * as React from "react";
import { PressEnter } from "./PressEnter";

export const CustomTextarea = (props: any) => {
    return (
        <div>
            <textarea
                className="form-control"
                id={props.id}
                name={props.id}
                placeholder={props.placeholder}
                required={props.required}
                disabled={props.disabled}
                readOnly={props.readonly}
                onChange={(event) => props.onChange(event.target.value)}
                rows={props.options.rows ? props.options.rows : 3}
            />
            {(props.options.pressEnter || typeof props.options.pressEnter === "undefined") && (
                <PressEnter detailId={props.id} />
            )}
        </div>
    );
};
