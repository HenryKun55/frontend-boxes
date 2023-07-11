import { SignInRequest } from '@/api/auth/types'
import { z } from 'zod'

const schema: z.ZodType<SignInRequest> = z.lazy(() =>
  z.object({
    username: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, 'Campo obrigatório'),
    password: z.string().min(3, 'Campo obrigatório'),
  }),
)

export type FormProps = z.infer<typeof schema>

export default schema
