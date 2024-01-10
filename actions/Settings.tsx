"use server";

import * as z from 'zod'
import { SettingsSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import bcrypt from 'bcryptjs';
import { update } from '@/auth';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Forbidden!" }
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Forbidden!" }
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already exists!" }
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Verification email sent!" }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordsMatch) {
      return { error: "Incorrect password!" }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: {
      id: user.id
    },
    data: {
      ...values
    }
  })

  update({ user: { name: updatedUser.name, email: updatedUser.email, role: updatedUser.role, isTwoFactorEnabled: updatedUser.isTwoFactorEnabled } })
  return { success: "Success!" }
}