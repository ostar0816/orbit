import * as React from "react";
import * as _ from "lodash";
import { shallow, ShallowWrapper } from "enzyme";

import { Props, Walkthrough } from "../../../../src/components/Walkthrough/Walkthrough";

describe("Walkthrough (Unit)", () => {
    const DEFAULT_PROPS: Props = {
        finishWalkthrough: jest.fn(),
        tokens: [],
        walkthroughCompleted: false,
    };

    function generateComponent(props: Props = DEFAULT_PROPS): ShallowWrapper {
        return shallow(
            <Walkthrough
                finishWalkthrough={props.finishWalkthrough}
                tokens={props.tokens}
                walkthroughCompleted={props.walkthroughCompleted}
            />,
        );
    }

    let walkthroughWrapper: ShallowWrapper;
    let walkthroughInstance: Walkthrough;

    beforeEach(() => {
        walkthroughWrapper = generateComponent();
        walkthroughInstance = walkthroughWrapper.instance() as Walkthrough;
    });

    describe("#render", () => {
        it("should render", () => {
            expect(walkthroughWrapper.length).toEqual(1);
        });
    });

    describe("#handleWalkthroughStateChange", () => {
        it("should call #finishWalkthrough if at the last step", () => {
            const size = 10;

            const data = {
                index: size - 1,
                size,
                type: "tour:end",
            };

            walkthroughInstance.handleWalkthroughStateChange(data);

            expect(DEFAULT_PROPS.finishWalkthrough).toHaveBeenCalledTimes(1);
        });

        it("should not call #finishWalkthrough if not at the last step", () => {
            const size = 10;

            const data = {
                index: size - 5,
                size,
            };

            walkthroughInstance.handleWalkthroughStateChange(data);

            expect(DEFAULT_PROPS.finishWalkthrough).toHaveBeenCalledTimes(1);
        });
    });
});
