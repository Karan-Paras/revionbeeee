import SettingsTab from "@/app/(app)/accounts/settings/settings-tabs";

export default function Settings() {
  return (
    <div className="subs bg-white px-7 py-8 rounded-xl">
      <h3 className="text-[#505050] font-bold border-b text-2xl pb-3 border-[#D9D9D9]">
        Settings
      </h3>
      <div className="tbs">
        <SettingsTab />
      </div>
    </div>
  );
}
