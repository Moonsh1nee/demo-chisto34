import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().trim().min(1, "Укажите, как к вам обращаться"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Укажите телефон полностью, например +7 900 000-00-00"),
  date: z.string().min(1),
});

export type OrderInput = z.input<typeof orderSchema>;
