import * as React from "react";
import { PaperLayout } from "../../layouts";
import { MainWrapper, Bold, A, P, Ol, Li, StyledButton } from "../../components";
import { TermsWrapper, Title, ButtonContainer } from "./styledComponents";
import { browserHistory } from "react-router";

interface Props {
    agreeToTerms: boolean;
    handleAgreeToTerms: (agree: boolean) => void;
}

class Terms extends React.Component<Props, {}> {
    dharmaLink = <A href="https://dharma.io/">dharma.io</A>;
    dharmaChatLink = <A href="https://chat.dharma.io/">chat.dharma.io</A>;
    privacyPolicy = (
        <A href="https://s3-us-west-2.amazonaws.com/dharma-assets/PrivacyPolicy.pdf">
            Privacy Policy
        </A>
    );
    terms = <A href="https://s3-us-west-2.amazonaws.com/dharma-assets/Terms.pdf">Terms of Use</A>;

    constructor(props: Props) {
        super(props);
        this.handleAgreeButtonClick = this.handleAgreeButtonClick.bind(this);
    }

    handleAgreeButtonClick() {
        this.props.handleAgreeToTerms(true);
        browserHistory.push("/request");
    }

    render() {
        return (
            <PaperLayout>
                <MainWrapper>
                    <TermsWrapper>
                        <Bold>
                            THIS PARAGRAPH CONTAINS AN IMPORTANT NOTICE. PLEASE READ IT CAREFULLY.
                            SECTION 14 AND SECTION 15 OF THIS DOCUMENT CONTAIN A BINDING ARBITRATION
                            PROVISION THAT REQUIRES ARBITRATION ON AN INDIVIDUAL BASIS (RATHER THAN
                            JURY TRIALS OR CLASS ACTIONS) AND LIMITS THE TIME PERIOD WITHIN WHICH
                            YOU MAY BRING A CLAIM AGAINST US.
                        </Bold>
                        <Title>DHARMA TERMS OF USE</Title>
                        <P>Last Modified: February 13, 2018</P>
                        <Ol>
                            <Li>
                                <Bold>Acceptance of the Terms of Use.</Bold> These Dharma Terms of
                                Use are entered into by and between you (acting in your capacity as
                                an employee or other representative of your company or other entity,
                                if applicable), and Dharma Labs Inc. ("Company", "we" or "us"). The
                                following terms and conditions, together with any documents they
                                expressly incorporate by reference (collectively, these "Terms of
                                Use"), govern your access to and use of our website, including any
                                content, functionality, and services offered on or through{" "}
                                {this.dharmaLink} or {this.dharmaChatLink} (the "Website"). Please
                                read these Terms of Use carefully before you start to use the
                                Website. By using the Website or by clicking to accept or agree to
                                the {this.terms}, you accept and agree to be bound by these Terms of
                                Use and our Dharma {this.privacyPolicy}, incorporated herein by
                                reference. If you do not want to agree to these Terms of Use or the
                                Privacy Policy, you must not access or use the Website.
                            </Li>
                            <Li>
                                <Bold>Changes to These Terms.</Bold> We reserve the right to change
                                these Terms of Use at any time upon notice. We may give notice by
                                posting the updated Terms of Use on the Website or by any other
                                reasonable means. You can review the most current version of our{" "}
                                {this.terms} at any time. The Terms of Use in effect at the time of
                                your use of the Website apply. Updated Terms of Use are binding on
                                you with respect to your use of the Website on or after the date
                                indicated in the updated Terms of Use. If you do not agree to the
                                updated Terms of Use, you must stop using the Website. Your
                                continued use of the Website after the date of the updated Terms of
                                Use will constitute your acceptance of the updated Terms of Use.
                            </Li>
                            <Li>
                                <Bold>Dharma Protocol.</Bold> The Company’s protocol for tokenized
                                debt agreements ("Dharma Protocol") enables users to interact on the
                                Ethereum blockchain. Certain functionality of the Dharma Protocol
                                may be available through the Website. However, the Company (a) is
                                not a party to any contract, including any debt agreements, entered
                                into between users of the Dharma Protocol, (b) does not act as a
                                lender or give loans using the Dharma Protocol or Website, (c) is
                                not a regulated marketplace, exchange, or intermediary of any kind,
                                and (d) does not otherwise enter into any agreements with or commit
                                to any obligations to any user of the Dharma Protocol. The Company
                                therefore is not liable or otherwise responsible for transactions,
                                damages, or liabilities arising out of activity that uses the Dharma
                                Protocol.
                            </Li>
                            <Li>
                                <Bold>Accessing the Website.</Bold> We reserve the right to withdraw
                                or amend this Website, and any service or material we provide on the
                                Website, in our sole discretion without notice. We will not be
                                liable if for any reason all or any part of the Website is
                                unavailable at any time or for any period. From time to time, we may
                                restrict access to some parts of the Website, or the entire Website,
                                to users, including registered users. To access the Website or some
                                of the resources it offers, you may be asked to provide certain
                                registration details or other information. It is a condition of your
                                use of the Website that all the information you provide on or in
                                connection with the Website is correct, current, and complete. You
                                consent to all actions we take consistent with our Privacy Policy
                                with respect to all information you provide to this Website,
                                including but not limited to through the use of any interactive
                                features on the Website ("User Submissions"). We may disable any
                                user name, password, or other identifier at any time, in our sole
                                discretion for any or no reason, including if, in our opinion, you
                                have violated any provision of these Terms of Use.
                            </Li>
                            <Li>
                                <Bold>Use of Information Provided by You.</Bold> We can use User
                                Submissions to contact you about our products or services. We will
                                use User Submissions in accordance with our Privacy Policy. You
                                acknowledge, represent and agree that any User Submission is
                                submitted voluntarily and is not confidential or proprietary, and
                                that your User Submission does not establish a relationship between
                                you and us. You grant the Company and its sublicensees a worldwide,
                                royalty-free, non-exclusive, transferable, perpetual and irrevocable
                                license to use, distribute, transmit, reproduce, modify, publish,
                                translate, publicly perform and display and create derivative works
                                of your User Submissions, except as otherwise prohibited by
                                applicable law or these Terms of Use. You waive any right to
                                compensation of any type for your User Submissions. You represent
                                and warrant that you have all the rights necessary to grant the
                                rights in this Section and that use of User Submissions by us does
                                not violate any law. You may not upload to, distribute, or otherwise
                                publish through the Website any content that is libelous,
                                defamatory, obscene, threatening, invasive of privacy or publicity
                                rights, abusive, illegal, or otherwise objectionable, or that may
                                constitute or encourage a criminal offense, violate the rights of
                                any party or that may otherwise give rise to liability or violate
                                any law.
                            </Li>
                            <Li>
                                <Bold>Intellectual Property Rights.</Bold> One of our primary goals
                                is to promote the adoption of our technology and protocols. You are
                                free to use (a) our Website materials that we allow the general
                                public to download and (b) the ideas and protocols explained on our
                                Website, including in our Tutorial. However, certain content and
                                technology powering our Website is owned by third parties (including
                                Company’s licensors and other providers of such content) and cannot
                                be freely used – for example, certain software used to host and
                                administer the Website.
                            </Li>
                            <Li>
                                <Bold>Permitted Uses.</Bold> You represent and warrant that (1) you
                                are at least 18 years of age; (2) you have full power and authority
                                to agree to these Terms of Use; (3) you are not located in, under
                                the control of, or a national or resident of any country subject to
                                sanctions by the United States; (4) you have not been placed on the
                                U.S. Department of Commerce’s Denied Persons List; (5) you are not
                                identified as a "Specially Designated National" by the United States
                                government; and (6) you will not access the Website if you have
                                previously been prohibited from doing so or if any laws prohibit you
                                from doing so. We do not intend for the Website to be used by
                                persons or entities in countries or jurisdictions that require us to
                                obtain a registration or license. If you are in such a country or
                                jurisdiction, you are not authorized to and agree that you will not
                                use the Website. You may use the Website only for lawful purposes
                                and in accordance with these Terms of Use. You agree not (a) to use
                                the Website in any way that violates any applicable federal, state,
                                local, or international law or regulation, (b) use the Website for
                                any unauthorized, fraudulent, or malicious purpose, (c) to engage in
                                any other conduct that restricts or inhibits anyone's use or
                                enjoyment of the Website, or which, as determined by us, may harm
                                the Company or users of the Website or expose them to liability, (d)
                                use the Website in any manner that could disable, overburden,
                                damage, or impair the site, (e) use any robot, spider, or other
                                automatic device, process, or means to access the Website for any
                                purpose, including monitoring or copying any of the material on the
                                Website, (f) to access systems, data or information not intended by
                                us to be made accessible to a user, (g) to obtain or attempt to
                                obtain any materials or information through any means not
                                intentionally made available by us; or (f) to use the Website for
                                any use other than the purpose for which it was intended. For
                                example, you will not use the Website in connection with money
                                laundering or the financing of terrorism.
                            </Li>
                            <Li>
                                <Bold>Reliance on Information Posted.</Bold> We do not warrant the
                                accuracy, completeness, or usefulness of any information presented
                                on or through the Website. Any reliance you place on such
                                information is strictly at your own risk. We disclaim all liability
                                and responsibility arising from any reliance placed on such
                                materials by you or any other visitor to the Website, or by anyone
                                who may be informed of any of its contents. Nothing on this Website
                                constitutes (a) advice or a recommendation of any kind (legal,
                                financial or otherwise), or (b) an indication of results that may be
                                achieved. Please consult with professional advisors in connection
                                with your use of the Website. The content on this Website is updated
                                frequently, including based on interaction with users of the
                                Website, but the Website’s content is not necessarily complete or
                                up-to-date. Any of the material on the Website may be out of date at
                                any given time, and we are under no obligation to update such
                                material. These Terms of Use and the Website do not constitute an
                                offer to sell or solicitation of an offer to buy securities.
                            </Li>
                            <Li>
                                <Bold>Tutorial for Educational Purposes Only.</Bold> Except with
                                respect to these Terms of Use, no actions you take related to the
                                Dharma Protocol Tutorial (“Tutorial”) will create a binding
                                contract, including a binding contract related to a loan, credit,
                                debt, security interest, secured transaction, or other financial
                                transaction. Nothing related to the Tutorial constitutes (a) an
                                offer for or acceptance of a contract or (b) an offer to sell or the
                                solicitation of an offer to buy anything, including without
                                limitation, any blockchain asset, currency, or cryptocurrency. YOU
                                ACKNOWLEDGE THAT THE TUTORIAL IS FOR EDUCATIONAL PURPOSES ONLY.
                                NOTHING ON THE TUTORIAL REPRESENTS OR HAS ANY RELATIONSHIP TO ANY
                                MONETARY VALUE OR ANY VALUE OUTSIDE OF THE WEBSITE, INCLUDING ANY
                                RELATIONSHIP TO ANY CURRENCY OR CRYPTOCURRENCY.
                            </Li>
                            <Li>
                                <Bold>Links from the Website.</Bold> If the Website contains links
                                to other sites and resources provided by third parties, these links
                                are provided for your convenience only. We have no control over the
                                contents of those sites or resources, and accept no responsibility
                                for them or for any loss or damage that may arise from your use of
                                them. If you decide to access any of the third-party websites linked
                                to this Website, you do so entirely at your own risk and subject to
                                the terms and conditions of use for such websites.
                            </Li>
                            <Li>
                                <Bold>Disclaimer of Warranties.</Bold> YOUR USE OF THE WEBSITE, ITS
                                CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE
                                AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR
                                ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND
                                "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
                                EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED
                                WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT
                                TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR
                                AVAILABILITY OF THE WEBSITE. WITHOUT LIMITING THE FOREGOING, NEITHER
                                THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR
                                WARRANTS THAT THE WEBSITE, ITS CONTENT, OR ANY SERVICES OBTAINED
                                THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR
                                UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR WEBSITE OR
                                THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
                                HARMFUL COMPONENTS, OR THAT THE WEBSITE OR ANY SERVICES OR ITEMS
                                OBTAINED THROUGH THE WEBSITE WILL OTHERWISE MEET YOUR NEEDS OR
                                EXPECTATIONS. TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY
                                HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
                                IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
                                WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR
                                PARTICULAR PURPOSE.
                            </Li>
                            <Li>
                                <Bold>Limitation of Liability.</Bold> TO THE FULLEST EXTENT PROVIDED
                                BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR
                                LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR
                                DIRECTORS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL,
                                CONSEQUENTIAL, OR PUNITIVE DAMAGES RELATED TO YOUR USE, OR INABILITY
                                TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE
                                WEBSITE OR SUCH OTHER WEBSITES, INCLUDING BUT NOT LIMITED TO
                                PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF
                                REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS,
                                LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY
                                TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN
                                IF FORESEEABLE. THE AGGREGATE LIABILITY OF COMPANY TO YOU FOR ALL
                                CLAIMS AND DAMAGES RELATED TO YOUR USE OR INABILITY TO USE THE
                                WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR
                                SUCH OTHER WEBSITES WILL NOT EXCEED $100 U.S. DOLLARS.<br />
                                <br />
                                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
                                DIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, LOSS, OR LIABILITY FROM
                                INTENTIONAL ACTS (INCLUDING FRAUD, FRAUDULENT MISREPRESENTATION, AND
                                FAILURE TO DISCLOSE DEFECTS), PRODUCT LIABILITY, OR FOR DEATH OR
                                PERSONAL INJURY. NOTHING IN THIS SECTION 12 WILL BE INTERPRETED AS
                                EXCLUDING LIABILITY THAT CANNOT UNDER APPLICABLE LAW BE EXCLUDED IN
                                THOSE JURISDICTIONS. IF YOU LIVE, OR ARE OTHERWISE SUBJECT TO THE
                                LAWS IN ONE OF THOSE JURISDICTIONS, ANY STATUTORY ENTITLEMENT
                                AVAILABLE TO YOU WILL BE DEEMED LIMITED TO THE EXTENT (IF AT ALL)
                                PERMISSIBLE UNDER THAT LAW, AND, IF LIMITATION IS NOT PERMITTED, THE
                                LIMITATIONS AND EXCLUSIONS IN THIS SECTION 12 MAY NOT APPLY TO YOU.
                            </Li>
                            <Li>
                                <Bold>Indemnification.</Bold> You agree to defend, indemnify, and
                                hold harmless the Company, its affiliates, licensors, and service
                                providers, and its and their respective officers, directors,
                                employees, contractors, agents, licensors, suppliers, successors,
                                and assigns from and against any third-party claims, liabilities,
                                damages, judgments, awards, losses, costs, expenses, or fees
                                (including reasonable attorneys' fees) arising out of or relating to
                                (a) your violation of these Terms of Use, (b) your use of the
                                Website or the Dharma Protocol, including use that results in any
                                transactions using the Dharma Protocol, (c) any User Submission made
                                by you, or (d) your violation of any other party’s rights or
                                applicable law.
                            </Li>
                            <Li>
                                <Bold>Arbitration and Governing Law.</Bold> YOU WILL SUBMIT ANY
                                DISPUTES ARISING FROM THE USE OF THESE TERMS OF USE OR THE WEBSITE,
                                INCLUDING DISPUTES ARISING FROM OR CONCERNING THEIR INTERPRETATION,
                                VIOLATION, INVALIDITY, NON- PERFORMANCE, OR TERMINATION, TO FINAL
                                AND BINDING ARBITRATION UNDER THE RULES OF ARBITRATION OF THE
                                AMERICAN ARBITRATION ASSOCIATION APPLYING CALIFORNIA LAW. THE SEAT
                                OR LEGAL PLACE OF ARBITRATION WILL BE IN CALIFORNIA. YOU AGREE TO
                                ARBITRATE IN YOUR INDIVIDUAL CAPACITY ONLY – NOT AS A REPRESENTATIVE
                                OR MEMBER OF A CLASS – AND YOU EXPRESSLY WAIVE ANY RIGHT TO FILE A
                                CLASS ACTION OR SEEK RELIEF ON A CLASS-ACTION BASIS. FURTHERMORE,
                                UNLESS YOU AND COMPANY AGREE IN WRITING, THE ARBITRATOR MAY NOT
                                CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS, AND MAY NOT OTHERWISE
                                PRESIDE OVER ANY FORM OF A REPRESENTATIVE OF CLASS PROCEEDING. ALL
                                ARBITRATION PROCEEDINGS ARE CONFIDENTIAL, UNLESS BOTH YOU AND
                                COMPANY AGREE OTHERWISE. ARBITRATION ORDERS AND AWARDS REQUIRED TO
                                BE FILED WITH APPLICABLE COURTS OF COMPETENT JURISDICTION ARE NOT
                                CONFIDENTIAL AND MAY BE DISCLOSED BY THE PARTIES TO SUCH COURTS. A
                                PARTY WHO IMPROPERLY DISCLOSES CONFIDENTIAL INFORMATION WILL BE
                                SUBJECT TO SANCTIONS. THE ARBITRATOR AND FORUM MAY DISCLOSE CASE
                                FILINGS, CASE DISPOSITIONS, AND OTHER CASE INFORMATION AS REQUIRED
                                BY A COURT ORDER OF PROPER JURISDICTION. These Terms of Use will be
                                governed by and construed in accordance with the laws of the State
                                of California, without giving effect to its conflict of laws
                                provisions.
                            </Li>
                            <Li>
                                <Bold>Limitation on Time to File Claims.</Bold> ANY CAUSE OF ACTION
                                OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OF
                                USE OR THE WEBSITE MUST BE COMMENCED WITHIN ONE YEAR AFTER THE CAUSE
                                OF ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS
                                PERMANENTLY BARRED.
                            </Li>
                            <Li>
                                <Bold>General.</Bold> If any provision of these Terms of Use is held
                                by a court of competent jurisdiction or arbitrator to be illegal,
                                invalid, or unenforceable, the remaining provisions will remain in
                                full force and effect. You and the Company intend that the
                                provisions of these Terms of Use be enforced to the fullest extent
                                permitted by applicable law. Accordingly, you and the Company agree
                                that if any provision is deemed unenforceable, where possible, it
                                will be modified to the extent necessary to make it enforceable,
                                which may include its deletion. The Company may assign these Terms
                                of Use, in whole or in part, at any time with or without notice to
                                you. You may not assign these Terms of Use or assign, transfer, or
                                sublicense your rights, if any, to access or use the Website or its
                                content, and any attempt by you to do so is void. The Company’s
                                failure to act with respect to a breach by you or others does not
                                waive its right to act with respect to subsequent or similar
                                breaches. A waiver will only be binding on the Company if it is in a
                                written document signed by the Company. These Terms of Use
                                (including any incorporated terms) constitute the entire agreement
                                between you and the Company with respect to the Website and its
                                contents. Both you and the Company warrant to each other that, in
                                entering into these Terms of Use, neither the Company or you have
                                relied on or will have any right or remedy based upon any statement,
                                representation, warranty, or assurance other than those expressly
                                stated in these Terms of Use. The preceding sentence will not limit
                                or exclude any liability that cannot be limited or excluded under
                                applicable law. No one other than you and the Company, or the
                                Company’s successors and assigns, will have any right to enforce any
                                of these Terms of Use. Neither these Terms of Use nor the Website
                                create partnership, joint venture, employment, or other agency
                                relationships between us. You may not enter into any contract on our
                                behalf or bind us in any way.
                            </Li>
                        </Ol>
                        {!this.props.agreeToTerms && (
                            <ButtonContainer>
                                <StyledButton onClick={this.handleAgreeButtonClick}>
                                    Yes, I agree
                                </StyledButton>
                            </ButtonContainer>
                        )}
                    </TermsWrapper>
                </MainWrapper>
            </PaperLayout>
        );
    }
}

export { Terms };
