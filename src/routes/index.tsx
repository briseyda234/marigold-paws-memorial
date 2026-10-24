import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import mimi from "@/assets/mimi.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar digital para Mimi 🐾 | Día de Muertos" },
      { name: "description", content: "Un altar de Día de Muertos con cempasúchil, papel picado y veladoras en memoria de Mimi, nuestra perrita." },
      { property: "og:title", content: "Altar digital para Mimi 🐾" },
      { property: "og:description", content: "Cempasúchil, papel picado y veladoras para recordar a Mimi." },
    ],
  }),
  component: Index,
});

const PICADO_COLORS = ["bg-rosa", "bg-marigold", "bg-violet", "bg-accent", "bg-marigold-deep", "bg-secondary"];

function Marigold({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      {[0, 1, 2].map((ring) =>
        Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={`${ring}-${i}`}
            cx="20"
            cy={20 - (14 - ring * 4)}
            rx={5 - ring}
            ry={8 - ring * 2}
            transform={`rotate(${i * 30 + ring * 15} 20 20)`}
            className={ring === 0 ? "fill-marigold-deep" : ring === 1 ? "fill-marigold" : "fill-flame"}
          />
        )),
      )}
      <circle cx="20" cy="20" r="3" className="fill-marigold-deep" />
    </svg>
  );
}

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        left: (i * 37) % 100,
        delay: (i * 0.73) % 12,
        dur: 9 + ((i * 1.3) % 8),
        size: 10 + ((i * 7) % 14),
        drift: ((i % 5) - 2) * 50,
      })),
    [],
  );
  return (
    <>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal block rounded-[50%_0_50%_0] bg-marigold"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </>
  );
}

