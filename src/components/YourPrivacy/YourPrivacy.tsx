const YourPrivacy = () => {
  return (
    <section
      className="w-full mx-auto  max-w-380 px-8.75 py-12"
      id="privacy-section"
    >
      <div className="grid grid-cols-[35fr_34fr_31fr] bg-[#F5F6F7] rounded-[36px] overflow-visible relative min-h-80">
        {/* ── LEFT: Text Content ── */}
        <div className="flex flex-col justify-center gap-5 max-w-110 px-13 py-12">
          <h3 className="text-[38px] font-bold leading-[1.15] text-[#1a1f16] m-0">
            Ihre Privatsphäre
            <span className="block text-[#3ab554]">ist unsere Priorität</span>
          </h3>
          <div className="flex flex-col gap-3 text-[15px] font-normal text-[#5a6472] leading-[1.7]">
            <p className="m-0">
              Wir verpflichten uns, Ihre persönlichen und medizinischen Daten
              nach höchsten Sicherheitsstandards zu schützen.
            </p>
            <p className="m-0">
              Unsere Plattform entspricht vollständig den Bestimmungen der DSGVO
              und gewährleistet, dass Ihre Daten stets verschlüsselt,
              vertraulich und sicher bleiben.
            </p>
          </div>
        </div>

        {/* ── CENTRE: Hero Image ── */}
        <div className="relative flex flex-col justify-end overflow-visible">
          {/* teal-to-mint gradient background blob */}
          <div className="absolute -top-[8%] left-0 right-0 bottom-0 bg-linear-to-t from-[#e4faea] to-[#bde8e8] rounded-[28px] z-1" />

          {/* person image — overflows card top */}
          <div className="relative z-2 w-[115%] ml-[-3%]">
            <picture className="block w-full">
              <source
                srcSet="https://images.doktorabc.com/redesign_2025/general/hero-image/hero-image.webp"
                type="image/webp"
              />
              <img
                src="https://images.doktorabc.com/redesign_2025/general/hero-image/hero-image.png"
                alt="Eine lächelnde Frau, die auf ihr Handy schaut"
                className="block w-full h-auto object-contain object-bottom"
                decoding="async"
                loading="lazy"
              />
            </picture>
          </div>
        </div>

        {/* ── RIGHT: Certificates 2×2 Grid ── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-10 pr-9 content-center justify-items-start">
          {/* LegitScript */}
          <div className="aspect-square w-full max-w-37 bg-[#FFFFFF] rounded-[18px] flex items-center justify-center p-5.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <a
              href="https://www.legitscript.com/websites/?checker_keywords=doktorabc.com"
              className="flex items-center justify-center w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture className="flex items-center justify-center w-full h-full">
                <source
                  srcSet="https://images.doktorabc.com/redesign_2025/general/cert-legitscript/cert-legitscript.webp"
                  type="image/webp"
                />
                <img
                  src="https://images.doktorabc.com/redesign_2025/general/cert-legitscript/cert-legitscript.png"
                  alt="LegitScript-zertifiziert"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </picture>
            </a>
          </div>

          {/* PCI */}
          <div className="aspect-square w-full max-w-37 bg-[#FFFFFF] rounded-[18px] flex items-center justify-center p-5.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <a
              href="https://www.pcisecuritystandards.org"
              className="flex items-center justify-center w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture className="flex items-center justify-center w-full h-full">
                <source
                  srcSet="https://images.doktorabc.com/redesign_2025/general/cert-pci/cert-pci.webp"
                  type="image/webp"
                />
                <img
                  src="https://images.doktorabc.com/redesign_2025/general/cert-pci/cert-pci.png"
                  alt="PCI-DSS-konform"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </picture>
            </a>
          </div>

          {/* Pharmacy / Qualitätssiegel */}
          <div className="aspect-square w-full max-w-37 bg-[#FFFFFF] rounded-[18px] flex items-center justify-center p-5.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <picture className="flex items-center justify-center w-full h-full">
              <source
                srcSet="https://images.doktorabc.com/redesign_2025/general/cert-pharmacy/cert-pharmacy.webp"
                type="image/webp"
              />
              <img
                src="https://images.doktorabc.com/redesign_2025/general/cert-pharmacy/cert-pharmacy.png"
                alt="Qualitätssiegel Datenschutz"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </picture>
          </div>

          {/* DMCA */}
          <div className="aspect-square w-full max-w-37 bg-[#FFFFFF] rounded-[18px] flex items-center justify-center p-5.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <a
              href="//www.dmca.com/Protection/Status.aspx"
              className="flex items-center justify-center w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture className="flex items-center justify-center w-full h-full">
                <source
                  srcSet="https://images.doktorabc.com/redesign_2025/general/cert-dmca/cert-dmca.webp"
                  type="image/webp"
                />
                <img
                  src="https://images.doktorabc.com/redesign_2025/general/cert-dmca/cert-dmca.png"
                  alt="DMCA-geschützt"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </picture>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourPrivacy;
