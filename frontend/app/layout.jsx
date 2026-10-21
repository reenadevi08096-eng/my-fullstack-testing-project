export const metadata = {
  title: 'Prodesk IT Project',
  description: 'Track A and Track B Integration',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}