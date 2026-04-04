"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import MobileContentBackButton from "@/app/components/MobileContentBackButton";
import { sanitizeInternalReturnPath } from "@/lib/sanitize-internal-path";

export default function ContactPageClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const returnPath = useMemo(() => sanitizeInternalReturnPath(sp.get("from")), [sp]);
  const [narrowViewport, setNarrowViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const sync = () => setNarrowViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const to = "hello@whatsnextlancaster.com";
    const params = new URLSearchParams({
      subject: subject || "Website contact",
      body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    window.location.href = `mailto:${to}?${params.toString()}`;
  }

  return (
    <div className="simplePage">
      {narrowViewport && returnPath ? (
        <div className="simplePageMobileBack">
          <MobileContentBackButton onBack={() => router.push(returnPath)} label="Back" />
        </div>
      ) : null}
      <header>
        <h1 className="simpleHeroTitle">Contact</h1>
        <p className="simpleHeroSubhead">
          Have an event, venue, or update to share? Send a message and we&apos;ll take a look.
        </p>
      </header>

      <form className="contactForm" onSubmit={submit}>
        <div className="formRow">
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="formRowSingle">
          <div>
            <label className="label" htmlFor="subject">Subject</label>
            <input
              id="subject"
              className="input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Partnership, contribution, general question…"
            />
          </div>
        </div>

        <div className="formRowSingle">
          <div>
            <label className="label" htmlFor="message">Message</label>
            <textarea
              id="message"
              className="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you&apos;d like to share."
              required
            />
          </div>
        </div>

        <button className="submitBtn" type="submit">Send message</button>
      </form>

      <section className="contactCallouts">
        <div className="calloutCard">
          <h2 className="calloutTitle">Partnerships</h2>
          <p className="calloutBody">
            Venues, sponsors, or organizations looking to collaborate.
          </p>
          <p className="calloutBody" style={{ marginTop: 10, marginBottom: 8 }}>
            <Link className="calloutLink" href="/partnerships?from=/contact">
              Partnerships overview
            </Link>
            {" · "}
            <Link className="calloutLink" href="/how-we-partner?from=/contact">
              How we partner with locals
            </Link>
          </p>
          <a className="calloutLink" href="mailto:partnerships@whatsnextlancaster.com">
            partnerships@whatsnextlancaster.com
          </a>
        </div>

        <div className="calloutCard">
          <h2 className="calloutTitle">Contributions</h2>
          <p className="calloutBody">
            Submitting events, openings, PSAs, or community notices.
          </p>
          <a className="calloutLink" href="mailto:contribute@whatsnextlancaster.com">
            contribute@whatsnextlancaster.com
          </a>
        </div>
      </section>
    </div>
  );
}
