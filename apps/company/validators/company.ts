import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new company.ts.
 */
export const createCompanyValidator = vine.compile(
  vine.object({
    name: vine.string(),
    siret: vine.string(),
    approvalNumber: vine.string(),
    address: vine.object({
      street: vine.string(),
      postalCode: vine.string(),
      city: vine.string(),
      region: vine.string(),
      country: vine.string(),
    }),
    contact: vine.object({
      email: vine.string(),
      mobilePhone: vine.string().optional(),
      landlinePhone: vine.string().optional(),
      website: vine.string().optional(),
    }),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing company.ts.
 */
export const updateCompanyValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    siret: vine.string().optional(),
    approvalNumber: vine.string().optional(),
    address: vine
      .object({
        street: vine.string().optional(),
        postalCode: vine.string().optional(),
        city: vine.string().optional(),
        region: vine.string().optional(),
        country: vine.string().optional(),
      })
      .optional(),
    contact: vine
      .object({
        email: vine.string().optional(),
        mobilePhone: vine.string().optional(),
        landlinePhone: vine.string().optional(),
        website: vine.string().optional(),
      })
      .optional(),
  })
)

export const getCompaniesValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export type CreateCompanySchema = Infer<typeof createCompanyValidator>
export type UpdateCompanySchema = Infer<typeof updateCompanyValidator>
export type GetCompaniesSchema = Infer<typeof getCompaniesValidator>
