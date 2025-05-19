import { logout } from "@/actions/logout";
import { auth } from "@/auth";
import ProfileDropdown from "@/components/dropdowns/profile-dropdown";
import { Logo } from "@/lib/assets";
import { paths } from "@/routes";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  variant?: "home" | "dashboard";
}

export async function Header({ variant = "dashboard" }: HeaderProps) {
  const session = await auth();

  const NavLinks =
    variant === "dashboard"
      ? [
          { name: "Dashboard", path: paths.dashboard() },
          { name: "Progress", path: paths.progress() },
          { name: "Questions Bank", path: paths.questionsBank() },
          { name: "Quiz", path: paths.quiz() },
          { name: "Accounts", path: paths.accounts() },
        ]
      : [
          { name: "Home", path: "#home" },
          { name: "About", path: "#about" },
          { name: "Topics", path: "#topics" },
          { name: "Pricing", path: "#pricing" },
          { name: "Contact us", path: "#contact" },
        ];

  return (
    <header className="relative left-0 right-0 z-[999] p-10 hed_bg">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 items-center">
          <div className="col-span-1">
            <div className="img size-32 absolute left-[100px] flex items-center justify-center">
              <Link className="" href="/">
                <Image src={Logo} alt="" fill />
              </Link>
            </div>
          </div>
          <div className="col-span-1 relative">
            <div className="flex justify-end w-full gap-5 items-center">
              <div className="links">
                <ul className="flex gap-7">
                  {NavLinks.map((navLink) => (
                    <li key={navLink.name}>
                      <Link
                        className="font-medium text-[#505050] hover:text-[#53A2EB]"
                        href={navLink.path}
                      >
                        {navLink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {variant === "home" ? (
                session ? (
                  <>
                    {
                      <div className="btn">
                        {session.user.name && session.user.image ? (
                          <Link
                            href={paths.dashboard()}
                            className="flex border-2 rounded-xl border-[#53A2EB text-[#53A2EB] px-5 py-4 font-semibold cursor-pointer hover:bg-[#53A2EB] hover:text-white duration-500 ease-in-out"
                          >
                            Go to Dashboard
                          </Link>
                        ) : (
                          <Link
                            href={paths.createProfile()}
                            className="flex border-2 rounded-xl border-[#53A2EB text-[#53A2EB] px-5 py-4 font-semibold cursor-pointer hover:bg-[#53A2EB] hover:text-white duration-500 ease-in-out"
                          >
                            Complete Profile
                          </Link>
                        )}
                      </div>
                    }
                    <form className="btn" action={logout}>
                      <button
                        type="submit"
                        className="border-2 rounded-xl border-[#53A2EB text-[#53A2EB] px-8 py-4 font-semibold cursor-pointer hover:bg-[#53A2EB] hover:text-white duration-500 ease-in-out"
                      >
                        Logout
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="btn">
                    <Link
                      href="/login"
                      className="border-2 rounded-xl border-[#53A2EB text-[#53A2EB] px-8 py-4 font-semibold cursor-pointer hover:bg-[#53A2EB] hover:text-white duration-500 ease-in-out"
                    >
                      Login Now
                    </Link>
                  </div>
                )
              ) : (
                session?.user && (
                  <div className="btn">
                    <ProfileDropdown user={session.user} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
