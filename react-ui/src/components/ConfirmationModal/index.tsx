import * as React from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ClipLoader } from "react-spinners";
import { MetamaskDependenciesContainer } from "./styledComponents";

interface Props {
    modal: boolean;
    title: string;
    content: JSX.Element;
    closeButtonText?: string;
    submitButtonText: string;
    onToggle?: () => void;
    onSubmit: () => void;
    disabled?: boolean;
    awaitingTx?: boolean;
    displayMetamaskDependencies?: boolean;
}

class ConfirmationModal extends React.Component<Props, {}> {
    public static defaultProps: Partial<Props> = {
        disabled: false,
    };

    constructor(props: Props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleToggle() {
        if (this.props.onToggle) {
            this.props.onToggle();
        }
    }

    handleSubmit() {
        this.props.onSubmit();
    }

    render() {
        const { disabled, awaitingTx, displayMetamaskDependencies } = this.props;

        const submitButtonClass = this.props.closeButtonText
            ? "button width-95"
            : "button width-100";

        return (
            <div>
                <Modal
                    isOpen={this.props.modal}
                    toggle={this.handleToggle}
                    keyboard={false}
                    backdrop={"static"}
                >
                    <ModalHeader toggle={this.handleToggle}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        {this.props.content}
                        {!!awaitingTx &&
                            !!displayMetamaskDependencies && (
                                <MetamaskDependenciesContainer>
                                    Please confirm the order on Metamask. If a pop up window is not
                                    opening, navigate to the upper right toolbar.
                                </MetamaskDependenciesContainer>
                            )}
                    </ModalBody>
                    <ModalFooter>
                        <Row className="button-container">
                            {this.props.closeButtonText && (
                                <Col>
                                    <Button
                                        className="button secondary width-95"
                                        disabled={!!disabled || !!awaitingTx}
                                        onClick={this.handleToggle}
                                    >
                                        {this.props.closeButtonText}
                                    </Button>
                                </Col>
                            )}
                            <Col className={"align-right"}>
                                <Button
                                    className={submitButtonClass}
                                    disabled={!!disabled || !!awaitingTx}
                                    onClick={this.handleSubmit}
                                >
                                    {this.props.submitButtonText}
                                    <ClipLoader
                                        size={12}
                                        color={"#FFFFFF"}
                                        loading={!!awaitingTx}
                                    />
                                </Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export { ConfirmationModal };
