"use client";

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { submitStep1, submitStep2 } from '@/app/actions/hubspot';
import { event as gtmEvent } from '@/lib/gtm';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type FormValues = {
  parentName: string;
  email: string;
  mobileNumber: string;
  childName: string;
  gradeApplyingFor: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>> & { form?: string };

const INITIAL_VALUES: FormValues = {
  parentName: '',
  email: '',
  mobileNumber: '',
  childName: '',
  gradeApplyingFor: '',
};

const GRADE_OPTIONS = ['Nursery', 'LKG', 'UKG', ...Array.from({ length: 12 }, (_, index) => `Grade ${index + 1}`)];

function validateStep1(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.parentName.trim().length < 2) {
    errors.parentName = 'Name must be at least 2 characters.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email.';
  }

  if (!/^\d{10,15}$/.test(values.mobileNumber.replace(/\D/g, ''))) {
    errors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
  }

  return errors;
}

function validateStep2(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.childName.trim().length < 2) {
    errors.childName = 'Name must be at least 2 characters.';
  }

  if (!values.gradeApplyingFor) {
    errors.gradeApplyingFor = 'Please select a grade.';
  }

  return errors;
}

export function InquiryForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
      form: undefined,
    }));
  }

  async function handleNext() {
    const nextErrors = validateStep1(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);

    try {
      await submitStep1({
        name: values.parentName.trim(),
        email: values.email.trim(),
        phone: values.mobileNumber.replace(/\D/g, ''),
      });

      gtmEvent({
        eventName: 'form_step1_complete',
        email: values.email.trim(),
      });

      setErrors({});
      setStep(2);
    } catch (error) {
      console.error(error);
      setErrors({
        form: error instanceof Error ? error.message : 'Could not save your details. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateStep2(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);

    try {
      await submitStep2({
        email: values.email.trim(),
        childs_name: values.childName.trim(),
        grade_applying_for: values.gradeApplyingFor,
      });

      router.push('/thank-you');
    } catch (error) {
      console.error(error);
      setErrors({
        form: error instanceof Error ? error.message : 'Failed to save details. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card id="form-scrl" className="border-gray-400 bg-background/80 text-foreground shadow-2xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Enquire Now for Admission 2026</CardTitle>
        <CardDescription className="text-center text-foreground/80">
          Share your details below, and our admissions counselor will connect with you shortly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {step === 1 && (
            <>
              <div className="space-y-2">
                <label htmlFor="parentName" className="text-sm font-medium">
                  Parent&apos;s Full Name
                </label>
                <Input
                  id="parentName"
                  name="parentName"
                  placeholder="e.g. Your Name"
                  value={values.parentName}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.parentName)}
                />
                {errors.parentName && <p className="text-sm text-destructive">{errors.parentName}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. username@example.com"
                  value={values.email}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="mobileNumber" className="text-sm font-medium">
                  Mobile Number
                </label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  inputMode="numeric"
                  placeholder="e.g. 9876543210"
                  value={values.mobileNumber}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.mobileNumber)}
                />
                {errors.mobileNumber && <p className="text-sm text-destructive">{errors.mobileNumber}</p>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <label htmlFor="childName" className="text-sm font-medium">
                  Child&apos;s Name
                </label>
                <Input
                  id="childName"
                  name="childName"
                  placeholder="e.g. Child Name"
                  value={values.childName}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.childName)}
                />
                {errors.childName && <p className="text-sm text-destructive">{errors.childName}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="gradeApplyingFor" className="text-sm font-medium">
                  Grade Applying For
                </label>
                <select
                  id="gradeApplyingFor"
                  name="gradeApplyingFor"
                  value={values.gradeApplyingFor}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.gradeApplyingFor)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a grade</option>
                  {GRADE_OPTIONS.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                {errors.gradeApplyingFor && <p className="text-sm text-destructive">{errors.gradeApplyingFor}</p>}
              </div>
            </>
          )}

          {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}

          <div className="flex gap-4 pt-4">
            {step === 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setErrors({});
                  setStep(1);
                }}
                className="w-full"
                disabled={loading}
              >
                Previous
              </Button>
            )}

            {step === 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Next'}
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Request a Callback'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
