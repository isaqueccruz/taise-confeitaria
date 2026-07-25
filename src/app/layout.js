import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Doce Encanto",
    template: "%s • Doce Encanto",
  },
  description: "Confeitaria artesanal com bolos feitos sob encomenda.",
};

function AppContainer({ children }) {
  return (
    <body
      className={[
        fontSans.variable,
        fontMono.variable,
        "antialiased",
      ].join(" ")}
    >
      {children}
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <AppContainer>
        {children}
      </AppContainer>
    </html>
  );
}
