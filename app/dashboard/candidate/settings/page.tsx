export const dynamic = "force-dynamic";
import { Suspense } from "react";

import Provider from "./provider";
import SettingsContent from "./SettingsContent";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const SettingsPage = async () => {
  return (
    <Provider>
      <Suspense fallback={<LoadingSpinner />}>
        <SettingsContent />
      </Suspense>
    </Provider>
  );
};

export default SettingsPage;
