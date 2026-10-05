"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { parseInquiry, type Inquiry, type InquiryErrors } from "@/lib/inquiry";
import { Icon } from "./Icon";
import { buttonClasses, cn } from "./ui";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-3 text-base text-ink shadow-xs transition-colors placeholder:text-slate-400 focus:border-accent-600 focus:ring-2 focus:ring-accent-600/20 focus:outline-none";

export function ContactForm({
  serviceOptions,
  propertyTypes,
  defaultService = "",
}: {
  serviceOptions: string[];
  propertyTypes: string[];
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const payload = { ...values, privacyAccepted: values.privacyAccepted === "on" };

    const { errors: clientErrors } = parseInquiry(payload);
    setErrors(clientErrors);
    setServerMessage("");
    if (Object.keys(clientErrors).length > 0) {
      focusFirstError(form, clientErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: InquiryErrors; message?: string };

      if (response.ok && result.ok) {
        setStatus("success");
        form.reset();
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (result.errors) {
        setErrors(result.errors);
        focusFirstError(form, result.errors);
      }
      setServerMessage(result.message ?? "Bitte prüfen Sie Ihre Angaben.");
      setStatus("error");
    } catch {
      setServerMessage("Ihre Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Internetverbindung oder rufen Sie uns an.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center rounded-2xl border border-accent-600/20 bg-accent-50 px-6 py-12 text-center focus:outline-none"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-accent-600 text-white">
          <Icon name="check" size={28} strokeWidth={2.5} />
        </span>
        <p className="mt-5 text-xl font-semibold text-ink">Vielen Dank für Ihre Anfrage.</p>
        <p className="mt-2 max-w-md text-ink-muted">Wir melden uns schnellstmöglich bei Ihnen.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-accent-700 hover:underline">
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  const err = (name: keyof Inquiry) => errors[name];

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby="form-hint">
      <p id="form-hint" className="text-sm text-ink-muted">
        Felder mit <span aria-hidden="true">*</span>
        <span className="sr-only">Stern</span> sind Pflichtfelder.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="firstName" label="Vorname" required error={err("firstName")}>
          <input id="firstName" name="firstName" type="text" autoComplete="given-name" required {...ariaProps("firstName", err("firstName"))} className={inputClass(err("firstName"))} />
        </Field>
        <Field name="lastName" label="Nachname" required error={err("lastName")}>
          <input id="lastName" name="lastName" type="text" autoComplete="family-name" required {...ariaProps("lastName", err("lastName"))} className={inputClass(err("lastName"))} />
        </Field>
        <Field name="email" label="E-Mail" required error={err("email")}>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required {...ariaProps("email", err("email"))} className={inputClass(err("email"))} />
        </Field>
        <Field name="phone" label="Telefonnummer" error={err("phone")}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" {...ariaProps("phone", err("phone"))} className={inputClass(err("phone"))} />
        </Field>
      </div>

      <Field name="location" label="Adresse / Ort des Objekts" error={err("location")}>
        <input id="location" name="location" type="text" autoComplete="street-address" placeholder="z. B. Straße, Aichach" className={inputClass()} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="propertyType" label="Art der Immobilie">
          <select id="propertyType" name="propertyType" defaultValue="" className={inputClass()}>
            <option value="">Bitte wählen</option>
            {propertyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field name="service" label="Gewünschte Leistung">
          <select id="service" name="service" defaultValue={defaultService} className={inputClass()}>
            <option value="">Bitte wählen</option>
            {serviceOptions.map((service) => (
              <option key={service}>{service}</option>
            ))}
            <option>Mehrere Leistungen / Komplettbetreuung</option>
            <option>Sonstiges</option>
          </select>
        </Field>
      </div>

      <Field name="message" label="Nachricht" required error={err("message")}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Beschreiben Sie kurz Ihr Objekt und welche Unterstützung Sie benötigen."
          required {...ariaProps("message", err("message"))}
          className={inputClass(err("message"))}
        />
      </Field>

      <fieldset>
        <legend className="text-sm font-medium text-ink">Wie können wir Sie am besten erreichen?</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {(["Telefon", "E-Mail"] as const).map((option) => (
            <label
              key={option}
              className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-white px-4 has-[:checked]:border-accent-600 has-[:checked]:bg-accent-50"
            >
              <input type="radio" name="contactPreference" value={option} className="size-4 accent-accent-600" />
              <Icon name={option === "Telefon" ? "phone" : "mail"} size={18} className="text-ink-muted" />
              <span className="text-sm font-medium text-ink">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot gegen Spam – für Menschen unsichtbar */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            name="privacyAccepted"
            required
            {...ariaProps("privacyAccepted", err("privacyAccepted"))}
            className="mt-1 size-4 shrink-0 accent-accent-600"
          />
          <span>
            Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden. Weitere
            Informationen in der{" "}
            <Link href="/datenschutz" className="font-medium text-accent-700 underline underline-offset-2">
              Datenschutzerklärung
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        {err("privacyAccepted") && <ErrorText id="privacyAccepted-error">{err("privacyAccepted")}</ErrorText>}
      </div>

      {status === "error" && serverMessage && (
        <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          <Icon name="alert" size={18} className="mt-0.5 shrink-0" />
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto")}
      >
        {status === "submitting" ? "Wird gesendet …" : "Kostenloses Angebot anfragen"}
        {status !== "submitting" && <Icon name="arrowRight" size={20} />}
      </button>
      <p className="text-xs text-ink-muted">Unverbindlich und kostenlos. Wir melden uns schnellstmöglich bei Ihnen.</p>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  error,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-red-700">
      {children}
    </p>
  );
}

function ariaProps(name: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
  } as const;
}

function inputClass(error?: string) {
  return cn(fieldClasses, error ? "border-red-400" : "border-slate-300");
}

function focusFirstError(form: HTMLFormElement, errors: InquiryErrors) {
  const first = Object.keys(errors)[0];
  if (!first) return;
  const element = form.elements.namedItem(first);
  if (element instanceof HTMLElement) element.focus();
}
