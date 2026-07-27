"use client";

/**
 * Root error boundary.
 *
 * This is the only boundary that catches failures in the root layout itself, so
 * it has to render its own `<html>` and `<body>`: the layout that normally
 * provides them is exactly what may have failed. That also means the site's
 * fonts and stylesheet are unavailable here, hence the inline styles.
 */
import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
