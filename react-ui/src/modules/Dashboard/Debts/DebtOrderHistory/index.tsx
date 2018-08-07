import * as React from "react";
import { FilledDebtEntity } from "../../../../models";
// import { formatDate } from '../../../../utils';
import { Col } from "reactstrap";
import { DebtOrderRowContainer } from "./DebtOrderRowContainer";
import { Wrapper, Title, TableHeaderRow } from "./styledComponents";

interface Props {
    debtEntities: FilledDebtEntity[];
}

class DebtOrderHistory extends React.Component<Props, {}> {
    render() {
        const { debtEntities } = this.props;
        return (
            <Wrapper>
                <Title>Past debts and loan request</Title>
                <TableHeaderRow>
                    <Col xs="3" md="2">
                        Amount
                    </Col>
                    <Col xs="3" md="2">
                        ID
                    </Col>
                    <Col xs="3" md="4">
                        Status
                    </Col>
                    <Col xs="3" md="4">
                        Terms
                    </Col>
                </TableHeaderRow>
                {debtEntities.map((debtEntity) => (
                    <DebtOrderRowContainer debtEntity={debtEntity} key={debtEntity.issuanceHash} />
                ))}
            </Wrapper>
        );
    }
}

export { DebtOrderHistory };
