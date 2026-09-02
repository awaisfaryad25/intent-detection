import ChatBox from "@/components/ChatBox"
import Link from "next/link"



const LandingPage = () => {

  return (
    <>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center gap- px-4 py-10">
        <div className="w-full max-w-xl">
        <h1 className="text-xl font-semibold text-gray-900">Customer Intent Detection</h1>
        <p className="mt-1 text-sm text-gray-500">
          Demo chat — every message is classified by intent with a confidence score.
        </p>
      </div>
      <ChatBox />
      <Link
        href="/admin"
        className="text-sm text-gray-500 underline underline-offset-4 hover:text-gray-800"
      >
        Go to admin / test view →
      </Link>
      </main>
    </>
  )
}

export default LandingPage


