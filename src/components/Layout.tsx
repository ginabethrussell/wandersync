import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  showFooter?: boolean;
  showHeader?: boolean;
};

export default function Layout({
  children,
  showFooter = true,
  showHeader = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white">
      {showHeader && (
        <Header />
      )}

      <main className="flex-grow">{children}</main>

      {showFooter && (
        <Footer />
      )}
    </div>
  );
}
