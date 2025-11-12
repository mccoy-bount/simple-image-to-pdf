declare enum types {
    JPG = "jpg",
    JPEG = "jpeg",
    PNG = "png",
    WebP = "webp",
    GIF = "gif",
    AVIF = "avif",
    TIFF = "tiff",
    SVG = "svg",
    HEIC = "heic"
}
declare const imageToPDF: (pages?: string[]) => Promise<Uint8Array<ArrayBufferLike>>;
declare const sizes: {
    "4A0": number[];
    "2A0": number[];
    A0: number[];
    A1: number[];
    A2: number[];
    A3: number[];
    A4: number[];
    A5: number[];
    A6: number[];
    A7: number[];
    A8: number[];
    A9: number[];
    A10: number[];
    B0: number[];
    B1: number[];
    B2: number[];
    B3: number[];
    B4: number[];
    B5: number[];
    B6: number[];
    B7: number[];
    B8: number[];
    B9: number[];
    B10: number[];
    C0: number[];
    C1: number[];
    C2: number[];
    C3: number[];
    C4: number[];
    C5: number[];
    C6: number[];
    C7: number[];
    C8: number[];
    C9: number[];
    C10: number[];
    RA0: number[];
    RA1: number[];
    RA2: number[];
    RA3: number[];
    RA4: number[];
    SRA0: number[];
    SRA1: number[];
    SRA2: number[];
    SRA3: number[];
    SRA4: number[];
    EXECUTIVE: number[];
    FOLIO: number[];
    LEGAL: number[];
    LETTER: number[];
    TABLOID: number[];
};
export default imageToPDF;
export { imageToPDF as convert, sizes, types };
//# sourceMappingURL=index.d.ts.map