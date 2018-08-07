import * as React from "react";
import { FormGroup, Input } from "reactstrap";
import { CheckboxLabel, Checkmark } from "./styledComponents";

interface Props {
    name: string;
    label: JSX.Element;
    prepend?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

class Checkbox extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.props.onChange(e.currentTarget.checked);
    }

    render() {
        return (
            <div>
                <FormGroup check={true}>
                    <CheckboxLabel check={true}>
                        {this.props.label}
                        <Input
                            type="checkbox"
                            name={this.props.name}
                            id={
                                this.props.prepend
                                    ? this.props.prepend + "-" + this.props.name
                                    : this.props.name
                            }
                            checked={this.props.checked}
                            onChange={this.handleChange}
                        />{" "}
                        <Checkmark />
                    </CheckboxLabel>
                </FormGroup>
            </div>
        );
    }
}

export { Checkbox };
