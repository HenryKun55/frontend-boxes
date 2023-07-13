import { CreateBoxRequest } from '@/api/boxes/types'
import { z } from 'zod'

const schema: z.ZodType<CreateBoxRequest> = z.lazy(() =>
  z.object({
    name: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, 'Campo obrigatório'),
  }),
)

export type FormProps = z.infer<typeof schema>

export default schema
