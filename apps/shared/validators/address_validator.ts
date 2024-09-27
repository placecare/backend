import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createAddressValidator = vine.compile(
  vine.object({
    street: vine.string(),
    postalCode: vine.string(),
    city: vine.string(),
    region: vine.string(),
    country: vine.string(),
  })
)

export type CreateAddressSchema = Infer<typeof createAddressValidator>
