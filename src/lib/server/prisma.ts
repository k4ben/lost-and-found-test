import { convertToHierarchy2, convertToHierarchy } from '$lib/functions';
import { PrismaClient } from '@prisma/client'
import type { UserUnionType } from '../../routes/user/[id]/+page.server';

const prisma = new PrismaClient()
export default prisma

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return convertToHierarchy(categories);
}

export async function getUserById(id: string | bigint) {
  const user: UserUnionType = await prisma.user.findFirstOrThrow({
    where: {
      ID: BigInt(id),
    },
    include: {
      Item: {
        include: {
          Image: true,
          Category: true,
          Location: {
            include: {
              School: true
            }
          }
        }
      }
    }
  });
  return user;
}