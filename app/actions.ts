'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from './lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function updateUserName(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }
  const username = formData.get('username') as string;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      userName: username,
    },
  });
  try {
    return {
      message: 'Successfully updated name',
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          message: 'This username already exist',
        };
      }
    }
  }
}
