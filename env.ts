import { createEnv } from "@t3-oss/env-nextjs";
import { AUTOMATIC_FONT_OPTIMIZATION_MANIFEST } from "next/dist/shared/lib/constants";
import { Jersey_10 } from "next/font/google";
import { FaUserFriends } from "react-icons/fa";

import { z } from "zod";

export const env = createEnv({
  server: {
    TABLE_NAME: z.string().min(1),
    RECAPTCHA_SECRET: z.string().min(1),
    MAILING_LIST_ENDPOINT: z.string().min(1),
    MAILING_LIST_PASSWORD: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
    NEXT_PUBLIC_PLANNER_ID: z.string().min(1),
    NEXT_PUBLIC_IS_LOCAL: z.string().optional(),
  },
  runtimeEnv: {
    MAILING_LIST_PASSWORD: process.env.MAILING_LIST_PASSWORD,
    MAILING_LIST_ENDPOINT: process.env.MAILING_LIST_ENDPOINT,
    RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
    TABLE_NAME: process.env.TABLE_NAME,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_PLANNER_ID: process.env.NEXT_PUBLIC_PLANNER_ID,
    NEXT_PUBLIC_IS_LOCAL: process.env.NEXT_PUBLIC_IS_LOCAL,
  },
});
