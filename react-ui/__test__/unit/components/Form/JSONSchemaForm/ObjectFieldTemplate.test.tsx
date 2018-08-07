import * as React from "react";
import { shallow } from "enzyme";
import { ObjectFieldTemplate } from "src/components/Form/JSONSchemaForm/ObjectFieldTemplate";
import {
    GroupWrapper,
    Title,
    Description,
    InputContainerBorder,
} from "src/components/Form/JSONSchemaForm/styledComponents";
import { PressEnter } from "src/components/Form/JSONSchemaForm/PressEnter";

describe("<ObjectFieldTemplate />", () => {
    let wrapper;
    const props = {
        title: "Some title",
        description: "Some description",
        properties: [{ content: "Some content" }, { content: "Another content" }],
        idSchema: {
            $id: "some-identifier",
        },
    };

    beforeEach(() => {
        wrapper = shallow(<ObjectFieldTemplate {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <GroupWrapper /> component", () => {
        expect(wrapper.find(GroupWrapper).length).toEqual(1);
    });

    it("should render a <Title /> component inside <GroupWrapper />", () => {
        expect(wrapper.find(GroupWrapper).find(Title).length).toEqual(1);
    });

    it("should render an <InputContainerBorder /> if title exists", () => {
        expect(wrapper.find(GroupWrapper).find(InputContainerBorder).length).toEqual(1);
    });

    it("should render a <Description /> inside <InputContainerBorder /> if title and description exist", () => {
        expect(
            wrapper
                .find(GroupWrapper)
                .find(InputContainerBorder)
                .find(Description).length,
        ).toEqual(1);
    });

    it("should not render an <InputContainerBorder /> if title does not exist", () => {
        wrapper.setProps({ title: "" });
        expect(wrapper.find(GroupWrapper).find(InputContainerBorder).length).toEqual(0);
    });

    it("should not render a <Description /> inside <InputContainerBorder /> if title does not exist", () => {
        wrapper.setProps({ title: "" });
        expect(
            wrapper
                .find(GroupWrapper)
                .find(InputContainerBorder)
                .find(Description).length,
        ).toEqual(0);
    });

    it("should not render a <Description /> if description does not exist", () => {
        wrapper.setProps({ description: "" });
        expect(wrapper.find(GroupWrapper).find(Description).length).toEqual(0);
    });

    it("should render a <PressEnter /> component inside <GroupWrapper />", () => {
        expect(wrapper.find(GroupWrapper).find(PressEnter).length).toEqual(1);
    });
});
