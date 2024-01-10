import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/VerificationToken';
import { v4 as uuidv4 } from 'uuid';
import { getPasswordResetTokenByEmail } from '@/data/PasswordResetToken';
import crypto from 'crypto';
import { getTwoFactorTokenByEmail } from '@/data/TwoFactorToken';

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000) // 1hr from now
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      token,
      expires,
      email
    }
  });

  return twoFactorToken;
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1hr from now

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expires,
      email
    }
  });

  return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1hr from now

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      expires,
      email
    }
  });

  return passwordResetToken;
}