import LandingHeader from "@/components/headers/landing-header";
import { Lft } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";

export default function Videos() {
    return (
        <>
            <LandingHeader />
            <section className="act_bg relative bg-cover bg-no-repeat min-h-96">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 min-h-96 relative text-center items-end">
                        <div className="col-span-2 pb-10">
                            <h3 className="font-bold uppercase text-5xl text-white">AA SL</h3>
                            <div className="flex justify-center gap-3 text-white my-5">
                                <div className="itm">
                                    <Link className="text-white" href="">Home</Link>
                                </div>
                                /
                                <div className="itm">
                                    <Link className="text-white" href="">AA SL</Link>
                                </div>
                                /
                                <div className="itm">
                                    <Link className="text-white" href="">Videos</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto">
                    <div className="grid grid-cols-4">
                        <div className="col-span-4">
                            <h3 className="font-bold text-3xl">All Videos</h3>
                        </div>
                        <div className="col-span-1">
                            <Image src={Lft} alt=""></Image>
                        </div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
