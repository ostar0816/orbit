// External libraries
import * as React from "react";

// Components
import Hero from "./Hero/Hero";
import Explainer from "./Explainer/Explainer";

export interface Props {
    // A function that gets invoked when the user agrees to enter the app.
    handleEnterApp: () => void;
}

export default class SplashPage extends React.Component<Props, {}> {
    render() {
        const { handleEnterApp } = this.props;

        return (
            <div>
                <Hero handleEnterApp={handleEnterApp} />
                <Explainer />
            </div>
        );
    }
}
