export class FontStyleModel {
    styleOptions: Array<string>;
    textDecoration: string;
    fontFamily: string;

    constructor(styleOptions: Array<string>, textDecoration: string, fontFamily: string) {
        this.styleOptions = styleOptions;
        this.textDecoration = textDecoration;
        this.fontFamily = fontFamily;
    }
}
