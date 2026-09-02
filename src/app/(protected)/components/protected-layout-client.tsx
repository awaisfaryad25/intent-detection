

interface ProtectedLayoutClientProps {
  children: React.ReactNode;
}

export function ProtectedLayoutClient({ children, }: ProtectedLayoutClientProps) {


  return (
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* Sidebar */}
      {/* <AppSidebar /> */}

      {/* Right Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Navbar */}
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b px-4 bg-background">
          <div className="w-full flex items-center justify-end gap-1 lg:gap-2">
            {/* <ModeToggle /> */}
            {/* <UserNav /> */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-primary/3! dark:bg-accent! p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}