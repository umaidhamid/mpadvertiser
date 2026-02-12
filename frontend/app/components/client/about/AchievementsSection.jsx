export default function AchievementsSection({ achievements }) {
  return (
    <section className="py-24 px-6 bg-white/[0.03]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        {achievements.map((item, i) => (
          <div key={i}>
            <div className="text-5xl font-bold text-indigo-400 mb-4">
              {item.number}
            </div>
            <p className="text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
