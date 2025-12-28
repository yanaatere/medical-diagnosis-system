import './globals.css';

export const metadata = {
  title: 'MediDiagnosis - Sistem Diagnosis Medis',
  description: 'Aplikasi sistem diagnosis medis untuk admin',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  );
}