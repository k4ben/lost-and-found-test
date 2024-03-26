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

export async function addItem(Type: "LostItem" | "FoundItem", Description: string, CategoryID: bigint, UserID: bigint, SchoolID: bigint, locationName: string) {
  const transaction = await prisma.$transaction(async tx => {
    const createLocation = await tx.location.create({
      data: {
        Name: locationName,
        SchoolID
      }
    })
    const insert = await tx.item.create({
      data: {
        Description,
        Type,
        CategoryID,
        UserID,
        LocationID: createLocation.ID
      }
    })
  })
}