import {
  createDepartmentSchema,
  createLocationSchema,
  createVendorSchema,
  createAssetCategorySchema,
  updateDepartmentSchema,
} from '../master.schema'

describe('createDepartmentSchema', () => {
  it('name + code면 통과', () => {
    expect(createDepartmentSchema.safeParse({ name: '개발팀', code: 'DEV' }).success).toBe(true)
  })

  it('name이 빈 문자열이면 거부', () => {
    expect(createDepartmentSchema.safeParse({ name: '', code: 'DEV' }).success).toBe(false)
  })

  it('code가 빈 문자열이면 거부', () => {
    expect(createDepartmentSchema.safeParse({ name: '개발팀', code: '' }).success).toBe(false)
  })
})

describe('updateDepartmentSchema', () => {
  it('부분 업데이트 가능 (name만)', () => {
    expect(updateDepartmentSchema.safeParse({ name: '신규' }).success).toBe(true)
  })

  it('빈 객체는 거부', () => {
    expect(updateDepartmentSchema.safeParse({}).success).toBe(false)
  })
})

describe('createLocationSchema', () => {
  it('필수 필드(name, building)만으로 통과', () => {
    expect(createLocationSchema.safeParse({ name: '본사 5층', building: '본사' }).success).toBe(true)
  })

  it('building 누락 시 거부', () => {
    expect(createLocationSchema.safeParse({ name: '본사 5층' }).success).toBe(false)
  })

  it('floor/room은 옵션', () => {
    expect(
      createLocationSchema.safeParse({ name: '본사 5층', building: '본사', floor: '5F', room: '501' }).success,
    ).toBe(true)
  })
})

describe('createVendorSchema', () => {
  it('name만으로 통과', () => {
    expect(createVendorSchema.safeParse({ name: 'Apple Korea' }).success).toBe(true)
  })

  it('잘못된 email 형식이면 거부', () => {
    expect(createVendorSchema.safeParse({ name: 'Apple', email: 'not-email' }).success).toBe(false)
  })

  it('유효한 email은 통과', () => {
    expect(createVendorSchema.safeParse({ name: 'Apple', email: 'sales@apple.com' }).success).toBe(true)
  })
})

describe('createAssetCategorySchema', () => {
  it('name + code + class면 통과', () => {
    expect(
      createAssetCategorySchema.safeParse({ name: '서버', code: 'SERVER', class: 'IT_ASSET' }).success,
    ).toBe(true)
  })

  it('class 누락 시에도 통과 (optional)', () => {
    expect(createAssetCategorySchema.safeParse({ name: '서버', code: 'SERVER' }).success).toBe(true)
  })

  it('잘못된 class 값(구 enum)은 거부', () => {
    expect(
      createAssetCategorySchema.safeParse({ name: '서버', code: 'SERVER', class: 'HARDWARE' }).success,
    ).toBe(false)
  })

  it('잘못된 class 값은 거부', () => {
    expect(
      createAssetCategorySchema.safeParse({ name: '서버', code: 'SERVER', class: 'OTHER' }).success,
    ).toBe(false)
  })

  it('parentId는 옵션', () => {
    expect(
      createAssetCategorySchema.safeParse({
        name: '서버',
        code: 'SERVER',
        class: 'IT_ASSET',
        parentId: 'parent-1',
      }).success,
    ).toBe(true)
  })

  it('IT_ASSET + subType HARDWARE 통과', () => {
    expect(
      createAssetCategorySchema.safeParse({
        name: '노트북',
        code: 'LAPTOP',
        class: 'IT_ASSET',
        subType: 'HARDWARE',
      }).success,
    ).toBe(true)
  })

  it('OFFICE_ASSET + subType 없이 통과', () => {
    expect(
      createAssetCategorySchema.safeParse({ name: '사무 비품', code: 'OFFICE', class: 'OFFICE_ASSET' }).success,
    ).toBe(true)
  })
})
