import * as React from "react";
import { schema, uiSchema } from "./schema";
import { MainWrapper, JSONSchemaForm } from "../../components";

interface FormResponse {
    formData: {};
}

class TestForm extends React.Component<{}, FormResponse> {
    constructor(props: {}) {
        super(props);
        this.state = {
            formData: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(formData: {}) {
        this.setState({
            formData: formData,
        });
    }

    handleSubmit() {
        console.log("Form submitted", this.state);
    }

    render() {
        return (
            <MainWrapper>
                <JSONSchemaForm
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={this.state.formData}
                    onHandleChange={this.handleChange}
                    onHandleSubmit={this.handleSubmit}
                />
            </MainWrapper>
        );
    }
}

export { TestForm };
