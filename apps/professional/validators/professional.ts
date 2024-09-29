import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new professional.ts.
 */
export const createProfessionalValidator = vine.compile(vine.object({}))

/**
 * Validator to validate the payload when updating
 * an existing professional.ts.
 */
export const updateProfessionalValidator = vine.compile(vine.object({}))

export const getProfessionalsValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
    companyId: vine.string().optional(),
  })
)

export type CreateProfessionalSchema = Infer<typeof createProfessionalValidator>
export type UpdateProfessionalSchema = Infer<typeof updateProfessionalValidator>
export type GetProfessionalsSchema = Infer<typeof getProfessionalsValidator>
