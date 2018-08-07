import * as React from "react";
import { FieldTemplateProps } from "./typeDef";
import { Description, FieldWrapper, Error, Help } from "./styledComponents";

function FieldTemplate(props: FieldTemplateProps) {
    return (
        <FieldWrapper className={props.classNames + " field-wrapper"} key={props.id}>
            {props.displayLabel && (
                <label htmlFor={props.id}>
                    {props.label}
                    {props.required ? "*" : null}
                </label>
            )}
            {props.displayLabel && <Description>{props.rawDescription}</Description>}
            {props.children}
            {props.rawErrors &&
                props.rawErrors.map((error) => (
                    <Error className="field-error-message" key={error}>
                        {error}
                    </Error>
                ))}
            <Help>{props.help}</Help>
        </FieldWrapper>
    );
}
export { FieldTemplate };
