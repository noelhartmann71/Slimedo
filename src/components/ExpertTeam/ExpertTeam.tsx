import { useState } from "react";
import DoctorImage from "../../../public/images/home/doctor-image.png";

interface Doctor {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Abdur Rahim",
    title: "Leitender Berater",
    bio: "Dr. Abdur Rahim ist ein Arzt mit langjähriger Erfahrung in der Patientenversorgung. Er stellt sicher, dass medizinisches Fachwissen und höchste Standards die Grundlage unserer Programme zur Gewichtsreduktion bilden.",
    image: DoctorImage,
  },
  {
    id: 2,
    name: "Dr. Angel Sadia",
    title: "Leitende Beraterin",
    bio: "Dr. Angel Sadia Bechstein ist eine Ärztin mit langjähriger Erfahrung in der Patientenversorgung. Sie stellt sicher, dass medizinisches Fachwissen und höchste Standards die Grundlage unserer Programme zur Gewichtsreduktion bilden.",
    image: DoctorImage,
  },
];

const quotes = [
  {
    id: 1,
    text: '"Wir setzen uns dafür ein, hochwertige Gesundheitsversorgung für alle zugänglich zu machen. Unser Team verbindet langjährige medizinische Expertise mit einem mitfühlenden und patientenorientierten Ansatz."',
    author: "Dr. Sarah Mitchell, Leitende Chefärztin",
    role: "Leitende Beraterin",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 2,
    text: '"Wir setzen uns dafür ein, hochwertige Gesundheitsversorgung für alle zugänglich zu machen. Unser Team verbindet langjährige medizinische Expertise mit einem mitfühlenden und patientenorientierten Ansatz."',
    author: "Dr. Sarah Mitchell, Leitende Chefärztin",
    role: "Leitende Beraterin",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&h=80&fit=crop&crop=face",
  },
];

export default function ExpertTeam() {
  const [expandedId, setExpandedId] = useState<number | null>(2);

  return (
    <>
      <section className="bg-linear-to-b from-[#13302A] to-[#122216] ">
        {/* Section header */}
        <div className="text-center py-10 rounded-xl">
          <span className="inline-block px-3 py-1 bg-[#FEF6DB] text-[#29574E] text-sm lg:text-base font-inter font-normal rounded-xl mb-4">
            Medizinisches Fachpersonal
          </span>

          <h2 className="font-serif text-3xl lg:text-[46px] font-semibold text-[#F9FAFB] mb-2">
            Lernen Sie unser Expertenteam kennen
          </h2>

          <p className="text-[#D1D5DB] font-inter text-base lg:text-lg">
            Zugelassene Ärzte, die sich der umfassenden medizinischen Versorgung
            verschrieben haben
            <br />
            Überprüfung und individuelle Verschreibungsentscheidungen
          </p>
        </div>
      </section>
      <section className="bg-[linear-gradient(180deg,#122216_0%,#E9E6DA_100%)] py-10 xl:py-20 2xl:px-8">
        <div className="">
          <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-50">
            {/* Doctor cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="rounded-2xl overflow-hidden min-h-65"
                >
                  {expandedId === doctor.id ? (
                    <div className="bg-[linear-gradient(270deg,rgba(18,35,24,0.20)_0%,rgba(18,35,24,0.00)_100%)] min-h-140.5 p-6 flex flex-col gap-4 rounded-3xl backdrop-blur-[75px]">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[#29574E] text-2xl font-semibold">
                            {doctor.name}
                          </p>
                          <p className="text-[#496962] text-sm">
                            {doctor.title}
                          </p>
                        </div>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="text-white/60 hover:text-white text-lg leading-none cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-black text-sm leading-relaxed">
                        {doctor.bio}
                      </p>
                    </div>
                  ) : (
                    <div className="relative h-100 md:h-140.5 bg-[linear-gradient(181deg,#FFFCF2_1.2%,#FFF_98.82%)]">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-93.75 h-100 md:h-140.5 mx-auto object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-8 flex items-end justify-between">
                        <div>
                          <p className="text-[#29574E] font-medium font-inter text-2xl">
                            {doctor.name}
                          </p>
                          <p className="text-white/70 text-xs">
                            {doctor.title}
                          </p>
                        </div>
                        <button
                          onClick={() => setExpandedId(doctor.id)}
                          className="w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-lg font-light cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {quotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-[linear-gradient(277deg,#FFF_75.05%,#0B4F4A_146.03%)] rounded-2xl p-6 flex flex-col gap-4"
                >
                  <p className="text-[#6B7280] text-sm leading-relaxed italic">
                    {q.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={q.avatar}
                      alt={q.author}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[#29574E] text-xl font-semibold">
                        {q.author}
                      </p>
                      <p className="text-[#29574E] text-xs">{q.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
