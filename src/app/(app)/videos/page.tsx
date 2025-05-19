import { Lft } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";

export default function Videos() {
  return (
    <>
      <section className="act_bg relative bg-cover bg-no-repeat min-h-96">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 min-h-96 relative text-center items-end">
            <div className="col-span-2 pb-14 ">
              <h3 className="font-bold text-5xl text-white">Videos</h3>
              <div className="flex justify-center gap-3 text-white my-5 uppercase">
                <div className="itm">
                  <Link className="text-white" href="">
                    Home
                  </Link>
                </div>
                /
                <div className="itm">
                  <Link className="text-white" href="">
                    AA SL
                  </Link>
                </div>
                /
                <div className="itm">
                  <Link className="text-white" href="">
                    Videos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-4">
              <h3 className="font-bold text-3xl">All Videos</h3>
            </div>
            <div className="col-span-1">
              <div className="vid rounded-2xl relative min-h-80 overflow-hidden">
                <Image className="object-cover" src={Lft} alt="" fill></Image>
                {/* <video src=""></video> */}
                <div className="cntrls h-full w-full flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
                  <div className="">
                    {/* play  */}
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 23"
                        fill="none"
                      >
                        <path
                          d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 22 27"
                        fill="none"
                      >
                        <path
                          d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="desc">
                <h3 className="font-bold mt-3 mb-1">
                  Understanding Number Systems
                </h3>
                <div className="flex gap-1.5 items-center">
                  <span>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.49347 9.17343L7.54148 7.70945V4.72729C7.54148 4.42743 7.29911 4.18506 6.99926 4.18506C6.69941 4.18506 6.45703 4.42743 6.45703 4.72729V7.98059C6.45703 8.15138 6.53728 8.31243 6.67392 8.41437L8.84277 10.041C8.94036 10.1142 9.05425 10.1495 9.16756 10.1495C9.33294 10.1495 9.49561 10.0752 9.60189 9.93203C9.78195 9.69288 9.73314 9.35292 9.49347 9.17343Z"
                        fill="#505050"
                      />
                      <path
                        d="M7 0.9375C3.13996 0.9375 0 4.07746 0 7.9375C0 11.7975 3.13996 14.9375 7 14.9375C10.86 14.9375 14 11.7975 14 7.9375C14 4.07746 10.86 0.9375 7 0.9375ZM7 13.8531C3.73857 13.8531 1.08443 11.1989 1.08443 7.9375C1.08443 4.67607 3.73857 2.02193 7 2.02193C10.262 2.02193 12.9156 4.67607 12.9156 7.9375C12.9156 11.1989 10.2614 13.8531 7 13.8531Z"
                        fill="#505050"
                      />
                    </svg>
                  </span>
                  <p>9 min</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="vid rounded-2xl relative min-h-80 overflow-hidden">
                <Image className="object-cover" src={Lft} alt="" fill></Image>
                {/* <video src={Demo} ></video> */}
                <div className="cntrls h-full w-full flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
                  <div className="">
                    {/* play  */}
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 23"
                        fill="none"
                      >
                        <path
                          d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 22 27"
                        fill="none"
                      >
                        <path
                          d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="desc">
                <h3 className="font-bold mt-3 mb-1">
                  Understanding Number Systems
                </h3>
                <div className="flex gap-1.5 items-center">
                  <span>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.49347 9.17343L7.54148 7.70945V4.72729C7.54148 4.42743 7.29911 4.18506 6.99926 4.18506C6.69941 4.18506 6.45703 4.42743 6.45703 4.72729V7.98059C6.45703 8.15138 6.53728 8.31243 6.67392 8.41437L8.84277 10.041C8.94036 10.1142 9.05425 10.1495 9.16756 10.1495C9.33294 10.1495 9.49561 10.0752 9.60189 9.93203C9.78195 9.69288 9.73314 9.35292 9.49347 9.17343Z"
                        fill="#505050"
                      />
                      <path
                        d="M7 0.9375C3.13996 0.9375 0 4.07746 0 7.9375C0 11.7975 3.13996 14.9375 7 14.9375C10.86 14.9375 14 11.7975 14 7.9375C14 4.07746 10.86 0.9375 7 0.9375ZM7 13.8531C3.73857 13.8531 1.08443 11.1989 1.08443 7.9375C1.08443 4.67607 3.73857 2.02193 7 2.02193C10.262 2.02193 12.9156 4.67607 12.9156 7.9375C12.9156 11.1989 10.2614 13.8531 7 13.8531Z"
                        fill="#505050"
                      />
                    </svg>
                  </span>
                  <p>9 min</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="vid rounded-2xl relative min-h-80 overflow-hidden">
                <Image className="object-cover" src={Lft} alt="" fill></Image>
                {/* <video src=""></video> */}
                <div className="cntrls h-full w-full flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
                  <div className="">
                    {/* play  */}
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 23"
                        fill="none"
                      >
                        <path
                          d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 22 27"
                        fill="none"
                      >
                        <path
                          d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="desc">
                <h3 className="font-bold mt-3 mb-1">
                  Understanding Number Systems
                </h3>
                <div className="flex gap-1.5 items-center">
                  <span>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.49347 9.17343L7.54148 7.70945V4.72729C7.54148 4.42743 7.29911 4.18506 6.99926 4.18506C6.69941 4.18506 6.45703 4.42743 6.45703 4.72729V7.98059C6.45703 8.15138 6.53728 8.31243 6.67392 8.41437L8.84277 10.041C8.94036 10.1142 9.05425 10.1495 9.16756 10.1495C9.33294 10.1495 9.49561 10.0752 9.60189 9.93203C9.78195 9.69288 9.73314 9.35292 9.49347 9.17343Z"
                        fill="#505050"
                      />
                      <path
                        d="M7 0.9375C3.13996 0.9375 0 4.07746 0 7.9375C0 11.7975 3.13996 14.9375 7 14.9375C10.86 14.9375 14 11.7975 14 7.9375C14 4.07746 10.86 0.9375 7 0.9375ZM7 13.8531C3.73857 13.8531 1.08443 11.1989 1.08443 7.9375C1.08443 4.67607 3.73857 2.02193 7 2.02193C10.262 2.02193 12.9156 4.67607 12.9156 7.9375C12.9156 11.1989 10.2614 13.8531 7 13.8531Z"
                        fill="#505050"
                      />
                    </svg>
                  </span>
                  <p>9 min</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="vid rounded-2xl relative min-h-80 overflow-hidden">
                <Image className="object-cover" src={Lft} alt="" fill></Image>
                {/* <video src=""></video> */}
                <div className="cntrls h-full w-full flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
                  <div className="">
                    {/* play  */}
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 23"
                        fill="none"
                      >
                        <path
                          d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 22 27"
                        fill="none"
                      >
                        <path
                          d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="desc">
                <h3 className="font-bold mt-3 mb-1">
                  Understanding Number Systems
                </h3>
                <div className="flex gap-1.5 items-center">
                  <span>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.49347 9.17343L7.54148 7.70945V4.72729C7.54148 4.42743 7.29911 4.18506 6.99926 4.18506C6.69941 4.18506 6.45703 4.42743 6.45703 4.72729V7.98059C6.45703 8.15138 6.53728 8.31243 6.67392 8.41437L8.84277 10.041C8.94036 10.1142 9.05425 10.1495 9.16756 10.1495C9.33294 10.1495 9.49561 10.0752 9.60189 9.93203C9.78195 9.69288 9.73314 9.35292 9.49347 9.17343Z"
                        fill="#505050"
                      />
                      <path
                        d="M7 0.9375C3.13996 0.9375 0 4.07746 0 7.9375C0 11.7975 3.13996 14.9375 7 14.9375C10.86 14.9375 14 11.7975 14 7.9375C14 4.07746 10.86 0.9375 7 0.9375ZM7 13.8531C3.73857 13.8531 1.08443 11.1989 1.08443 7.9375C1.08443 4.67607 3.73857 2.02193 7 2.02193C10.262 2.02193 12.9156 4.67607 12.9156 7.9375C12.9156 11.1989 10.2614 13.8531 7 13.8531Z"
                        fill="#505050"
                      />
                    </svg>
                  </span>
                  <p>9 min</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="vid rounded-2xl relative min-h-80 overflow-hidden">
                <Image className="object-cover" src={Lft} alt="" fill></Image>
                {/* <video src=""></video> */}
                <div className="cntrls h-full w-full flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
                  <div className="">
                    {/* play  */}
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 23"
                        fill="none"
                      >
                        <path
                          d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 22 27"
                        fill="none"
                      >
                        <path
                          d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="desc">
                <h3 className="font-bold mt-3 mb-1">
                  Understanding Number Systems
                </h3>
                <div className="flex gap-1.5 items-center">
                  <span>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.49347 9.17343L7.54148 7.70945V4.72729C7.54148 4.42743 7.29911 4.18506 6.99926 4.18506C6.69941 4.18506 6.45703 4.42743 6.45703 4.72729V7.98059C6.45703 8.15138 6.53728 8.31243 6.67392 8.41437L8.84277 10.041C8.94036 10.1142 9.05425 10.1495 9.16756 10.1495C9.33294 10.1495 9.49561 10.0752 9.60189 9.93203C9.78195 9.69288 9.73314 9.35292 9.49347 9.17343Z"
                        fill="#505050"
                      />
                      <path
                        d="M7 0.9375C3.13996 0.9375 0 4.07746 0 7.9375C0 11.7975 3.13996 14.9375 7 14.9375C10.86 14.9375 14 11.7975 14 7.9375C14 4.07746 10.86 0.9375 7 0.9375ZM7 13.8531C3.73857 13.8531 1.08443 11.1989 1.08443 7.9375C1.08443 4.67607 3.73857 2.02193 7 2.02193C10.262 2.02193 12.9156 4.67607 12.9156 7.9375C12.9156 11.1989 10.2614 13.8531 7 13.8531Z"
                        fill="#505050"
                      />
                    </svg>
                  </span>
                  <p>9 min</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="vid rounded-2xl relative min-h-80 overflow-hidden">
                <Image className="object-cover" src={Lft} alt="" fill></Image>
                {/* <video src=""></video> */}
                <div className="cntrls h-full w-full flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
                  <div className="">
                    {/* play  */}
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 23"
                        fill="none"
                      >
                        <path
                          d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 22 27"
                        fill="none"
                      >
                        <path
                          d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="desc">
                <h3 className="font-bold mt-3 mb-1">
                  Understanding Number Systems
                </h3>
                <div className="flex gap-1.5 items-center">
                  <span>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.49347 9.17343L7.54148 7.70945V4.72729C7.54148 4.42743 7.29911 4.18506 6.99926 4.18506C6.69941 4.18506 6.45703 4.42743 6.45703 4.72729V7.98059C6.45703 8.15138 6.53728 8.31243 6.67392 8.41437L8.84277 10.041C8.94036 10.1142 9.05425 10.1495 9.16756 10.1495C9.33294 10.1495 9.49561 10.0752 9.60189 9.93203C9.78195 9.69288 9.73314 9.35292 9.49347 9.17343Z"
                        fill="#505050"
                      />
                      <path
                        d="M7 0.9375C3.13996 0.9375 0 4.07746 0 7.9375C0 11.7975 3.13996 14.9375 7 14.9375C10.86 14.9375 14 11.7975 14 7.9375C14 4.07746 10.86 0.9375 7 0.9375ZM7 13.8531C3.73857 13.8531 1.08443 11.1989 1.08443 7.9375C1.08443 4.67607 3.73857 2.02193 7 2.02193C10.262 2.02193 12.9156 4.67607 12.9156 7.9375C12.9156 11.1989 10.2614 13.8531 7 13.8531Z"
                        fill="#505050"
                      />
                    </svg>
                  </span>
                  <p>9 min</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="vid rounded-2xl relative min-h-80 overflow-hidden">
                <Image className="object-cover" src={Lft} alt="" fill></Image>
                {/* <video src=""></video> */}
                <div className="cntrls h-full w-full flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
                  <div className="">
                    {/* play  */}
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 23"
                        fill="none"
                      >
                        <path
                          d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 22 27"
                        fill="none"
                      >
                        <path
                          d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="desc">
                <h3 className="font-bold mt-3 mb-1">
                  Understanding Number Systems
                </h3>
                <div className="flex gap-1.5 items-center">
                  <span>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.49347 9.17343L7.54148 7.70945V4.72729C7.54148 4.42743 7.29911 4.18506 6.99926 4.18506C6.69941 4.18506 6.45703 4.42743 6.45703 4.72729V7.98059C6.45703 8.15138 6.53728 8.31243 6.67392 8.41437L8.84277 10.041C8.94036 10.1142 9.05425 10.1495 9.16756 10.1495C9.33294 10.1495 9.49561 10.0752 9.60189 9.93203C9.78195 9.69288 9.73314 9.35292 9.49347 9.17343Z"
                        fill="#505050"
                      />
                      <path
                        d="M7 0.9375C3.13996 0.9375 0 4.07746 0 7.9375C0 11.7975 3.13996 14.9375 7 14.9375C10.86 14.9375 14 11.7975 14 7.9375C14 4.07746 10.86 0.9375 7 0.9375ZM7 13.8531C3.73857 13.8531 1.08443 11.1989 1.08443 7.9375C1.08443 4.67607 3.73857 2.02193 7 2.02193C10.262 2.02193 12.9156 4.67607 12.9156 7.9375C12.9156 11.1989 10.2614 13.8531 7 13.8531Z"
                        fill="#505050"
                      />
                    </svg>
                  </span>
                  <p>9 min</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="vid rounded-2xl relative min-h-80 overflow-hidden">
                <Image className="object-cover" src={Lft} alt="" fill></Image>
                {/* <video src=""></video> */}
                <div className="cntrls h-full w-full flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
                  <div className="">
                    {/* play  */}
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 23"
                        fill="none"
                      >
                        <path
                          d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 22 27"
                        fill="none"
                      >
                        <path
                          d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="desc">
                <h3 className="font-bold mt-3 mb-1">
                  Understanding Number Systems
                </h3>
                <div className="flex gap-1.5 items-center">
                  <span>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.49347 9.17343L7.54148 7.70945V4.72729C7.54148 4.42743 7.29911 4.18506 6.99926 4.18506C6.69941 4.18506 6.45703 4.42743 6.45703 4.72729V7.98059C6.45703 8.15138 6.53728 8.31243 6.67392 8.41437L8.84277 10.041C8.94036 10.1142 9.05425 10.1495 9.16756 10.1495C9.33294 10.1495 9.49561 10.0752 9.60189 9.93203C9.78195 9.69288 9.73314 9.35292 9.49347 9.17343Z"
                        fill="#505050"
                      />
                      <path
                        d="M7 0.9375C3.13996 0.9375 0 4.07746 0 7.9375C0 11.7975 3.13996 14.9375 7 14.9375C10.86 14.9375 14 11.7975 14 7.9375C14 4.07746 10.86 0.9375 7 0.9375ZM7 13.8531C3.73857 13.8531 1.08443 11.1989 1.08443 7.9375C1.08443 4.67607 3.73857 2.02193 7 2.02193C10.262 2.02193 12.9156 4.67607 12.9156 7.9375C12.9156 11.1989 10.2614 13.8531 7 13.8531Z"
                        fill="#505050"
                      />
                    </svg>
                  </span>
                  <p>9 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
