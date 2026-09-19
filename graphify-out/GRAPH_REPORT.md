# Graph Report - .  (2026-07-05)

## Corpus Check
- 244 files · ~110,828 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1456 nodes · 2890 edges · 82 communities (78 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.88)
- Token cost: 9,800 input · 1,950 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Router & Module Boundaries|Router & Module Boundaries]]
- [[_COMMUNITY_Admin & User Management|Admin & User Management]]
- [[_COMMUNITY_Loan Approval Workflow|Loan Approval Workflow]]
- [[_COMMUNITY_Notification Service|Notification Service]]
- [[_COMMUNITY_Analytics & Export|Analytics & Export]]
- [[_COMMUNITY_Asset & User Controllers|Asset & User Controllers]]
- [[_COMMUNITY_Asset Lifecycle & Encryption|Asset Lifecycle & Encryption]]
- [[_COMMUNITY_Monthly Report Pipeline|Monthly Report Pipeline]]
- [[_COMMUNITY_Loan Controllers & Auth Helpers|Loan Controllers & Auth Helpers]]
- [[_COMMUNITY_Cloudinary & Media|Cloudinary & Media]]
- [[_COMMUNITY_Endpoint Agent Client|Endpoint Agent Client]]
- [[_COMMUNITY_Auth Service|Auth Service]]
- [[_COMMUNITY_License & Software Service|License & Software Service]]
- [[_COMMUNITY_Maintenance Workflow|Maintenance Workflow]]
- [[_COMMUNITY_Prisma & DB Scripts|Prisma & DB Scripts]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]

