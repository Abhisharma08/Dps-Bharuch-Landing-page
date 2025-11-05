"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { submitStep1, submitStep2 } from '@/app/actions/hubspot';
import { event as gtmEvent } from '@/lib/gtm';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  parentName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  mobileNumber: z.string().min(10, { message: "Please enter a valid 10-digit mobile number." }).max(15),
  childName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  gradeApplyingFor: z.string({ required_error: "Please select a grade." }),
});

type FormValues = z.infer<typeof formSchema>;

const step1Fields: (keyof FormValues)[] = ["parentName", "email", "mobileNumber"];

export function InquiryForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: '',
      email: '',
      mobileNumber: '',
      childName: '',
    },
  });

  async function handleNext() {
    const isValid = await form.trigger(step1Fields);
    if (isValid) {
      setLoading(true);
      const values = form.getValues();
      try {
        const result = await submitStep1({
          name: values.parentName,
          email: values.email,
          phone: values.mobileNumber,
        });

        if (process.env.NODE_ENV === 'development' && !result.success) {
          toast({
            title: "HubSpot Sync Failed",
            description: result.message,
            variant: "destructive",
          });
        }

        gtmEvent({
          eventName: 'form_step1_complete',
          email: values.email,
        });

        setStep(2);
      } catch (e: any) {
        console.error(e);
        toast({
          title: "An error occurred",
          description: e.message || "Could not save your details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      const result = await submitStep2({
        email: values.email,
        childs_name: values.childName,
        grade_applying_for: values.gradeApplyingFor,
      });

      if (process.env.NODE_ENV === 'development' && !result.success) {
        toast({
          title: "HubSpot Sync Failed",
          description: result.message,
          variant: "destructive",
        });
      }

      router.push('/thank-you');
    } catch (e: any) {
      console.error(e);
      toast({
        title: "An error occurred",
        description: e.message || "Failed to save details. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="bg-background/80 backdrop-blur-sm border-gray-400 text-foreground shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Enquire Now</CardTitle>
          <CardDescription className="text-center text-foreground/80">
            Share your details below, and our admissions counselor will connect with you shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="parentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent's Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="e.g. username@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="e.g. 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="childName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Child's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Child Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gradeApplyingFor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade Applying For</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a grade" />
                            </SelectTrigger>
                          </FormControl>
                          {/* FIXED: White dropdown background */}
                          <SelectContent className="bg-white text-black border border-gray-200 shadow-lg">
                            {['Nursery', 'LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)].map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex gap-4 pt-4">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
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
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Next"}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Request a Callback"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
