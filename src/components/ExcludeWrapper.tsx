"use client";

import { usePathname } from "next/navigation";

const excludePaths = ["/login", "/register", "/dashboard/user", "/dashboard/admin", "/dashboard/user/plegarias","/dashboard/admin/userInhumado"];

const ExcludeWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  
  if (excludePaths.includes(path)) return null;
  
  return <>{children}</>;
};

export default ExcludeWrapper;
