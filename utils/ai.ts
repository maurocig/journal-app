import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import z from 'zod';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    summary: z
      .string()
      .describe('a quick summary of the entire journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?)',
      ),
    color: z.string().describe(
      'a hexadecimal color code that represents the mood of the journal entry. Example #4ade80 for green representing happiness.', // green 500 from https://tailwindcss.com/docs/customizing-colors#color-palette-reference
    ),
  }),
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({ entry: content });
  console.log(input);
  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  // 													^ how 'silly', 'creative', or 'unlikely', (as opposed to factual) the response will be. the higher the temperature, the more likely the chance of 'ai hallucination'.
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (err) {
    console.log(err);
  }
};