function PapelPicado() {
  return (
    <div className="relative z-30 flex w-full justify-center overflow-hidden">
      <div className="absolute top-3 h-0.5 w-full bg-foreground/60" />
      <div className="flex gap-1 pt-3">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className={`picado hover-grow relative h-20 w-16 sm:h-24 sm:w-20 ${PICADO_COLORS[i % PICADO_COLORS.length]}`}
            style={{
              animationDelay: `${i * 0.2}s`,
              clipPath: "polygon(0 0,100% 0,100% 85%,90% 100%,80% 85%,70% 100%,60% 85%,50% 100%,40% 85%,30% 100%,20% 85%,10% 100%,0 85%)",
            }}
          >
            <svg viewBox="0 0 40 50" className="h-full w-full fill-background/80">
              <circle cx="20" cy="18" r="6" />
              <circle cx="8" cy="8" r="2.5" /><circle cx="32" cy="8" r="2.5" />
              <path d="M10 32 l5 -4 l5 4 l5 -4 l5 4 v3 h-20z" />
              <circle cx="12" cy="17" r="1.5" /><circle cx="28" cy="17" r="1.5" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function Veladora({ delay = 0 }: { delay?: number }) {
  return (
    <div className="hover-grow flex flex-col items-center">
      <div className="flame glow-flame mb-1 h-8 w-4 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-flame" style={{ animationDelay: `${delay}s` }} />
      <div className="h-2 w-0.5 bg-foreground/70" />
      <div className="relative flex h-24 w-16 items-center justify-center overflow-hidden rounded-b-lg rounded-t-sm border-2 border-marigold bg-gradient-to-b from-rosa to-violet">
        <img src={mimi.url} alt="Mimi en veladora" className="h-12 w-12 rounded-full border-2 border-flame object-cover" />
      </div>
    </div>
  );
}

function PawTrail() {
  const steps = Array.from({ length: 10 });
  return (
    <div className="pointer-events-none relative mx-auto h-40 w-full max-w-3xl">
      {steps.map((_, i) => (
        <span
          key={i}
          className="paw-step absolute text-3xl"
          style={{
            left: `${5 + i * 9}%`,
            top: `${i % 2 ? 20 : 55}%`,
            animationDelay: `${i * 0.4}s`,
            ["--r" as string]: "80deg",
          }}
        >
          🐾
        </span>
      ))}
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <Petals />
      <h1 className="font-display text-5xl text-marigold sm:text-7xl">Para Mimi</h1>
      <p className="max-w-md text-lg text-muted-foreground">Toca su naricita para encender el altar</p>
      <button
        onClick={onStart}
        aria-label="Apretar la nariz de Mimi para entrar"
        className="nose-pulse group relative flex h-44 w-56 items-center justify-center"
      >
        <svg viewBox="0 0 120 90" className="h-full w-full drop-shadow-[0_0_30px_var(--marigold)] transition-transform group-hover:scale-110 group-active:scale-90">
          <path d="M60 10 C20 10 5 30 12 55 C18 78 40 85 60 70 C80 85 102 78 108 55 C115 30 100 10 60 10Z" className="fill-foreground" style={{ fill: "oklch(0.18 0.02 300)" }} />
          <ellipse cx="40" cy="45" rx="10" ry="13" className="fill-background" />
          <ellipse cx="80" cy="45" rx="10" ry="13" className="fill-background" />
          <ellipse cx="45" cy="25" rx="14" ry="5" className="fill-muted-foreground/40" />
        </svg>
      </button>
      <span className="text-sm uppercase tracking-[0.3em] text-marigold/80">boop 🐶</span>
    </div>
  );
}

function Index() {
  const [started, setStarted] = useState(false);

  if (!started) return <Intro onStart={() => setStarted(true)} />;

  const toys = [
    { e: "🦴", t: "Su huesito" },
    { e: "🎾", t: "Su pelota" },
    { e: "🧸", t: "Su peluche" },
    { e: "🥣", t: "Su platito" },
    { e: "🪢", t: "Su cuerdita" },
  ];

  return (
    <main className="relative min-h-screen pb-24">
      <Petals />
      <PapelPicado />

      <header className="rise mt-10 px-6 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-marigold">Día de Muertos</p>
        <h1 className="hover-grow mx-auto mt-2 w-fit font-display text-6xl text-foreground sm:text-8xl">
          Mimi <span className="text-marigold">🐾</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Que el camino de cempasúchil te traiga de vuelta a casa, aunque sea por una noche.
        </p>
      </header>

      {/* Arco + altar */}
      <section className="rise relative mx-auto mt-14 max-w-4xl px-4" style={{ animationDelay: ".3s" }}>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl">
          {/* arco */}
          {Array.from({ length: 23 }).map((_, i) => {
            const a = Math.PI - (i / 22) * Math.PI;
            const x = 50 + Math.cos(a) * 46;
            const y = 62 - Math.sin(a) * 58;
            return (
              <div key={i} className="hover-grow absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                <Marigold size={i % 2 ? 44 : 54} />
              </div>
            );
          })}
          {/* foto */}
          <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
            <div className="hover-grow rounded-2xl border-8 border-marigold bg-rosa p-2 shadow-[var(--glow-marigold)]">
              <img src={mimi.url} alt="Mimi, nuestra perrita" className="h-48 w-48 rounded-lg object-cover sm:h-64 sm:w-64" />
            </div>
            <p className="mt-3 text-center font-display text-2xl text-marigold">Siempre en nuestro corazón</p>
          </div>
        </div>

        {/* escalones del altar */}
        <div className="mx-auto -mt-4 flex flex-col items-center">
          <div className="flex w-full max-w-lg items-end justify-around rounded-t-xl border-t-4 border-marigold bg-violet px-4 py-4">
            <Veladora delay={0} />
            <Veladora delay={0.4} />
            <Veladora delay={0.8} />
          </div>
          <div className="flex w-full max-w-2xl flex-wrap items-end justify-around gap-3 border-t-4 border-rosa bg-secondary px-4 py-5">
            {toys.map((toy) => (
              <div key={toy.t} className="hover-grow group flex flex-col items-center">
                <span className="text-5xl">{toy.e}</span>
                <span className="mt-1 text-xs font-bold text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">{toy.t}</span>
              </div>
            ))}
          </div>
          <div className="flex w-full max-w-3xl items-center justify-around border-t-4 border-marigold bg-muted px-4 py-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="hover-grow"><Marigold size={36} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* huellitas llegando */}
      <section className="mt-12 text-center">
        <p className="font-display text-3xl text-marigold">Sus huellitas vuelven al altar</p>
        <PawTrail />
      </section>

      <footer className="px-6 text-center text-muted-foreground">
        <p className="mx-auto max-w-lg">
          Gracias, Mimi, por cada mover de colita, cada siesta compartida y cada boop. 🧡💜
        </p>
      </footer>
    </main>
  );
}
