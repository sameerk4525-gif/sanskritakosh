export const logError = (context: string, error: unknown) => {
    const timestamp = new Date().toISOString();
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "no stack trace";

    console.error(`[${timestamp}] ❌ ${context}`);
    console.error(`    Message: ${errorMsg}`);
    console.error(`    Stack: ${errorStack}`);
    console.error("---");
};
