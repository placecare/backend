import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new company.ts.
 */
export const createCompanyValidator = vine.compile(vine.object({}))

/**
 * Validator to validate the payload when updating
 * an existing company.ts.
 */
export const updateCompanyValidator = vine.compile(vine.object({}))

export type CreateCompanySchema = Infer<typeof createCompanyValidator>
export type UpdateCompanySchema = Infer<typeof updateCompanyValidator>
