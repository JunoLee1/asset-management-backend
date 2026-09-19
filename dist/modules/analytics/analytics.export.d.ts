interface ExportContext {
    companyName: string;
    departmentName: string;
    authorName: string;
    generatedAt: string;
}
export declare function exportCsv(ctx: ExportContext): Promise<Buffer>;
export declare function exportExcel(ctx: ExportContext): Promise<Buffer>;
export declare function exportPdf(ctx: ExportContext): Promise<Buffer>;
export declare function exportHwpx(ctx: ExportContext): Promise<Buffer>;
export {};
//# sourceMappingURL=analytics.export.d.ts.map