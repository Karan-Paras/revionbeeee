import { SettingsTab } from "@/app/(app)/accounts/settings/settings-tabs";
import { paths } from "@/routes";

export default function Settings() {
  return (
    <div
      id={paths.accounts.settings.scroll().split("#")[1]}
      className="subs rounded-xl bg-white px-7 py-8"
    >
      <h3 className="border-b border-[#D9D9D9] pb-3 text-2xl font-bold text-[#505050]">
        Settings
      </h3>
      <div className="tbs">
        <SettingsTab />
      </div>
    </div>
  );
}
