const Prescription = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-inter">
      <div className="bg-[#F7F8F6] w-full  border border-gray-300 text-xs p-5">
        {/* TOP SECTION: Two columns */}
        <div className="flex gap-9 items-start">
          {/* LEFT COLUMN */}
          <div className=" max-w-230 bg-[#FFF] grow">
            {/* Patient Info Block */}
            <div className="p-4 pb-2">
              <p className="text-[#1D62EC] text-sm mb-3">
                Name, Vorname des Versicherten
              </p>
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="text-2xl font-medium text-black">
                    Karakoc, Anil
                  </p>
                  <p className="text-2xl font-medium text-black">
                    Eschensiepen 36
                  </p>
                  <p className="text-2xl font-medium text-black">
                    42287 Wuppertal
                  </p>
                </div>
                <div className="">
                  <p className="text-[#1D62EC] text-sm mb-3">Datum</p>
                  <p className="text-2xl font-medium text-black">24.01.1991</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-400 mx-4" />

            {/* Insurance Number Row */}
            <div className="flex border-b border-gray-400">
              <div className="w-1/3 py-10 border-r border-gray-400">
                {/* empty left cell */}
              </div>
              <div className="flex-1 p-3 border-r border-gray-400">
                <p className="text-blue-600 text-xs">Versicherungsnummer</p>
                <p className="text-blue-600 text-xs mt-1">
                  Privatrezept
                </p>
              </div>
              <div className="flex-1 p-3">
                <p className="text-blue-600 text-xs">Sozialversicherungsnummer</p>
              </div>
            </div>

            {/* Card Valid Until Row */}
            <div className="flex">
              <div className="flex-1 py-10 px-10 border-r border-gray-400">
                <p className="text-blue-600 text-xs">Privatrezept</p>
              </div>
              <div className="flex-1 p-3 border-r border-gray-400">
                <p className="text-blue-600 text-xs">Karte gültig bis</p>
              </div>
              <div className="flex-1 p-3">
                <p className="text-blue-600 text-xs">Datum</p>
                <p className="text-sm text-gray-900">24.01.1991</p>
              </div>
            </div>
          </div>
          {/* RIGHT COLUMN */}
          <div className="w-201">
            {/* Two Empty Boxes at top */}
            <div className="flex gap-6 mb-9">
              <div className="flex-1 h-16 bg-[#FFF]" />
              <div className="flex-1 h-16 bg-[#FFF]" />
            </div>
            {/* Barcode Area */}
            <div className="relative bg-white border border-blue-500 w-full h-30 flex items-stretch mb-3">
              {/* Dashed column dividers */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 border-r border-dashed border-blue-400 last:border-r-0"
                />
              ))}

              {/* 3 solid blue bars at the bottom */}
              <div className="absolute bottom-0 left-[9%] w-1.5 h-5 bg-blue-700" />
              <div className="absolute bottom-0 left-[39%] w-1.5 h-5 bg-blue-700" />
              <div className="absolute bottom-0 left-[69%] w-1.5 h-5 bg-blue-700" />
            </div>

            {/* Faktor / Taxe Labels */}
            <div className="flex pb-1">
              <div className="flex-1">
                <p className="text-blue-600 text-xs">Faktor</p>
              </div>
              <div className="w-20">
                <p className="text-blue-600 text-xs">Faktor</p>
              </div>
              <div className="w-24">
                <p className="text-blue-600 text-xs">Taxe</p>
              </div>
            </div>

            {/* Three form rows */}
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex border-t border-blue-300 mb-1">
                <div className="w-full h-21.5 border border-blue-300 mr-1 flex items-end px-1 pb-0.5">
                  {/* tick marks inside */}
                  <div className="flex gap-2 w-full">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="h-2 w-px bg-blue-300" />
                    ))}
                  </div>
                </div>
                <div className="w-full h-21.5 border border-blue-300 mr-1" />
                <div className="w-full h-21.5 border border-blue-300" />
              </div>
            ))}
          </div>
        </div>

        {/* PRESCRIPTION ROWS */}
        <div className="max-w-230">
          {/* Row 1 - with content */}
          <div className="flex items-center">
            <div className="flex items-start justify-center p-2">
              <div className="border border-blue-500 text-xs p-3 text-center leading-tight">
                <div className="text-[#1D62EC]">oder das</div>
                <div className="font-medium text-black">Gleiche</div>
              </div>
            </div>
            <div className="flex-1 p-3">
              <p className="text-blue-600 text-xs italic mb-1">
                Rp. (Bitte Leerräume durchstreichen)
              </p>
              <p className="text-sm text-gray-900 leading-snug">
                Cannabis Flos All Nations GM 104 Mac Doughnut, 5 g,
                unzerkleinert, aut
                <br />
                idem Dosierung ED: 0.03 g und TD: 0.17 g verdampfen und
                inhalieren
              </p>
            </div>
          </div>

          {/* Row 2 - empty */}
          <div className="flex items-center">
            <div className="flex items-start justify-center p-2">
              <div className="border border-blue-500 text-xs p-3 text-center leading-tight">
                <div className="text-[#1D62EC]">oder das</div>
                <div className="font-medium text-black">Gleiche</div>
              </div>
            </div>
            <div className="flex-1 px-3 py-4 flex flex-col gap-3">
              <p className="text-gray-500 tracking-widest text-sm">
                - - - - - - - - - - - - - - - - -
              </p>
              <p className="text-gray-500 tracking-widest text-sm">
                - - - - - - - - - - - - - - - - -
              </p>
            </div>
          </div>

          {/* Row 3 - empty */}
          <div className="flex items-center">
            <div className="flex items-start justify-center p-2">
              <div className="border border-blue-500 text-xs p-3 text-center leading-tight">
                <div className="text-[#1D62EC]">oder das</div>
                <div className="font-medium text-black">Gleiche</div>
              </div>
            </div>
            <div className="flex-1 px-3 py-4 flex flex-col gap-3">
              <p className="text-gray-500 tracking-widest text-sm">
                - - - - - - - - - - - - - - - - -
              </p>
              <p className="text-gray-500 tracking-widest text-sm">
                - - - - - - - - - - - - - - - - -
              </p>
            </div>
          </div>
        </div>

        {/* SIGNATURE + DOCTOR INFO */}
        <div className="flex">
          <div className="flex-1 p-4" />
          <div className="w-96 p-4">
            {/* Signature SVG */}
            <div className="mb-2">
              <svg viewBox="0 0 200 60" className="w-48 h-12" fill="none">
                <path
                  d="M10,45 C20,20 35,10 50,30 C60,42 65,15 80,20 C90,24 95,40 110,35 C125,30 130,15 145,25 C155,32 160,45 175,40 C182,37 188,30 195,28"
                  stroke="#333"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M15,50 C30,48 50,52 70,49 C90,46 110,50 130,47 C150,44 170,48 190,45"
                  stroke="#333"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </div>
            <p className="text-sm text-black">Dr. med/Pablo J. Rossi</p>
            <p className="text-sm text-black">
              Facharzt für Familien- und Gemeinschaftsmedizin
            </p>
            <p className="text-sm text-black">Carrer Berlinés 5, 5to-4ta.</p>
            <p className="text-sm text-black">08006 Barcelona</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className=" border-gray-300 px-4 py-2 flex justify-between items-center">
          <p className="text-[#1D62EC] text-sm italic ">
            Aut-idem ist ausgeschlossen, wenn der Arzt den Ausschluss durch
            Ankreuzen des Aut-idem-Feldes kenntlich gemacht hat.
          </p>
          <p className="text-[#1D62EC] text-sm">Unterschrift des Arztes</p>
        </div>

        {/* BOTTOM DISCLAIMER */}
        <div className="border-t border-gray-300 pt-5 text-center">
          <p className="text-[#111827] text-xs font-inter">
            Falls die Cannabissorte nicht vorrätig ist, darf eine andere Sorte
            mit derselben Genetik und gleichem oder niedrigerem THC-Gehalt
            abgegeben werden.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
