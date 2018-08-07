import * as React from "react";
import { Row } from "reactstrap";
import {
    Wrapper,
    StyledLabel,
    GrayRow,
    ImageContainer,
    IdenticonImage,
    DetailContainer,
    ShareButtonsContainer,
    ShareButton,
    StyledFormGroup,
    InputContainer,
    RequestInput,
    ButtonContainer,
    CopyButton,
    CopiedMessage,
} from "./styledComponents";
import { getIdenticonImgSrc } from "../../../../utils";

interface Props {
    issuanceHash: string;
    shortUrl: string;
    onShareSocial: (socialMediaName: string) => void;
}

interface State {
    copied: boolean;
}

class ShareRequestURL extends React.Component<Props, State> {
    private requestInput: HTMLInputElement | null;

    constructor(props: Props) {
        super(props);
        this.state = {
            copied: false,
        };
        this.handleCopyClipboard = this.handleCopyClipboard.bind(this);
        this.handleShareSocial = this.handleShareSocial.bind(this);
    }

    handleCopyClipboard() {
        this.requestInput!.select();
        document.execCommand("copy");
        this.requestInput!.focus();
        this.setState({ copied: true });
    }

    handleShareSocial(socialMediaName: string, e: React.MouseEvent<HTMLDivElement>) {
        this.props.onShareSocial(socialMediaName);
    }

    render() {
        const { shortUrl, issuanceHash } = this.props;
        if (!shortUrl || !issuanceHash) {
            return null;
        }
        const socialButtons = [
            { name: "twitter", imgURL: require("../../../../assets/img/logo_twitter.png") },
            { name: "facebook", imgURL: require("../../../../assets/img/logo_facebook.png") },
        ];
        const socialButtonsRow = socialButtons.map((social) => (
            <ShareButton key={social.name} onClick={(e) => this.handleShareSocial(social.name, e)}>
                <img src={social.imgURL} />
            </ShareButton>
        ));
        const identiconImgSrc = getIdenticonImgSrc(issuanceHash, 100, 0.1);
        return (
            <Wrapper>
                <StyledLabel>Share your request URL</StyledLabel>
                <GrayRow>
                    <ImageContainer>
                        {identiconImgSrc && <IdenticonImage src={identiconImgSrc} />}
                    </ImageContainer>
                    <DetailContainer>
                        <ShareButtonsContainer>{socialButtonsRow}</ShareButtonsContainer>
                        <StyledFormGroup>
                            <Row>
                                <InputContainer>
                                    <RequestInput
                                        type="text"
                                        value={shortUrl}
                                        readOnly={true}
                                        innerRef={(input: HTMLInputElement) => {
                                            this.requestInput = input;
                                        }}
                                        onClick={this.handleCopyClipboard}
                                    />
                                    <CopiedMessage>
                                        {this.state.copied ? "Copied!" : ""}
                                    </CopiedMessage>
                                </InputContainer>
                                <ButtonContainer>
                                    <CopyButton
                                        className="button"
                                        type="submit"
                                        onClick={this.handleCopyClipboard}
                                    >
                                        Copy
                                    </CopyButton>
                                </ButtonContainer>
                            </Row>
                        </StyledFormGroup>
                    </DetailContainer>
                </GrayRow>
            </Wrapper>
        );
    }
}

export { ShareRequestURL };
