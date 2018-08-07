import * as React from "react";
import {
    PlexStyledModal,
    PlexModalHeader,
    PlexModalTitle,
    PlexModalBody,
} from "./styledComponents";
import { color } from "../../theme";
import Icon from "../Icon/Icon";

interface Props {
    children: JSX.Element;
    title: JSX.Element | string;
    showModal: boolean;
    icon: string;
}

class PlexModal extends React.Component<Props, {}> {
    render() {
        const { icon, showModal, title, children } = this.props;

        return (
            <PlexStyledModal isOpen={showModal}>
                <PlexModalHeader>
                    <Icon icon={icon} size={40} color={color.white} paddingBottom={20} />
                    <PlexModalTitle>{title}</PlexModalTitle>
                </PlexModalHeader>
                <PlexModalBody>{children}</PlexModalBody>
            </PlexStyledModal>
        );
    }
}

export { PlexModal };
