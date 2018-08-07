// External Libraries
import * as React from "react";

export interface Props {
    icon: string;
    size?: number;
    color?: string;
    height?: string;
    marginRight?: string;
    paddingBottom?: number;
    opacity?: number;
}

export default class Icon extends React.Component<Readonly<Props>, {}> {
    render() {
        const { icon, size, color, height, marginRight, opacity, paddingBottom } = this.props;

        return (
            <i
                className={`fa fa-${icon}`}
                style={{
                    color,
                    marginRight,
                    fontSize: `${size || 28}px`,
                    lineHeight: height,
                    paddingBottom: `${paddingBottom || 0}px`,
                    opacity,
                }}
            />
        );
    }
}
