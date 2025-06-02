import Link from "next/link";
import { Fragment } from "react";

interface BreadcrumbBannerProps {
  title: string;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export function BreadcrumbBanner({
  title,
  breadcrumbs,
}: BreadcrumbBannerProps) {
  return (
    <section className="act_bg relative bg-cover bg-no-repeat min-h-96">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 min-h-96 relative text-center items-end">
          <div className="col-span-2 pb-14">
            <h3 className="font-bold text-5xl text-white">{title}</h3>

            <div className="flex justify-center gap-3 text-white my-5 uppercase">
              {breadcrumbs.map(({ href, label }, index) => (
                <Fragment key={index}>
                  <div className="itm">
                    <Link className="text-white" href={href}>
                      {label}
                    </Link>
                  </div>
                  {index < breadcrumbs.length - 1 && "/"}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
