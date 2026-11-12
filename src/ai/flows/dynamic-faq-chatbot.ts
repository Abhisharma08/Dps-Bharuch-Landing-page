'use server';

/**
 * @fileOverview Dynamic FAQ Chatbot for DPS Anand Admissions.
 *
 * - `askQuestion` - A function that takes a question about DPS Anand's admission process and returns an informative answer.
 * - `QuestionInput` - The input type for the askQuestion function.
 * - `AnswerOutput` - The return type for the askQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionInputSchema = z.object({
  question: z.string().describe('The question about DPS Anand admissions.'),
});
export type QuestionInput = z.infer<typeof QuestionInputSchema>;

const AnswerOutputSchema = z.object({
  answer: z.string().describe('The informative answer to the question.'),
});
export type AnswerOutput = z.infer<typeof AnswerOutputSchema>;

export async function askQuestion(input: QuestionInput): Promise<AnswerOutput> {
  return dynamicFAQChatbotFlow(input);
}

const dynamicFAQChatbotPrompt = ai.definePrompt({
  name: 'dynamicFAQChatbotPrompt',
  input: {schema: QuestionInputSchema},
  output: {schema: AnswerOutputSchema},
  prompt: `You are an AI chatbot for DPS Anand, a school focused on shaping children's futures through education. Your primary goal is to provide parents with instant, informative answers to their questions about the admission process. Use a welcoming and trustworthy tone.

  Question: {{{question}}}
  
  Please provide a concise and helpful answer. If the question is not related to DPS Anand admissions, politely indicate that you can only answer questions about admissions.`,
});

const dynamicFAQChatbotFlow = ai.defineFlow(
  {
    name: 'dynamicFAQChatbotFlow',
    inputSchema: QuestionInputSchema,
    outputSchema: AnswerOutputSchema,
  },
  async input => {
    const {output} = await dynamicFAQChatbotPrompt(input);
    return output!;
  }
);
