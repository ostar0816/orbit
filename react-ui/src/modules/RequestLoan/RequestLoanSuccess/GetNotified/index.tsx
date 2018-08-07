import * as React from "react";
import { Col, Form, FormGroup } from "reactstrap";
import { StyledLabel, StyledRow, EmailInput, NotifiedButton } from "./styledComponents";

interface Props {
    email: string;
    onInputChange: (email: string) => void;
    onFormSubmit: () => void;
}

class GetNotified extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        this.props.onInputChange(e.currentTarget.value);
    }

    handleSubmit(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        this.props.onFormSubmit();
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <StyledLabel>Get notified when your order is filled</StyledLabel>
                    <StyledRow>
                        <Col xs="12" md="8">
                            <EmailInput
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                value={this.props.email}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                        <Col xs="12" md="4">
                            <NotifiedButton type="submit" onClick={this.handleSubmit}>
                                Get Notified
                            </NotifiedButton>
                        </Col>
                    </StyledRow>
                </FormGroup>
            </Form>
        );
    }
}

export { GetNotified };
