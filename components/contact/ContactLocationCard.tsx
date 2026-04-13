import Link from "next/link";
import type { ReactNode } from "react";
import {
  ExternalLink,
  Mail,
  MapPin,
  PhoneCall,
} from "lucide-react";
import type { ContactLocation } from "@/components/contact/contactData";

export function ContactLocationCard({
  location,
}: {
  location: ContactLocation;
}) {
  const Icon = location.icon;

  return (
    <div className="theme-card-surface flex h-full flex-col rounded-[1.75rem] p-6 sm:p-7 lg:p-8">
      <div className="flex items-start gap-4">
        <div className="theme-icon-badge flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <p className="theme-label text-xs uppercase tracking-[0.18em]">
            Kontakt lokacije
          </p>
          <h3 className="theme-heading mt-3 text-2xl font-semibold">
            {location.name}
          </h3>
        </div>
      </div>

      <p className="theme-body-muted mt-5 text-sm leading-7 sm:text-base">
        {location.description}
      </p>

      <div className="mt-8 grid gap-4">
        <InfoBlock
          icon={<MapPin className="h-4 w-4" />}
          label="Adresa"
          href={location.mapHref}
          external
          value={location.address}
        />
        <InfoBlock
          icon={<PhoneCall className="h-4 w-4" />}
          label="Telefon"
          href={location.phoneHref}
          value={location.phoneLabel}
        />
        <InfoBlock
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          href={location.emailHref}
          value={location.email}
          type="email"
        />
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
        <Link
          href={location.emailHref}
          className="btn-secondary flex-1 px-5 py-3"
        >
          Pošaljite email
          <Mail className="h-4 w-4" />
        </Link>

        <Link
          href={location.mapHref}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary flex-1 px-5 py-3"
        >
          Otvorite mapu
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function InfoBlock({
  icon,
  label,
  value,
  href,
  external = false,
  type = "text",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  type?: "text" | "email";
}) {
  return (
    <div className="theme-inline-panel rounded-3xl px-5 py-4">
      <div className="flex items-start gap-3">
        <div className="theme-icon-badge-soft mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="theme-label text-xs uppercase tracking-[0.16em]">
            {label}
          </p>

          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="theme-heading mt-2 inline-flex max-w-full items-start gap-2 text-base font-medium leading-7 transition duration-200 hover:text-(--accent)"
          >
            <span className={type === "email" ? "break-normal" : ""}>
              {type === "email" ? <EmailText email={value} /> : value}
            </span>
            {external ? <ExternalLink className="mt-1 h-4 w-4 shrink-0" /> : null}
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmailText({ email }: { email: string }) {
  const [local, domain] = email.split("@");

  if (!domain) {
    return <>{email}</>;
  }

  return (
    <>
      {local}@
      <wbr />
      {domain}
    </>
  );
}
