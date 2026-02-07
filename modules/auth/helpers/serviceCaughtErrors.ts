import { ZodError } from "zod";

const authServicesCaughtErrors = (
  error: any,
  service: string,
  intent: string,
) => {
  if (error instanceof ZodError) {
    console.error(`${intent} validation error:`, error.flatten());
    throw new Error(`${intent} data validation failed`);
  }

  if (error instanceof Error) {
    console.error(`${service} error:`, error.message);
    throw new Error(error.message);
  }

  console.error(`Unknown ${intent} error:`, error);
  throw new Error(`Unexpected error while processing ${intent} data`);
};

export { authServicesCaughtErrors };
