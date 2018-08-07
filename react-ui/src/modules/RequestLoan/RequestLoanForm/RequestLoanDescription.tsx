// External libraries
import * as React from "react";

interface Props {}

export class RequestLoanDescription extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <p>
                    With this form, you can generate an <b>Open Debt Order</b> &mdash; a commitment
                    to borrowing at the terms that you specify below.
                </p>
                <p>
                    Generating an <b>Open Debt Order</b> is <i>entirely</i> free, but you will be
                    prompted to digitally sign your commitment.
                </p>
            </div>
        );
    }
}
