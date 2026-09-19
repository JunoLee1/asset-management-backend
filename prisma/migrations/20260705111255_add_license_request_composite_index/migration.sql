-- CreateIndex
CREATE INDEX "license_requests_licenseId_targetUserId_status_idx" ON "license_requests"("licenseId", "targetUserId", "status");
