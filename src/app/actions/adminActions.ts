"use server";

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";
import { Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";

export async function getUnapprovedPhotos() {
  try {
    const role = await getUserRole();

    if (role !== "ADMIN") throw new Error("Forbidden");

    return prisma.photo.findMany({
      where: {
        isApproved: false,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Function: Approve a photo and update related user/member records
export async function approvePhoto(photoId: string) {
  try {
    // Step 1: Get current user's role
    const role = await getUserRole();

    // Step 2: Check if the user has permission (must be ADMIN)
    if (role !== "ADMIN") throw new Error("Forbidden");

    // Step 3: Retrieve the photo and related member and user data
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
      include: { member: { include: { user: true } } },
    });

    // Step 4: Validate that photo, member, and user exist
    if (!photo || !photo.member || !photo.member.user)
      throw new Error("Cannot approve this image");

    const { member } = photo;

    // Step 5: Prepare image updates for user and member (only if not already set)
    const userUpdate =
      member.user && member.user.image === null ? { image: photo.url } : {};
    const memberUpdate = member.image === null ? { image: photo.url } : {};

    // Step 6: Update the user's image if needed
    if (Object.keys(userUpdate).length > 0) {
      await prisma.user.update({
        where: { id: member.userId },
        data: userUpdate,
      });
    }

    // Step 7: Update the member's image if needed and mark photo as approved
    return prisma.member.update({
      where: { id: member.id },
      data: {
        ...memberUpdate,
        photos: {
          update: {
            where: { id: photo.id },
            data: { isApproved: true },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export async function rejectPhoto(photo: Photo) {
  try {
    const role = await getUserRole();

    if (role !== "ADMIN") throw new Error("Forbidden");

    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    return prisma.photo.delete({
      where: { id: photo.id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
