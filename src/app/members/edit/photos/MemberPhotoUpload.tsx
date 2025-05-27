"use client";

import { addImage } from "@/app/actions/userActions";
import ImageUploadButton from "@/components/ImageUploadButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function MemberPhotoUpload() {
  const router = useRouter();

  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);
      router.refresh();
    } else {
      toast.error("Problem adding image");
    }
  };

  return (
    <div>
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
}

/**
       ⚙️ Flow summary:
1️⃣ The user clicks on ImageUploadButton.
2️⃣ The image is uploaded via Cloudinary.
3️⃣ The onAddImage callback retrieves the image URL and public ID.
4️⃣ These details are sent to the server using addImage.
5️⃣ The page is refreshed using router.refresh() to reflect the change.
6️⃣ If there’s a problem → an error toast is shown.
 */
