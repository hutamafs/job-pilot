export const dynamic = "force-dynamic";
import { Suspense } from "react";

import SettingsContent from "./SettingsContent";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

const SettingsPage = async () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SettingsContent />
    </Suspense>
  );
};

export default SettingsPage;
