import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createIdentityValidator = vine.compile(
  vine.object({
    firstname: vine.string(),
    lastname: vine.string(),
    birthDate: vine.date(),
    gender: vine.string().nullable(),
  })
)

export type CreateIdentitySchema = Infer<typeof createIdentityValidator>
