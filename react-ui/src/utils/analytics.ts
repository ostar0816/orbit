export namespace Analytics {
    export enum FillLoanAction {
        ViewForm = "View Form",
        SubmitJson = "Submit JSON",
        JsonError = "JSON Error",
        ViewLoanDetails = "View Loan Details",
        FillLoan = "Fill Loan",
        ConfirmFill = "Confirm Fill",
        ClickDone = "Click Done",
    }

    export enum RequestLoanAction {
        ViewForm = "View Form",
        BeginForm = "Begin Form",
        SubmitForm = "Submit Form",
        ConfirmRequest = "Confirm Request",
        ViewConfirmation = "View Confirmation",
    }

    export enum PlexVisit {
        Web3Enabled = "Web3 Enabled",
        Web3NotEnabled = "Web3 Not Enabled",
    }

    // The union of all Action enums
    type Action = FillLoanAction | RequestLoanAction | PlexVisit;

    export enum Category {
        FillLoan = "Fill Loan",
        RequestLoan = "Request Loan",
        PlexVisit = "Plex Visit",
    }

    /*
     * If nonInteraction === 1, Google Analytics will not consider the action to be an interaction.
     * This means that if a user visits a page, only does nonInteraction actions, then leaves,
     * Google Analytics will consider the visit a "bounce."
     */
    export interface TrackProperties {
        category: Category;
        nonInteraction?: number;
    }

    export function page(pageName: string, properties?: object) {
        if (shouldSendAnalytics()) {
            (window as any).analytics.page(pageName, properties);
        }
    }

    export function track(action: Action, properties?: TrackProperties) {
        if (shouldSendAnalytics()) {
            (window as any).analytics.track(action, properties);
        }
    }

    function shouldSendAnalytics() {
        // return process.env.NODE_ENV === "production";
        return false;
    }
}
