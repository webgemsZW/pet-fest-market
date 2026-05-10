import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for Pet Fest Market tickets and vendor stall fees.",
};

export default function RefundPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 pb-12 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: May 2026</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="prose prose-teal mx-auto max-w-3xl text-gray-600">
          <h2>Visitor Tickets</h2>
          <p>
            Visitor tickets are non-refundable except in the event of cancellation or significant
            changes to the event by the organiser.
          </p>
          <ul>
            <li>
              <strong>Event cancellation:</strong> If Pet Fest Market is cancelled by the
              organisers, all ticket holders will receive a full refund.
            </li>
            <li>
              <strong>Event postponement:</strong> If the event is postponed, tickets will
              automatically transfer to the new date. If you cannot attend the new date, a full
              refund will be offered.
            </li>
            <li>
              <strong>Change of mind:</strong> Refunds are not available for change of mind or
              personal circumstances, including illness or travel issues.
            </li>
          </ul>

          <h2>Vendor Stall Fees</h2>
          <p>Vendor stall fee refunds are subject to the following conditions:</p>
          <ul>
            <li>
              <strong>Cancellation more than 14 days before the event:</strong> 50% refund of stall
              fee paid.
            </li>
            <li>
              <strong>Cancellation within 14 days of the event:</strong> No refund. Stall fees are
              non-refundable within this period.
            </li>
            <li>
              <strong>Event cancellation by organisers:</strong> Full refund of all stall fees paid.
            </li>
          </ul>

          <h2>How to Request a Refund</h2>
          <p>
            To request a refund where applicable, please email{" "}
            <a href="mailto:hello@petfestmarket.com.au">hello@petfestmarket.com.au</a> with your
            order number and the reason for your request. We will process eligible refunds within 10
            business days.
          </p>

          <h2>Questions</h2>
          <p>
            If you have any questions about this policy, please contact us at{" "}
            <a href="mailto:hello@petfestmarket.com.au">hello@petfestmarket.com.au</a>.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
