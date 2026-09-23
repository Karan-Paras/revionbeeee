"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { InputError } from "@/components/errors/input-error";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactUs } from "@/features/support/actions/contact-us";
import { email as emailZod } from "@/lib/schemas";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { z } from "zod";

// Individual field schemas for real-time validation
const subjectSchema = z
  .string()
  .trim()
  .min(1, { message: "Subject is required" })
  .max(100, { message: "Subject must be at most 100 characters" });

const messageSchema = z
  .string()
  .trim()
  .min(1, { message: "Message is required" })
  .max(500, { message: "Message must be at most 500 characters" });

export function ContactUsForm() {
  const [formState, action, isPending] = useActionState(contactUs, {
    errors: {},
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  // Real-time validation error state
  const [emailError, setEmailError] = useState<string[] | undefined>();
  const [subjectError, setSubjectError] = useState<string[] | undefined>();
  const [messageError, setMessageError] = useState<string[] | undefined>();
  const [attachmentError, setAttachmentError] = useState<
    string[] | undefined
  >();

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      setEmailError(undefined);
      setSubjectError(undefined);
      setMessageError(undefined);
      setAttachmentError(undefined);
      toast.success(
        "Your request has been submitted successfully! We will get back to you soon."
      );
    }
  }, [formState]);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val.length === 0) {
      setEmailError(["Email address is required"]);
      return;
    }
    const result = emailZod.safeParse(val);
    if (result.success) {
      setEmailError(undefined);
    } else {
      setEmailError(result.error.issues.map((i) => i.message));
    }
  }

  function handleSubjectChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val.length === 0) {
      setSubjectError(["Subject is required"]);
      return;
    }
    const result = subjectSchema.safeParse(val);
    if (result.success) {
      setSubjectError(undefined);
    } else {
      setSubjectError(result.error.issues.map((i) => i.message));
    }
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    if (val.length === 0) {
      setMessageError(["Message is required"]);
      return;
    }
    const result = messageSchema.safeParse(val);
    if (result.success) {
      setMessageError(undefined);
    } else {
      setMessageError(result.error.issues.map((i) => i.message));
    }
  }

  function handleAttachmentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || file.size === 0) {
      setAttachmentError(undefined);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAttachmentError(["Image must be 5 MB or smaller"]);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setAttachmentError(["Only image files are allowed"]);
      return;
    }
    setAttachmentError(undefined);
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Validate all fields before submitting
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    let hasErrors = false;

    // Email validation
    if (!email || email.length === 0) {
      setEmailError(["Email address is required"]);
      hasErrors = true;
    } else {
      const emailResult = emailZod.safeParse(email);
      if (!emailResult.success) {
        setEmailError(emailResult.error.issues.map((i) => i.message));
        hasErrors = true;
      } else {
        setEmailError(undefined);
      }
    }

    // Subject validation
    if (!subject || subject.trim().length === 0) {
      setSubjectError(["Subject is required"]);
      hasErrors = true;
    } else {
      const subjectResult = subjectSchema.safeParse(subject);
      if (!subjectResult.success) {
        setSubjectError(subjectResult.error.issues.map((i) => i.message));
        hasErrors = true;
      } else {
        setSubjectError(undefined);
      }
    }

    // Message validation
    if (!message || message.trim().length === 0) {
      setMessageError(["Message is required"]);
      hasErrors = true;
    } else {
      const messageResult = messageSchema.safeParse(message);
      if (!messageResult.success) {
        setMessageError(messageResult.error.issues.map((i) => i.message));
        hasErrors = true;
      } else {
        setMessageError(undefined);
      }
    }

    if (hasErrors) return;

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form className="frm" onSubmit={handleFormSubmit} ref={formRef}>
      <div className="itm mb-3">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          placeholder="Enter your email"
          variant="bordered"
          id="email"
          name="email"
          type="email"
          disabled={isPending}
          errors={emailError ?? formState.errors.email}
          autoComplete="current-password"
          onChange={handleEmailChange}
        />
      </div>
      <div className="itm mb-3">
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <Input
          placeholder="Enter a subject"
          variant="bordered"
          id="subject"
          name="subject"
          disabled={isPending}
          errors={subjectError ?? formState.errors.subject}
          onChange={handleSubjectChange}
        />
      </div>
      <div className="itm mb-3">
        <FormLabel htmlFor="message">Message</FormLabel>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter the message"
          disabled={isPending}
          errors={messageError ?? formState.errors.message}
          className="h-32"
          onChange={handleMessageChange}
        />
      </div>
      <div className="itm mb-3">
        <input
          id="attachment"
          name="attachment"
          disabled={isPending}
          type="file"
          className="md:w-4/12 w-full rounded-xl bg-[#EFF7FF] px-5 py-5 text-[#6CB5F9]"
          onChange={handleAttachmentChange}
        />
        {!!(attachmentError ?? formState.errors.attachment) && (
          <InputError
            error={(attachmentError ?? formState.errors.attachment)!.join(", ")}
          />
        )}
      </div>
      <div className="itm mb-3">
        <Button
          className="mx-auto mt-10 w-fit rounded-xl px-10 shadow-xl/10"
          disabled={isPending}
        >
          Submit the Request
        </Button>
      </div>
      <ErrorBlock errors={formState.errors._form} />
    </form>
  );
}
