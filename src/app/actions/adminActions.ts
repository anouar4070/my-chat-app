'use server'

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";

export async function getUnapprovedPhotos() {
  try {
    const role = await getUserRole();

    if(role !== 'ADMIN') throw new Error('Forbidden');

    return prisma.photo.findMany({
      where: {
        isApproved: false
      }
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}