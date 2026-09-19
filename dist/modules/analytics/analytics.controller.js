"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
const analytics_export_1 = require("./analytics.export");
const getDistribution = async (_req, res) => {
    const data = await analytics_service_1.analyticsService.getDistribution();
    res.json(data);
};
const getUtilization = async (_req, res) => {
    const data = await analytics_service_1.analyticsService.getUtilization();
    res.json(data);
};
const getUtilizationByDepartment = async (req, res) => {
    const rawClass = req.query['class'];
    const allowed = ['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET'];
    const cls = typeof rawClass === 'string' && allowed.includes(rawClass)
        ? rawClass
        : undefined;
    const data = await analytics_service_1.analyticsService.getUtilizationByDepartment(cls);
    res.json(data);
};
const getDepartmentValue = async (_req, res) => {
    const data = await analytics_service_1.analyticsService.getDepartmentValue();
    res.json(data);
};
const getMaintenanceCost = async (req, res) => {
    const { from, to } = req.query;
    const data = await analytics_service_1.analyticsService.getMaintenanceCost(from, to);
    res.json(data);
};
const getComplianceExpiry = async (_req, res) => {
    const data = await analytics_service_1.analyticsService.getComplianceExpiry();
    res.json(data);
};
function buildExportCtx(req) {
    const user = req.user;
    return {
        companyName: process.env.COMPANY_NAME || '자산관리 ERP',
        departmentName: user.departmentName ?? '–',
        authorName: user.name ?? user.id,
        generatedAt: new Date().toLocaleString('ko-KR'),
    };
}
const exportAsCsv = async (req, res) => {
    const buf = await (0, analytics_export_1.exportCsv)(buildExportCtx(req));
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="analytics.csv"');
    res.send(buf);
};
const exportAsExcel = async (req, res) => {
    const buf = await (0, analytics_export_1.exportExcel)(buildExportCtx(req));
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="analytics.xlsx"');
    res.send(buf);
};
const exportAsPdf = async (req, res) => {
    const buf = await (0, analytics_export_1.exportPdf)(buildExportCtx(req));
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="analytics.pdf"');
    res.send(buf);
};
const exportAsHwpx = async (req, res) => {
    const buf = await (0, analytics_export_1.exportHwpx)(buildExportCtx(req));
    res.setHeader('Content-Type', 'application/hwpml+zip');
    res.setHeader('Content-Disposition', 'attachment; filename="analytics.hwpx"');
    res.send(buf);
};
exports.analyticsController = {
    getDistribution,
    getUtilization,
    getUtilizationByDepartment,
    getDepartmentValue,
    getMaintenanceCost,
    getComplianceExpiry,
    exportAsCsv,
    exportAsExcel,
    exportAsPdf,
    exportAsHwpx,
};
//# sourceMappingURL=analytics.controller.js.map