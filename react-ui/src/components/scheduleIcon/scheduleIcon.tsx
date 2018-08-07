import * as React from "react";

import { ScheduleIconImage, ScheduleIconDiv } from "./styledComponents";

interface Props {
    state: String;
}

class ScheduleIcon extends React.Component<Props, {}> {
    render() {
        const pastIcon = require("../../assets/img/ok_circle.png");
        const futureIcon = require("../../assets/img/circle_outline.png");

        const { state } = this.props;

        if (state === "past") {
            return <ScheduleIconImage src={pastIcon} />;
        } else if (state === "future") {
            return <ScheduleIconImage src={futureIcon} />;
        } else if (state === "missed") {
            return <ScheduleIconDiv>x</ScheduleIconDiv>;
        }

        return null;
    }
}

export { ScheduleIcon };
