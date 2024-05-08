declare module '*?raw' {
    const result: string;

    export default result;
}

declare module '!!raw-loader!*' {
    const result: string;

    export = result;
}

declare module '!raw-loader!*' {
    const result: string;

    export = result;
}

declare module 'raw-loader!*' {
    const result: string;

    export = result;
}