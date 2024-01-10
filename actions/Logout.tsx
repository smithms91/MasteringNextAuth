"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // server stuff

  await signOut();
};