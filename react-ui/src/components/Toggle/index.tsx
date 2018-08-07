import * as React from "react";
import ReactToggle from "react-toggle";
import { ToggleLabel, ToggleName } from "./styledComponents";
import "./toggle.css";

interface Props {
    disabled?: boolean;
    name: string;
    children: JSX.Element;
    prepend?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

interface State {
    transactionUnderway: boolean;
}

class Toggle extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = { transactionUnderway: false };
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ transactionUnderway: true });
        this.props.onChange(e.currentTarget.checked);
        this.setState({ transactionUnderway: false });
    }

    render() {
        const { children } = this.props;

        return (
            <div>
                <ReactToggle
                    checked={this.props.checked}
                    disabled={this.state.transactionUnderway || this.props.disabled}
                    icons={false}
                    id={
                        this.props.prepend
                            ? this.props.prepend + "-" + this.props.name
                            : this.props.name
                    }
                    name={this.props.name}
                    onChange={this.handleChange}
                />
                <ToggleLabel>
                    <ToggleName>{children}</ToggleName>
                </ToggleLabel>
            </div>
        );
    }
}

export { Toggle };
