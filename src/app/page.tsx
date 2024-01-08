"use client";

import { useEffect, useState } from "react";

interface Quote {
  quoteId: string;
  author?: string | undefined;
  isGenerated: boolean;
  parentQuoteId?: string | undefined;
  body: string;
  createdOn: string;
  updatedOn: string;
}

export default function HomePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/quotes");
        if (!res.ok) throw new Error("Failed to fetch quotes.");
        const data: Quote[] = (await res.json()) as Quote[];
        setQuotes(data);
        setTimeout(() => setLoading(false), 500);
      } catch (err) {
        console.error(err);
      }
    };
    void fetchQuotes();
  }, []);

  return (
    <div
      className={`mx-auto flex min-h-[100dvh] max-w-sm flex-col items-center justify-center gap-6 py-6`}
    >
      {loading ? (
        <span className="animate-pulse text-4xl">Loading...</span>
      ) : (
        quotes.map((quote, i) => (
          <>
            <figure
              key={quote.quoteId}
              className={`flex min-w-full flex-col items-start justify-start gap-2 px-4`}
            >
              <span className={`text-xl font-bold`}>{++i}</span>
              <blockquote className={`text-base`}>{quote.body}</blockquote>
              <figcaption className={`text-sm`}>{quote.author}</figcaption>
            </figure>
            {i !== quotes.length ? (
              <div className={`h-0.5 w-full bg-white`} />
            ) : null}
          </>
        ))
      )}
    </div>
  );
}
