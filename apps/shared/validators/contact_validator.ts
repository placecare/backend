import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createContactValidator = vine.compile(
  vine.object({
    email: vine.string(),
    mobilePhone: vine.string().optional(),
    landlinePhone: vine.string().optional(),
    website: vine.string().optional(),
  })
)

export type CreateContactSchema = Infer<typeof createContactValidator>
