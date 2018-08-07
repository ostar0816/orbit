import styled from "styled-components";
import { color, fontFamily, fontSize } from "../../theme";
import { Modal } from "reactstrap";

export const PlexModalHeader = styled.div`
    background: rgb(31, 194, 205);
    background: linear-gradient(90deg, rgb(31, 194, 205) 0%, rgb(139, 227, 230) 100%);
    padding: 80px 20px 20px 20px;
    text-align: center;
`;

export const PlexModalTitle = styled.h2`
    color: ${color.white};
    font-size: ${fontSize.h2};
    font-family: ${fontFamily.bold};
`;

export const PlexModalBody = styled.div`
    padding: 20px;
`;

export const PlexStyledModal = styled(Modal)`
    .modal-content {
        border: none;
    }

    &.modal-dialog {
        @media (max-width: 568px) {
            width: 95%;
        }
    }
`;
