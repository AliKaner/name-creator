import Link from "next/link";

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#05050A] text-gray-200 p-6 md:p-12 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <nav className="mb-8 border-b border-white/10 pb-6 flex items-center justify-between">
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors font-medium flex items-center gap-2">
            <span>&larr;</span> Back to Generator
          </Link>
        </nav>
        
        <h1 className="text-3xl font-bold text-white mb-6">Aetheria Forge API Documentation</h1>
        <p className="text-gray-400 text-lg mb-8">Generate names directly from your own applications and scripts via REST.</p>

        <div className="space-y-6">
          <section className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md">
            <h2 className="text-xl text-white font-semibold flex items-center gap-3">
              <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-md border border-green-500/20 text-sm">POST</span>
              /api/generate
            </h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Generate singular and plural fantasy names based on language preset profiles, with optional custom overrides for phonemes and emotional tone.
            </p>

            <h3 className="text-lg text-white font-semibold mt-8 mb-4 border-b border-white/10 pb-2">Request Body Payload</h3>
            <pre className="bg-black/80 p-5 rounded-xl text-sm text-green-400 overflow-x-auto border border-white/5">
{`{
  "preset": "shadow",
  "count": 5,
  "withMeaning": true,
  "override": {
    "tone": { "darkness": 1.0 },
    "phonemes": {
      "consonants": ["x", "z", "k", "th", "r"],
      "vowels": ["a", "u", "i", "e"]
    }
  }
}`}
            </pre>

            <h3 className="text-lg text-white font-semibold mt-8 mb-4 border-b border-white/10 pb-2">Available Presets</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-400">
              <li className="flex gap-2">
                <span className="text-purple-400 font-mono">noble</span>
                <span>Honored Kingdom (elegant, light)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-mono">cthulhu</span>
                <span>Elder Void (dark, harsh, madness)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-mono">shadow</span>
                <span>Shadow Dominion (stealthy, dark)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-mono">barbar</span>
                <span>War Clans (harsh, warrior)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-mono">mystic</span>
                <span>Hidden Order (secretive, elegant)</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md">
             <h3 className="text-lg text-white font-semibold mb-4 border-b border-white/10 pb-2">Example Response</h3>
             <pre className="bg-black/80 p-5 rounded-xl text-sm text-blue-300 overflow-x-auto border border-white/5">
{`{
  "results": [
    {
      "singular": "Zarith",
      "plural": "Zarithes",
      "meaning": "poison-shadow"
    },
    {
      "singular": "Silom",
      "plural": "Silomes",
      "meaning": "silence"
    }
  ]
}`}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}
