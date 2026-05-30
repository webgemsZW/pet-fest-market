import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "PetFest Market's anti-harassment policy and code of conduct for all attendees, vendors, volunteers, and staff.",
};

export default function CodeOfConductPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-12 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Code of Conduct</h1>
          <p className="mt-3 text-gray-500">Last updated: May 2026</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="prose prose-orange mx-auto max-w-3xl text-gray-600">

          <h2>Anti-Harassment Policy</h2>
          <p>
            PetFest Market is dedicated to providing a welcoming and harassment-free experience for
            everyone, regardless of gender, gender identity and expression, sexual orientation,
            disability, physical appearance (including costumes), body size, race, or religion.
          </p>
          <p>
            We do not tolerate harassment, bullying, or assault of anyone in any form. Sexual
            language and imagery is not appropriate at any PetFest Market venue. People violating
            these rules may be sanctioned or expelled from the event without a refund at the
            discretion of the PetFest Market organisers, and authorities may be contacted.
          </p>
          <p>
            This policy applies to everyone at the event — including performers, media personnel,
            exhibitors, vendors, contractors, workers, volunteers, venue staff, and celebrity
            guests. Harassment from or towards anyone, anywhere, is not acceptable.
          </p>

          <h2>Definition of Harassment</h2>
          <p>Harassment and bullying includes, but is not limited to:</p>
          <ul>
            <li>Offensive verbal or written comments or profanity</li>
            <li>Audible or visual threats or blackmail</li>
            <li>Deliberate intimidation, stalking, or following (whether in person or online)</li>
            <li>Harassing or inappropriate photography or recording</li>
            <li>Sustained disruption of talks or other events, or disturbance to the detriment of others or animals</li>
            <li>Inappropriate physical contact, or contact that causes pain or injury</li>
            <li>Unwelcome sexual attention</li>
            <li>Sexual images or displays in public spaces</li>
            <li>Making someone fearful through certain behaviours</li>
            <li>Assault of a physical nature</li>
            <li>Slander and/or unsubstantiated claims</li>
          </ul>
          <p>
            It is up to everyone to be conscious of their behaviour and the behaviours of others,
            and to call out those who are behaving inappropriately or alert event staff. What a
            person may think is acceptable to their friends may not be acceptable to others nearby.
            Everyone should be aware of their surroundings and the feelings and opinions of others
            at all times.
          </p>

          <h2>Consequences of Behaviour</h2>
          <p>
            PetFest Market or our Venue Security Teams may take any action they deem appropriate
            within the scope of the law. People asked by staff to stop any harassing behaviour are
            expected to comply immediately.
          </p>
          <p>
            All recorded details of an incident gathered for its reporting — which may include but
            are not limited to security footage, video playback and photographs, statements from
            victims and witnesses — will be handed over to the Police if required.
          </p>

          <h2>Reporting Harassment</h2>
          <p>
            If you are being harassed or bullied at PetFest Market, please contact a member of the
            event staff team immediately or go to the <strong>Information Desk</strong> for help.
            PetFest Market staff and volunteers can be identified by a coloured vest and lanyard
            with their name.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
