import "~/styles/globals.css";

export const metadata = {
  title: "ProgenyPhrase",
  description: "Where quotes make babies 🤰",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-black font-sans text-white`}>{children}</body>
    </html>
  );
}
