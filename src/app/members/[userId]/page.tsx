import { getMemberByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { notFound } from "next/navigation";
import React from "react";

export default async function MemberDetailedPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  return (
    <CardInnerWrapper 
    header="Profile" 
    body={<div>{member.description}</div>} />
  );
}

//    *** with Next15 ***
// import { getMemberByUserId } from '@/app/actions/memberActions'
// import { notFound } from 'next/navigation'
// import React from 'react'

// export default async function MemberDetailedPage({params}
//   : {params: Promise<{userId: string}> }) {

// const {userId} = await params;
// const member = await getMemberByUserId(userId)
// if(!member) return notFound()
//   return (
//     <div>
//      {member.name}
//     </div>
//   )
// }

//    *** Old Way with Next14 ***
// export default async function MemberDetailedPage({params}
//   : {params: {userId: string} }) {

// const member = await getMemberByUserId(params.userId)
// if(!member) return notFound()
//   return (
//     <div>
//      {member.name}
//     </div>
//   )
// }
