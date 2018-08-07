class Debts {
    get serverUrl() {
        const protocol = process.env.REACT_APP_HTTPS === "true" ? "https:" : "http:";
        const host = process.env.REACT_APP_SERVER_HOST;
        let url = `${protocol}//${host}`;

        if (process.env.REACT_APP_SERVER_PORT) {
            url += `:${process.env.REACT_APP_SERVER_PORT}`;
        }

        return url;
    }

    get defaultOptions(): RequestInit {
        return {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        };
    }

    list(networkId: number): Promise<any> {
        const options = {
            method: "GET",
            ...this.defaultOptions,
        };

        return fetch(`${this.serverUrl}/api/loans?networkId=${networkId}`, options).then(
            (response: Response) => response.json(),
        );
    }

    create(data: any): Promise<any> {
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            ...this.defaultOptions,
        };

        return fetch(`${this.serverUrl}/api/loans`, options).then((response: Response) =>
            response.json(),
        );
    }

    cancel(issuanceHash: string): Promise<any> {
        const options = {
            method: "DELETE",
            body: JSON.stringify({ issuanceHash }),
            ...this.defaultOptions,
        };

        return fetch(`${this.serverUrl}/api/loans`, options);
    }

    fill(issuanceHash: string): Promise<any> {
        const options = {
            method: "PUT",
            body: JSON.stringify({ issuanceHash }),
            ...this.defaultOptions,
        };

        return fetch(`${this.serverUrl}/api/loans/fill`, options);
    }
}

export default new Debts();
