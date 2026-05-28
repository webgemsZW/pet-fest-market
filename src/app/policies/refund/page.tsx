import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for PetFest Market tickets and vendor stall fees.",
};

/*
  TODO(content): No client-supplied refund policy exists. Everything below is
  lorem ipsum placeholder. The 25 May email from the client confirms that
  ticketing is being handled via a third-party platform whose terms will likely
  feed into this page, and stallholder applications are still being finalised
  on a Google Form. Request the actual refund policy text (covering both
  visitor tickets and stallholder fees) from the client before going live.
*/
export default function RefundPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-12 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: [TODO: date once client provides policy]</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="prose prose-orange mx-auto max-w-3xl text-gray-600">
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <h2>Duis aute irure</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</li>
          </ul>

          <h2>Sed ut perspiciatis</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about this policy, please contact us at{" "}
            <a href="mailto:petfest@nonconformity.com.au">petfest@nonconformity.com.au</a>.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
