"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, MessageSquareText, Send, Star } from "lucide-react";

const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];

type FormFields = "name" | "email" | "phone" | "company" | "feedback";
type EmailStatus = "idle" | "sending" | "sent" | "failed";

function validateField(field: FormFields, value: string) {
  const trimmed = value.trim();
  switch (field) {
    case "name":
      if (!trimmed) return "Please enter your name.";
      if (trimmed.length > 100) return "Name must be 100 characters or fewer.";
      return "";
    case "email":
      if (!trimmed) return "Please enter your email address.";
      if (trimmed.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address, for example name@example.com.";
      return "";
    case "phone": {
      if (!trimmed) return "";
      if (!/^\d{10}$/.test(trimmed)) return "Enter exactly 10 digits.";
      return "";
    }
    case "company":
      return trimmed.length > 150 ? "Company must be 150 characters or fewer." : "";
    case "feedback":
      return trimmed.length > 1500 ? "Feedback must be 1,500 characters or fewer." : "";
  }
}

export default function ReviewForm() {
  const emailAttemptRef = useRef(0);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", feedback: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<FormFields | "rating", string>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    feedback: "",
    rating: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [error, setError] = useState("");

  function updateField(field: FormFields, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => current[field] ? { ...current, [field]: validateField(field, value) } : current);
  }

  function validateAllFields() {
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      company: validateField("company", formData.company),
      feedback: validateField("feedback", formData.feedback),
      rating: rating ? "" : "Please select a star rating.",
    };
    setFieldErrors(errors);
    return Object.values(errors).every((fieldError) => !fieldError);
  }

  async function sendThankYouEmail(name: string, email: string, attempt: number) {
    try {
      const response = await fetch("/api/send-thank-you", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const result = await response.json();
      if (!response.ok || result.emailSent !== true) throw new Error("Email was not delivered.");
      if (emailAttemptRef.current === attempt) setEmailStatus("sent");
    } catch {
      if (emailAttemptRef.current === attempt) setEmailStatus("failed");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!validateAllFields()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          feedback: formData.feedback.trim(),
          rating,
          timestamp: new Date().toISOString(),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "We couldn't send your review. Please try again.");
      }
      setIsSubmitted(true);
      setEmailStatus("sending");
      const attempt = ++emailAttemptRef.current;
      void sendThankYouEmail(formData.name.trim(), formData.email.trim(), attempt);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We couldn't send your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    emailAttemptRef.current += 1;
    setFormData({ name: "", email: "", phone: "", company: "", feedback: "" });
    setRating(0);
    setHoveredRating(0);
    setFieldErrors({ name: "", email: "", phone: "", company: "", feedback: "", rating: "" });
    setEmailStatus("idle");
    setError("");
    setIsSubmitted(false);
  }

  return (
    <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-14 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float absolute -left-20 top-12 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="animate-float absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-uttam-yellow/10 blur-3xl" style={{ animationDelay: "1.4s" }} />
        <div className="grid-stage absolute inset-0 opacity-20" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10"
      >
        <div className="kicker eyebrow">Steel Construction Expo Asia 2026</div>
        <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-.045em] sm:text-5xl lg:text-6xl">
          Your insight<br />
          <span className="text-uttam-yellow">builds what’s next.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Thank you for visiting Uttam Galva Innovative Solutions Pvt Ltd. Share a quick review and help us shape smarter steel solutions.
        </p>
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] p-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-yellow-300/25 bg-yellow-300/10 text-uttam-yellow">
            <MessageSquareText size={21} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">A minute well spent</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Your feedback goes directly to our expo team.</p>
          </div>
        </div>
        <div className="mt-7 flex items-center gap-3 text-xs font-bold tracking-[.12em] text-slate-400">
          <span className="h-px w-8 bg-uttam-yellow/70" />
          ENGINEERING STEEL INTELLIGENCE
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="panel holo-panel relative overflow-hidden rounded-2xl p-5 sm:p-8"
      >
        <div aria-hidden="true" className="holo-sheen" />
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {isSubmitted ? (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex min-h-[390px] flex-col items-center justify-center py-10 text-center"
                role="status"
              >
                <motion.div
                  initial={{ scale: 0.7, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16 }}
                  className="grid h-20 w-20 place-items-center rounded-full border border-emerald-300/40 bg-emerald-300/10 text-emerald-300"
                >
                  <Check size={38} strokeWidth={2.5} />
                </motion.div>
                <p className="eyebrow mt-6 text-emerald-300">Review received</p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">Thank you, {formData.name.trim()}.</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                  Your feedback has been shared with our team. We appreciate you being part of what comes next.
                </p>
                <p aria-live="polite" className={`mt-3 text-sm ${
                  emailStatus === "sent" ? "text-emerald-200" :
                  emailStatus === "failed" ? "text-amber-200" : "text-slate-300"
                }`}>
                  {emailStatus === "sending" && "Sending your thank-you email…"}
                  {emailStatus === "sent" && `A thank-you email has been sent to ${formData.email.trim()}.`}
                  {emailStatus === "failed" && "Your review was saved, but we couldn't send the thank-you email."}
                </p>
                <button type="button" onClick={resetForm} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-bold text-slate-200 transition hover:border-yellow-300/50 hover:text-uttam-yellow">
                  Ready for the next visitor <ArrowRight size={16} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="review-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-uttam-yellow">Visitor review</p>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">How was your experience?</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">A few quick details help us make your next visit even better.</p>
                  </div>
                  <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-uttam-yellow sm:grid">
                    <MessageSquareText size={20} />
                  </div>
                </div>

                <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold text-slate-100">
                      Your rating <span className="text-rose-300">*</span>
                    </legend>
                    <div
                      aria-describedby={fieldErrors.rating ? "rating-error" : undefined}
                      aria-invalid={Boolean(fieldErrors.rating)}
                      className="flex flex-wrap items-center gap-1.5 sm:gap-2"
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      {ratingLabels.map((label, index) => {
                        const value = index + 1;
                        const active = value <= (hoveredRating || rating);
                        return (
                          <button
                            key={label}
                            type="button"
                            onMouseEnter={() => setHoveredRating(value)}
                            onFocus={() => setHoveredRating(value)}
                            onBlur={() => setHoveredRating(0)}
                            onClick={() => {
                              setRating(value);
                              setFieldErrors((current) => ({ ...current, rating: "" }));
                            }}
                            aria-label={`${value} out of 5 stars: ${label}`}
                            aria-pressed={rating === value}
                            className={`grid h-12 w-12 place-items-center rounded-xl border transition duration-200 hover:-translate-y-0.5 ${
                              active
                                ? "border-yellow-300/45 bg-yellow-300/10 text-uttam-yellow"
                                : "border-white/10 bg-slate-950/25 text-slate-500 hover:border-white/25 hover:text-slate-300"
                            }`}
                          >
                            <Star size={21} className={active ? "fill-uttam-yellow" : ""} />
                          </button>
                        );
                      })}
                      <span aria-live="polite" className="ml-1 min-w-20 text-xs font-semibold text-slate-400">
                        {(hoveredRating || rating) ? ratingLabels[(hoveredRating || rating) - 1] : "Tap to rate"}
                      </span>
                    </div>
                    {fieldErrors.rating && <p id="rating-error" className="mt-2 text-xs font-semibold text-rose-300">{fieldErrors.rating}</p>}
                  </fieldset>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-100">
                      Your name <span className="text-rose-300">*</span>
                      <input
                        id="visitor-name"
                        required
                        maxLength={100}
                        autoComplete="name"
                        value={formData.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        onBlur={(event) => setFieldErrors((current) => ({ ...current, name: validateField("name", event.target.value) }))}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        placeholder="Enter your name"
                        className="form-field mt-2 text-sm"
                      />
                      {fieldErrors.name && <p id="name-error" className="mt-1.5 text-xs font-semibold text-rose-300">{fieldErrors.name}</p>}
                    </label>
                    <label className="block text-sm font-semibold text-slate-100">
                      Email address <span className="text-rose-300">*</span>
                      <input
                        id="visitor-email"
                        required
                        type="email"
                        maxLength={254}
                        autoComplete="email"
                        value={formData.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        onBlur={(event) => setFieldErrors((current) => ({ ...current, email: validateField("email", event.target.value) }))}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        placeholder="you@example.com"
                        className="form-field mt-2 text-sm"
                      />
                      {fieldErrors.email && <p id="email-error" className="mt-1.5 text-xs font-semibold text-rose-300">{fieldErrors.email}</p>}
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-100">
                      Phone <span className="font-normal text-slate-500">(optional)</span>
                      <input
                        id="visitor-phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(event) => updateField("phone", event.target.value.replace(/\D/g, "").slice(0, 10))}
                        onBlur={(event) => setFieldErrors((current) => ({ ...current, phone: validateField("phone", event.target.value) }))}
                        aria-invalid={Boolean(fieldErrors.phone)}
                        aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                        placeholder="10-digit phone number"
                        className="form-field mt-2 text-sm"
                      />
                      {fieldErrors.phone && <p id="phone-error" className="mt-1.5 text-xs font-semibold text-rose-300">{fieldErrors.phone}</p>}
                    </label>
                    <label className="block text-sm font-semibold text-slate-100">
                      Company <span className="font-normal text-slate-500">(optional)</span>
                      <input
                        id="visitor-company"
                        maxLength={150}
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(event) => updateField("company", event.target.value)}
                        onBlur={(event) => setFieldErrors((current) => ({ ...current, company: validateField("company", event.target.value) }))}
                        aria-invalid={Boolean(fieldErrors.company)}
                        aria-describedby={fieldErrors.company ? "company-error" : undefined}
                        placeholder="Company name"
                        className="form-field mt-2 text-sm"
                      />
                      {fieldErrors.company && <p id="company-error" className="mt-1.5 text-xs font-semibold text-rose-300">{fieldErrors.company}</p>}
                    </label>
                  </div>

                  <label className="block text-sm font-semibold text-slate-100">
                    <span className="inline-flex items-center gap-2">
                      Anything you’d like to share? <span className="font-normal text-slate-500">(optional)</span>
                    </span>
                    <textarea
                      id="visitor-feedback"
                      maxLength={1500}
                      rows={3}
                      value={formData.feedback}
                      onChange={(event) => updateField("feedback", event.target.value)}
                      onBlur={(event) => setFieldErrors((current) => ({ ...current, feedback: validateField("feedback", event.target.value) }))}
                      aria-invalid={Boolean(fieldErrors.feedback)}
                      aria-describedby={fieldErrors.feedback ? "feedback-error" : undefined}
                      placeholder="Your thoughts or suggestions"
                      className="form-field mt-2 resize-y text-sm"
                    />
                    {fieldErrors.feedback && <p id="feedback-error" className="mt-1.5 text-xs font-semibold text-rose-300">{fieldErrors.feedback}</p>}
                  </label>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        role="alert"
                        className="overflow-hidden rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs leading-5 text-slate-500">Your review helps us build smarter manufacturing experiences. Your email is stored with the review and used for the thank-you message.</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="steel-button min-h-12 w-full disabled:cursor-wait sm:w-auto"
                    >
                      <Send size={16} />
                      {isSubmitting ? "SENDING…" : "SEND REVIEW"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
}
