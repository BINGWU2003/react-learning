import { z } from "zod";

export const learningDirections = ["react", "vue", "both"] as const;

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "姓名至少需要 2 个字符")
    .max(20, "姓名不能超过 20 个字符"),
  email: z.email("请输入有效的邮箱地址"),
  direction: z.enum(learningDirections, {
    error: "请选择一个学习方向",
  }),
  agreement: z.boolean().refine(Boolean, {
    message: "请先同意保存学习资料",
  }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
