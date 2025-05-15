import { User } from "@/lib/assets";
import Image from "next/image";

export default function MyProfile() {
  return (
    <div className="bg-white px-7 py-8 rounded-xl">
      <h3 className="font-bold border-b text-2xl pb-3 border-[#D9D9D9]">
        Profile
      </h3>

      <div className="frm">
        <div className="profile flex justify-center gap-3.5 flex-col text-center my-10">
          <div className="size-40 border-2 border-white rounded-full mx-auto overflow-hidden">
            <Image src={User} alt=""></Image>
          </div>
          <div className="desc">
            <h3 className="font-bold text-xl">Wade Warren</h3>
            <p>wade@email.com</p>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>Mobile Number</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">+1 0384850840</h3>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>Gender</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">Male</h3>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>City</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">Silverbrook</h3>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>State</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">North Monroe</h3>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>Address</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">Oakridge Heights, Westlandia 48219</h3>
          </div>
        </div>

        <div className="btn flex justify-center">
          <button className="bg-[#53A2EB] px-10 py-5 text-white rounded-xl">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
