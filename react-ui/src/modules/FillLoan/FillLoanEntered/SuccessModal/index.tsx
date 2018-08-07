import * as React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Bold } from "../../../../components";
import { shortenString } from "../../../../utils";
import { DoneButton } from "./styledComponents";

interface Props {
    modal: boolean;
    issuanceHash: string;
    onToggle: () => void;
    onRedirect: () => void;
}

class SuccessModal extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleToggle() {
        this.props.onToggle();
    }

    handleRedirect() {
        this.props.onRedirect();
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.modal}
                    toggle={this.handleToggle}
                    keyboard={false}
                    backdrop={"static"}
                >
                    <ModalHeader toggle={this.handleToggle}>Filled</ModalHeader>
                    <ModalBody>
                        You filled debt order <Bold>{shortenString(this.props.issuanceHash)}</Bold>.
                        You will find this order at the top of your dashboard.
                    </ModalBody>
                    <ModalFooter className="center">
                        <DoneButton className="button" onClick={this.handleRedirect}>
                            Done
                        </DoneButton>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export { SuccessModal };
