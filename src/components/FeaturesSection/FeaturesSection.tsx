const features = [
  {
    id: 1,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
    title: "Wissenschaftlich fundiert",
    description:
      "Unsere Abnehmprogramme werden durch klinische Studien gestützt und haben bereits Tausenden von Menschen geholfen, erfolgreich abzunehmen – ohne extreme Einschränkungen.",
  },
  {
    id: 2,
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80",
    title: "Von Experten begleitet",
    description:
      "Vertrauen Sie der Expertise von Ärzten und Abnehm-Experten, die Ihr Abnehmziel und Ihre Gesundheit in den Mittelpunkt stellen.",
  },
  {
    id: 3,
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&q=80",
    title: "Wissenschaftlich fundiert",
    description:
      "Unsere Abnehmprogramme werden durch klinische Studien gestützt und haben bereits Tausenden von Menschen geholfen, erfolgreich abzunehmen – ohne extreme Einschränkungen.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-10 lg:py-20">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-50">
        <h2 className="font-serif text-center text-3xl lg:text-[46px] font-semibold text-[#227C31] mb-5 sm:mb-10">
          Jetzt abnehmen und die Gesundheit ein Leben lang schützen.
        </h2>
        <div className="flex flex-col lg:mt-15">
          {features.map((feature, index) => (
            <div key={feature.id}>
              {index === 0 && <div className="border-t border-[#00000029]" />}
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 2xl:gap-6 py-8">
                <div className="flex items-center gap-4 2xl:w-247 shrink-0">
                  <div className="xl:w-26 w-12 xl:h-16 h-12 rounded-full overflow-hidden shrink-0">
                    <img
                      src={feature.avatar}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl 2xl:text-[32px] font-medium font-inter text-[#227C31] w-100 xl:w-125 2xl:w-247">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base xl:text-lg text-[#4B5563] leading-relaxed font-inter">
                  {feature.description}
                </p>
              </div>
              <div className="border-t border-[#00000029]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
