import { db } from "~/server/db";

export const GET = async () => {
  try {
    // Get the number of quotes in the database
    const quoteCount = await db.quote.count();
    // Generate an array of random quote IDs from quoteCount
    const quoteIds: number[] = [];
    const numberOfQuotes = 5;
    for (let i = 0; i < numberOfQuotes; i++) {
      const randomNumber = Math.floor(Math.random() * quoteCount) + 1;
      quoteIds.push(randomNumber);
    }
    // Get the quotes from the database using the random quote IDs
    const quotes = await db.quote.findMany({
      where: {
        quoteId: {
          in: quoteIds,
        },
      },
    });
    // Convert the bigints to strings for JSON serialization
    const quotesWithStrings = quotes.map((quote) => ({
      ...quote,
      quoteId: quote.quoteId.toString(),
      parentQuoteId: quote.parentQuoteId?.toString(),
    }));
    // Return the quotes as JSON
    return new Response(JSON.stringify(quotesWithStrings), { status: 200 });
  } catch (err) {
    // If there's an error, return a 500 error
    return new Response("Failed to serve quotes to client.", { status: 500 });
  }
};
