import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { paths } from "@/routes";

export default function PrivacyPolicy() {
  return (
    <>
      <BreadcrumbBanner
        title="Privacy Policy"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.home(),
          },
          {
            label: "Privacy Policy",
            href: paths.privacyPolicy(),
          },
        ]}
      />
      <section className="py-10">
        <div className="container mx-auto">
          <div className="rw mb-8">
            <h3 className="mb-2 text-2xl font-bold">
              1. What do we do with your information?
            </h3>
            <p>
              Eget arcu dictum varius duis at. Enim sed faucibus turpis in.
              Ornare suspendisse sed nisi lacus sed viverra tellus. Neque ornare
              aenean euismod elementum nisi quis eleifend. Libero justo laoreet
              sit amet cursus sit. Erat velit scelerisque in dictum non
              consectetur a. Congue eu consequat ac felis donec et. Penatibus et
              magnis dis parturient montes nascetur ridiculus mus. Aenean
              euismod elementum nisi quis eleifend quam.Scelerisque in dictum
              non consectetur a erat nam at. Nunc lobortis mattis aliquam
              faucibus purus in. Fermentum iaculis eu non diam. Odio ut sem
              nulla pharetra. Tempus egestas sed sed risus pretium quam
              vulputate.
            </p>
          </div>

          <div className="rw mb-8">
            <h3 className="mb-2 text-2xl font-bold">2. Consent</h3>
            <p>
              Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Et
              netus et malesuada fames ac turpis egestas integer. Morbi
              tristique senectus et netus. Turpis egestas integer eget aliquet
              nibh. Massa placerat duis ultricies lacus. Id eu nisl nunc mi
              ipsum. Risus in hendrerit gravida rutrum quisque. Lacus vestibulum
              sed arcu non odio euismod lacinia at. Commodo odio aenean sed
              adipiscing diam donec adipiscing tristique risus. Pharetra magna
              ac placerat vestibulum lectus mauris ultrices.Cras sed felis eget
              velit aliquet sagittis id consectetur purus. Ut consequat semper
              viverra nam. Nunc pulvinar sapien et ligula ullamcorper malesuada
              proin.
            </p>
          </div>

          <div className="rw mb-8">
            <h3 className="mb-2 text-2xl font-bold">3. Disclosure</h3>
            <p>
              Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Et
              netus et malesuada fames ac turpis egestas integer. Morbi
              tristique senectus et netus. Turpis egestas integer eget aliquet
              nibh. Massa placerat duis ultricies lacus. Id eu nisl nunc mi
              ipsum. Risus in hendrerit gravida rutrum quisque. Lacus vestibulum
              sed arcu non odio euismod lacinia at. Commodo odio aenean sed
              adipiscing diam donec adipiscing tristique risus. Pharetra magna
              ac placerat vestibulum lectus mauris ultrices.Cras sed felis eget
              velit aliquet sagittis id consectetur purus. Ut consequat semper
              viverra nam. Nunc pulvinar sapien et ligula ullamcorper malesuada
              proin.
            </p>
          </div>

          <div className="rw mb-8">
            <h3 className="mb-2 text-2xl font-bold">4. Third-party services</h3>
            <p>
              Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Et
              netus et malesuada fames ac turpis egestas integer. Morbi
              tristique senectus et netus. Turpis egestas integer eget aliquet
              nibh. Massa placerat duis ultricies lacus. Id eu nisl nunc mi
              ipsum. Risus in hendrerit gravida rutrum quisque. Lacus vestibulum
              sed arcu non odio euismod lacinia at. Commodo odio aenean sed
              adipiscing diam donec adipiscing tristique risus. Pharetra magna
              ac placerat vestibulum lectus mauris ultrices.Cras sed felis eget
              velit aliquet sagittis id consectetur purus. Ut consequat semper
              viverra nam. Nunc pulvinar sapien et ligula ullamcorper malesuada
              proin.
            </p>
          </div>

          <div className="rw mb-8">
            <h3 className="mb-2 text-2xl font-bold">5. Security</h3>
            <p>
              Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Et
              netus et malesuada fames ac turpis egestas integer. Morbi
              tristique senectus et netus. Turpis egestas integer eget aliquet
              nibh. Massa placerat duis ultricies lacus. Id eu nisl nunc mi
              ipsum. Risus in hendrerit gravida rutrum quisque. Lacus vestibulum
              sed arcu non odio euismod lacinia at. Commodo odio aenean sed
              adipiscing diam donec adipiscing tristique risus. Pharetra magna
              ac placerat vestibulum lectus mauris ultrices.Cras sed felis eget
              velit aliquet sagittis id consectetur purus. Ut consequat semper
              viverra nam. Nunc pulvinar sapien et ligula ullamcorper malesuada
              proin.
            </p>
          </div>

          <div className="rw mb-8">
            <h3 className="mb-2 text-2xl font-bold">6. Cookies</h3>
            <p>
              Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Et
              netus et malesuada fames ac turpis egestas integer. Morbi
              tristique senectus et netus. Turpis egestas integer eget aliquet
              nibh. Massa placerat duis ultricies lacus. Id eu nisl nunc mi
              ipsum. Risus in hendrerit gravida rutrum quisque. Lacus vestibulum
              sed arcu non odio euismod lacinia at. Commodo odio aenean sed
              adipiscing diam donec adipiscing tristique risus. Pharetra magna
              ac placerat vestibulum lectus mauris ultrices.Cras sed felis eget
              velit aliquet sagittis id consectetur purus. Ut consequat semper
              viverra nam. Nunc pulvinar sapien et ligula ullamcorper malesuada
              proin.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
