export default function Home() {
  return (
    <div className="p-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-green-600 dark:text-green-500">
          Welcome to Tool App
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore our collection of free tools.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Could list tools here or redirect */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Content */}
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Search Tools</h3>
            <p className="text-muted-foreground mb-4">Find what you need.</p>
            <a
              href="/tools"
              className="text-primary font-medium hover:underline"
            >
              Go to Tools &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
