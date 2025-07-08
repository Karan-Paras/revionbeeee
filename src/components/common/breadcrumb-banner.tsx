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
    <section className="act_bg relative min-h-96 bg-cover bg-no-repeat">
      <div className="container mx-auto">
        <div className="relative grid min-h-96 grid-cols-2 items-end text-center">
          <div className="col-span-2 pb-14 2xl:px-0 px-5">
            <h3 className="2xl:text-5xl xl:text-4xl text-3xl font-bold text-white">
              {title}
            </h3>

            <div className="2xl:my-5 my-3 flex justify-center gap-3 text-white uppercase md:flex-nowrap flex-wrap">
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
