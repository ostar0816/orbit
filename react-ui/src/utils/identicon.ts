const Identicon = require("identicon.js");

export const getIdenticonImgSrc = (hash: string | undefined, size?: number, margin?: number) => {
    if (!hash) {
        return "";
    }
    const options = {
        foreground: [28, 193, 204, 255],
        background: [255, 255, 255, 255],
        margin: margin ? margin : 0.1,
        size: size ? size : 100,
        format: "svg",
    };
    const identiconData = new Identicon(hash, options).toString();
    return "data:image/svg+xml;base64," + identiconData;
};