## God Nodes (most connected - your core abstractions)
1. `getRequester()` - 143 edges
2. `requireId()` - 110 edges
3. `prisma` - 52 edges
4. `AppError` - 41 edges
5. `RequesterContext` - 23 edges
6. `logger` - 21 edges
7. `authenticate()` - 21 edges
8. `compilerOptions` - 18 edges
9. `createInAppMany()` - 17 edges
10. `getById()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `list()` --calls--> `getRequester()`  [EXTRACTED]
  src/modules/admin/user.controller.ts → src/lib/requestHelpers.ts
- `collect()` --calls--> `getRequester()`  [EXTRACTED]
  src/modules/agent/agent.controller.ts → src/lib/requestHelpers.ts
- `ingest()` --calls--> `getRequester()`  [EXTRACTED]
  src/modules/agent/agent.controller.ts → src/lib/requestHelpers.ts
- `create()` --calls--> `getRequester()`  [EXTRACTED]
  src/modules/assets/asset.controller.ts → src/lib/requestHelpers.ts
- `list()` --calls--> `getRequester()`  [EXTRACTED]
  src/modules/assets/asset.controller.ts → src/lib/requestHelpers.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Two-Stage License Approval: request → approveSecurity → approveAdmin** — specs_request_fn, specs_approvesecurity_fn, specs_approveadmin_fn, specs_licenserequest_model, specs_licenserequeststatus_enum [EXTRACTED 1.00]
- **Seat Locking: countActiveSeats includes PENDING requests to prevent over-allocation** — specs_countactiveseats, specs_licenserequest_model, specs_request_fn, specs_approveadmin_fn [EXTRACTED 1.00]
- **Notification Pipeline for License Approval Lifecycle** — specs_notification_mapping, specs_notification_service, specs_request_fn, specs_approvesecurity_fn, specs_approveadmin_fn, specs_reject_fn [EXTRACTED 1.00]

## Communities (82 total, 4 thin omitted)

### Community 0 - "Router & Module Boundaries"
Cohesion: 0.06
Nodes (50): router, router, router, router, router, router, router, uploadAssetImage (+42 more)

### Community 1 - "Admin & User Management"
Cohesion: 0.05
Nodes (51): router, inviteUser(), InviteUserDto, InviteUserResult, activate(), deactivate(), list(), listHistory() (+43 more)

### Community 2 - "Loan Approval Workflow"
Cohesion: 0.05
Nodes (54): ALLOWED_TRANSITIONS, approveAdmin(), approveDept(), approveManager(), approveReturnDept(), approveReturnManager(), assertNotSelfApprove(), assertTransition() (+46 more)

### Community 3 - "Notification Service"
Cohesion: 0.06
Nodes (53): ChannelResult, ComplianceCheckResult, createDisposalApprovedNotification(), createDisposalCompletedNotification(), createDisposalPendingAdminNotifications(), createDisposalPendingManagerNotifications(), createDisposalRejectedNotification(), createInApp() (+45 more)

### Community 4 - "Analytics & Export"
Cohesion: 0.07
Nodes (27): buildExportCtx(), exportAsCsv(), exportAsExcel(), exportAsHwpx(), exportAsPdf(), ExportContext, exportCsv(), exportExcel() (+19 more)

### Community 5 - "Asset & User Controllers"
Cohesion: 0.09
Nodes (34): getById(), create(), getById(), getHistory(), list(), removeImage(), retire(), update() (+26 more)

### Community 6 - "Asset Lifecycle & Encryption"
Cohesion: 0.09
Nodes (31): activate(), deactivate(), update(), retire(), encryptField(), getKey(), maskBankAccount(), SensitiveAction (+23 more)

### Community 7 - "Monthly Report Pipeline"
Cohesion: 0.14
Nodes (33): handleDetailDeptMonthly(), handleDetailTeamMonthly(), handleExportDeptAnnual(), handleExportDeptMonthly(), handleExportTeamAnnual(), handleExportTeamMonthly(), handleListDeptMonthly(), handleListTeamMonthly() (+25 more)

### Community 8 - "Loan Controllers & Auth Helpers"
Cohesion: 0.13
Nodes (30): getRequester(), approve(), approveAdmin(), approveDept(), approveExtensionAdmin(), approveExtensionManager(), approveManager(), approveReturnDept() (+22 more)

### Community 9 - "Cloudinary & Media"
Cohesion: 0.09
Nodes (26): deleteImage(), extractPublicId(), isCloudinaryConfigured(), storage, uploadVendorDocument, vendorDocStorage, assertTeamAccess(), assetCategoryHandlers (+18 more)

### Community 10 - "Endpoint Agent Client"
Cohesion: 0.11
Nodes (19): AgentApiClient, BlockEventPayload, BlockListResult, CollectItem, IngestPayload, IngestResult, AgentConfig, loadConfig() (+11 more)

### Community 11 - "Auth Service"
Cohesion: 0.12
Nodes (22): acceptInvite(), findOrCreateOAuthUser(), hashToken(), IssueTokenMeta, issueTokenPair(), login(), logout(), refresh() (+14 more)

### Community 12 - "License & Software Service"
Cohesion: 0.13
Nodes (27): SoftwareLinkItem, AuditField, create(), getById(), getSummary(), ingest(), list(), listBlockEvents() (+19 more)

### Community 13 - "Maintenance Workflow"
Cohesion: 0.09
Nodes (26): approve(), approveDept(), assign(), cancel(), create(), getById(), list(), my() (+18 more)

### Community 14 - "Prisma & DB Scripts"
Cohesion: 0.09
Nodes (14): adapter, prisma, APPLY, mockHwFindMany, mockLicFindMany, mockFindMany, sampleCatalog, baseAsset (+6 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (24): ALLOWED_TRANSITIONS, approve(), ApproveOptions, assertNotSelfApproveMaint(), assign(), AssignInput, cancel(), create() (+16 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (24): list(), calculateLicenseCoverage(), adminCtx, baseLicense, baseRequestRow, managerCtx, mockAssetFindUnique, mockLACount (+16 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (26): dependencies, bcrypt, cloudinary, cors, dotenv, exceljs, express, jsonwebtoken (+18 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (26): License Approval Workflow Implementation Plan, Task 10: Final Cleanup Commit, Task 1: Prisma Schema Migration, Task 2: Types and Zod Schema, Task 3: countActiveSeats + request() TDD, Task 4: approveSecurity() TDD, Task 5: approveAdmin() TDD, Task 6: reject() + cancel() TDD (+18 more)

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (21): create(), getById(), remove(), requireAdmin(), update(), validateManufacturer(), CatalogListItem, CreateCatalogInput (+13 more)

### Community 20 - "Community 20"
Cohesion: 0.10
Nodes (22): assetClass, assetSubType, BlacklistVendorInput, blacklistVendorSchema, businessRegistrationNumberSchema, createAssetCategorySchema, createDepartmentSchema, createLocationSchema (+14 more)

### Community 21 - "Community 21"
Cohesion: 0.09
Nodes (19): AlertItem, CategoryStat, DashboardData, DashboardStats, DepartmentStat, HistoryItem, RepairDashboardStats, RepairHistoryItem (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.08
Nodes (24): devDependencies, jest, jest-mock-extended, prettier, prisma, ts-jest, ts-node, ts-node-dev (+16 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (20): defaultAnnualRate(), getByAssetId(), remove(), requireManager(), simulate(), upsert(), YearlyRecord, DepreciationDetail (+12 more)

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (14): collect(), ingest(), blockEventPayloadSchema, collectItemSchema, collectPayloadSchema, collect(), ingest(), requireCollectAccess() (+6 more)

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (17): router, ResourceConfig, validateBody(), validateQuery(), ApproveAdminDisposalBody, ApproveManagerDisposalBody, approveManagerDisposalSchema, CompleteDisposalBody (+9 more)

### Community 26 - "Community 26"
Cohesion: 0.10
Nodes (20): compilerOptions, declaration, declarationMap, esModuleInterop, lib, module, noImplicitAny, noUnusedLocals (+12 more)

### Community 27 - "Community 27"
Cohesion: 0.16
Nodes (15): router, AcceptInviteInput, acceptInviteSchema, ChangePasswordInput, changePasswordSchema, InviteUserInput, inviteUserSchema, LoginInput (+7 more)

### Community 28 - "Community 28"
Cohesion: 0.27
Nodes (17): ACTIVE_LOAN_STATUSES, ALLOWED_TRANSITIONS, approveAdmin(), approveManager(), assertTransition(), cancel(), complete(), create() (+9 more)

### Community 29 - "Community 29"
Cohesion: 0.11
Nodes (17): assetClassEnum, assetConditionEnum, assetStatusEnum, coreCreateSchema, currencyEnum, facilityInputSchema, hardwareInputSchema, hardwareUpdateSchema (+9 more)

### Community 30 - "Community 30"
Cohesion: 0.14
Nodes (16): createSoftwareSchema, ingestPayloadSchema, listSoftwareQuerySchema, updatePermissionSchema, updateSoftwareSchema, create(), getById(), getSummary() (+8 more)

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (12): AppError, RequesterContext, errorHandler(), admin, otherUser, prismaMock, sampleAsset, user (+4 more)

### Community 32 - "Community 32"
Cohesion: 0.25
Nodes (6): env, logger, MailOptions, startScheduler(), SensitiveAuditEntry, app

### Community 33 - "Community 33"
Cohesion: 0.15
Nodes (13): DisposalCriteria, DisposalDetail, DisposalEvidenceItem, DisposalListItem, PaginatedResult, CreateMaintenanceInput, ListMaintenancesQuery, MaintenanceDetail (+5 more)

### Community 34 - "Community 34"
Cohesion: 0.13
Nodes (14): dependencies, axios, description, devDependencies, ts-node, @types/node, typescript, main (+6 more)

### Community 35 - "Community 35"
Cohesion: 0.18
Nodes (10): list(), buildSoftDeleteWhere(), ListOptions, ReferenceCheck, list(), restore(), softDelete(), update() (+2 more)

### Community 36 - "Community 36"
Cohesion: 0.18
Nodes (8): CatalogListItem, create(), detailInclude, getById(), HistoryMetadata, toDetail(), update(), generateAssetCode()

### Community 37 - "Community 37"
Cohesion: 0.21
Nodes (10): logAudit(), LogAuditParams, SENSITIVE_ACTION_PASSTHROUGH, Tx, approve(), reject(), review(), DetectedSoftwareListItem (+2 more)

### Community 38 - "Community 38"
Cohesion: 0.14
Nodes (13): AssignLicenseBody, assignLicenseSchema, CreateLicenseBody, CreateLicenseRequestBody, createLicenseSchema, currencyEnum, ListLicenseRequestsQuery, listLicenseRequestsQuerySchema (+5 more)

### Community 39 - "Community 39"
Cohesion: 0.14
Nodes (12): baseUser, HASHED_PW, mockOAuthCreate, mockOAuthFindUnique, mockOAuthUpdate, mockRTCreate, mockRTFindUnique, mockRTUpdate (+4 more)

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, lib, module, outDir, resolveJsonModule, rootDir, skipLibCheck (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.23
Nodes (7): acceptInvite(), changePassword(), extractMeta(), login(), logout(), logoutAll(), oauthCallback()

### Community 42 - "Community 42"
Cohesion: 0.19
Nodes (11): create(), getById(), list(), remove(), update(), CreateManufacturerBody, createManufacturerSchema, ListManufacturerQuery (+3 more)

### Community 43 - "Community 43"
Cohesion: 0.18
Nodes (10): restore(), softDelete(), update(), CreateDepartmentInput, UpdateDepartmentInput, mockAssetCount, mockDept, mockTeamCount (+2 more)

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (11): AssignLicenseInput, CreateLicenseInput, Currency, LicenseAssignmentDetail, LicenseCoverage, LicenseDetail, LicenseListItem, ListLicenseRequestsQuery (+3 more)

### Community 45 - "Community 45"
Cohesion: 0.32
Nodes (10): create(), getById(), remove(), requireAdmin(), update(), CreateManufacturerInput, ListManufacturerQuery, ManufacturerDetail (+2 more)

### Community 46 - "Community 46"
Cohesion: 0.20
Nodes (9): list(), restore(), softDelete(), update(), CreateAssetCategoryInput, UpdateAssetCategoryInput, mockAssetCount, mockCat (+1 more)

### Community 47 - "Community 47"
Cohesion: 0.20
Nodes (9): list(), restore(), softDelete(), update(), CreateLocationInput, UpdateLocationInput, mockAssetCount, mockLoc (+1 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): BASE_PAYLOAD, EXISTING_DEVICE, EXISTING_INSTANCE, EXISTING_SOFTWARE, mockCreateInApp, mockPrisma, mockTx, ONE_OFFICER (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.18
Nodes (10): AssetDetail, AssetHistoryDetail, AssetListItem, FacilityDetail, HardwareDetail, ModelStatsItem, ModelStatsResponse, OfficeDetail (+2 more)

### Community 50 - "Community 50"
Cohesion: 0.24
Nodes (9): create(), getById(), list(), remove(), update(), classEnum, createCatalogSchema, listCatalogQuerySchema (+1 more)

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (8): BrnStatus, BrnValidationResult, normalizeBrn(), STATUS_MAP, validateBrn(), validateBrnHandler(), verifyBusinessRegistration(), mockFetch

### Community 52 - "Community 52"
Cohesion: 0.31
Nodes (11): approveAdmin(), approveDept(), approveManager(), approveSecurity(), cancel(), countActiveSeats(), getRequestById(), reject() (+3 more)

### Community 53 - "Community 53"
Cohesion: 0.18
Nodes (11): scripts, build, db:generate, db:migrate, db:studio, dev, format, format:check (+3 more)

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (6): getByAssetId(), remove(), upsert(), methodEnum, UpsertDepreciationBody, upsertDepreciationSchema

### Community 55 - "Community 55"
Cohesion: 0.40
Nodes (9): catalogs, main(), seedAccountingCategories(), seedComplianceData(), seedDepartmentsAndTeams(), seedDeviceAssets(), seedOfficeAndFacilityAssets(), seedVerifyData() (+1 more)

### Community 56 - "Community 56"
Cohesion: 0.20
Nodes (9): adminCtx, assetMgrCtx, assetMgrUser, fullLoanDetail, mockAssetFindUnique, mockLoanFindUnique, mockLoanUpdate, otherAssetMgrCtx (+1 more)

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): approveAdmin(), approveManager(), cancel(), complete(), create(), getById(), list(), reject()

### Community 58 - "Community 58"
Cohesion: 0.39
Nodes (8): encryptLicenseKey(), getKey(), maskLicenseKey(), assign(), create(), getById(), requireManager(), unassign()

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (7): adminCtx, managerCtx, mockDeptFindMany, mockLoanCount, mockLoanFindMany, mockLoanFindUnique, otherManagerCtx

### Community 60 - "Community 60"
Cohesion: 0.29
Nodes (6): approve(), list(), reject(), review(), ListDetectedSoftwareQuery, listDetectedSoftwareSchema

### Community 61 - "Community 61"
Cohesion: 0.25
Nodes (7): author, description, keywords, license, main, name, version

### Community 62 - "Community 62"
Cohesion: 0.25
Nodes (7): ListAssetsQuery, adminRequester, emptyQuery, mockCount, mockFindMany, sampleAssetRow, userRequester

### Community 63 - "Community 63"
Cohesion: 0.29
Nodes (5): adminCtx, mockLoanFindUnique, mockTeamFindMany, otherLeadCtx, teamLeadCtx

### Community 64 - "Community 64"
Cohesion: 0.29
Nodes (5): adminCtx, mockMaintFindUnique, mockTeamFindMany, otherLeadCtx, teamLeadCtx

### Community 65 - "Community 65"
Cohesion: 0.29
Nodes (6): compilerOptions, noUnusedLocals, noUnusedParameters, types, extends, include

### Community 66 - "Community 66"
Cohesion: 0.29
Nodes (6): KakaoProfile, Strategy, StrategyOptions, StrategyOptionsWithRequest, VerifyCallback, VerifyCallbackWithRequest

### Community 67 - "Community 67"
Cohesion: 0.48
Nodes (5): extractAssetCode(), handleMailgunInbound(), parseCostFromBody(), verifyMailgunSignature(), upload

### Community 68 - "Community 68"
Cohesion: 0.40
Nodes (6): list(), list(), fetchPage(), paginate(), list(), list()

### Community 69 - "Community 69"
Cohesion: 0.33
Nodes (5): CreateAssetInput, baseHardwareInput, createdAsset, hardwareCategory, prismaWithTx

### Community 70 - "Community 70"
Cohesion: 0.33
Nodes (4): adminCtx, baseAsset, prismaMock, userCtx

### Community 71 - "Community 71"
Cohesion: 0.33
Nodes (4): adminCtx, managerCtx, mockDeptFindMany, mockLoanFindUnique

### Community 72 - "Community 72"
Cohesion: 0.33
Nodes (4): mockNotifFindMany, mockNotifUpdate, mockNotifUpdateMany, mockSendMail

### Community 73 - "Community 73"
Cohesion: 0.50
Nodes (3): CounterTx, PREFIX, txMock

### Community 75 - "Community 75"
Cohesion: 1.00
Nodes (3): axhub App Config (erp-backend), App Name: 자산관리 ERP (Backend), App Slug: erp-backend

### Community 76 - "Community 76"
Cohesion: 0.67
Nodes (3): handleExportExcel(), exportDisposalsExcel(), formatDate()

## Knowledge Gaps
- **487 isolated node(s):** `config`, `name`, `version`, `description`, `main` (+482 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `prisma` connect `Prisma & DB Scripts` to `Router & Module Boundaries`, `Admin & User Management`, `Loan Approval Workflow`, `Notification Service`, `Analytics & Export`, `Asset Lifecycle & Encryption`, `Monthly Report Pipeline`, `Cloudinary & Media`, `Auth Service`, `License & Software Service`, `Community 15`, `Community 16`, `Community 19`, `Community 21`, `Community 23`, `Community 24`, `Community 28`, `Community 31`, `Community 35`, `Community 36`, `Community 37`, `Community 39`, `Community 41`, `Community 43`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 55`, `Community 56`, `Community 59`, `Community 62`, `Community 63`, `Community 64`, `Community 67`, `Community 69`, `Community 70`, `Community 71`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `AppError` connect `Community 31` to `Router & Module Boundaries`, `Admin & User Management`, `Loan Approval Workflow`, `Notification Service`, `Asset & User Controllers`, `Asset Lifecycle & Encryption`, `Monthly Report Pipeline`, `Loan Controllers & Auth Helpers`, `Cloudinary & Media`, `Auth Service`, `License & Software Service`, `Prisma & DB Scripts`, `Community 15`, `Community 16`, `Community 19`, `Community 23`, `Community 24`, `Community 28`, `Community 35`, `Community 36`, `Community 37`, `Community 39`, `Community 41`, `Community 43`, `Community 45`, `Community 46`, `Community 47`, `Community 51`, `Community 54`, `Community 56`, `Community 69`, `Community 70`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `getRequester()` connect `Loan Controllers & Auth Helpers` to `Router & Module Boundaries`, `Admin & User Management`, `Asset & User Controllers`, `Monthly Report Pipeline`, `Cloudinary & Media`, `Community 42`, `Maintenance Workflow`, `Community 50`, `Community 54`, `Community 24`, `Community 57`, `Community 60`, `Community 30`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `config`, `name`, `version` to the rest of the system?**
  _487 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Router & Module Boundaries` be split into smaller, more focused modules?**
  _Cohesion score 0.06034801925212884 - nodes in this community are weakly interconnected._
- **Should `Admin & User Management` be split into smaller, more focused modules?**
  _Cohesion score 0.053613053613053616 - nodes in this community are weakly interconnected._
- **Should `Loan Approval Workflow` be split into smaller, more focused modules?**
  _Cohesion score 0.053613053613053616 - nodes in this community are weakly interconnected._