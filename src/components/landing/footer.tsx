export default function Footer() {
  return (
    <footer className="bg-muted border-t pb-24 md:pb-0">
      <div className="container mx-auto py-6 px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DPS Anand. All Rights Reserved. A brighter future starts here.</p>
      </div>
    </footer>
  );
}
