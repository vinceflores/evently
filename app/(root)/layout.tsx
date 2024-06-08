import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col" >
      <main className="flex-1">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}
