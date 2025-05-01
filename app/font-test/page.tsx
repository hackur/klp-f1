export default function FontTestPage() {
  const fonts = [
    { name: "Montserrat", class: "font-montserrat" },
    { name: "Nunito Sans", class: "font-nunito-sans" },
    { name: "Lato", class: "font-lato" },
    { name: "Figtree", class: "font-figtree" },
    { name: "Manrope", class: "font-manrope" },
    { name: "Roboto", class: "font-roboto" },
    { name: "Open Sans", class: "font-open-sans" },
    { name: "Noto Sans", class: "font-noto-sans" },
    { name: "Sen", class: "font-sen" },
  ]

  const sampleText = "The quick brown fox jumps over the lazy dog. 1234567890"
  const weights = ["normal", "medium", "semibold", "bold"]
  const sizes = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#000005] dark:text-white">Font Test Page</h1>
        
        {fonts.map((font) => (
          <div key={font.name} className="mb-12 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-lg p-6">
            <h2 className={`text-3xl mb-4 ${font.class} text-[#000005] dark:text-white`}>
              {font.name}
            </h2>

            <div className="space-y-8">
              {weights.map((weight) => (
                <div key={weight} className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#000005]/80 dark:text-white/80 capitalize">
                    {weight}
                  </h3>
                  {sizes.map((size) => (
                    <p
                      key={size}
                      className={`${font.class} ${size} font-${weight} text-[#000005] dark:text-white`}
                    >
                      {sampleText}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-[#000005]/80 dark:text-white/80">
                UI Examples
              </h3>
              <div className={`space-y-2 ${font.class}`}>
                <h4 className="text-2xl font-bold text-[#000005] dark:text-white">
                  Welcome to Kasher
                </h4>
                <p className="text-[#000005]/80 dark:text-white/80">
                  Experience the innovation of our premium lighter tools designed for the modern consumer.
                </p>
                <button className="bg-[#9aca3c] hover:bg-[#8bbb36] text-white px-4 py-2 rounded-md">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
