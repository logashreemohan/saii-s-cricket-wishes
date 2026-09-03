import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import saiiPhoto from "@/assets/saii-park.png.asset.json";

const TITLE = "Happy Birthday Saii 🏏";
const DESC = "A little birthday wish for Saii — cricket, dreams, and a name on the screen someday.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

const PASSWORD = "yuk";
const STORAGE_KEY = "saii-gate-open";

function Index() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setOpen(true);
  }, []);

  const unlock = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(true);
  };

  return open ? <WishPage /> : <Gate onUnlock={unlock} />;
}

/* ---------------- Gate ---------------- */

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(0);
  const [hint, setHint] = useState(0);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      onUnlock();
    } else {
      setWrong((n) => n + 1);
      setValue("");
    }
  };

  return (
    <main className="stripes relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <CricketBall className="absolute -top-10 -left-10 h-48 w-48 opacity-90 animate-spin-slow" />
      <CricketBall className="absolute -right-16 -bottom-16 h-64 w-64 opacity-80 animate-spin-slow" />

      <section className="relative w-full max-w-md animate-pop">
        <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-bat sm:p-10">
          <p className="font-display text-sm tracking-[0.3em] text-muted-foreground">
            THIRD UMPIRE REVIEW
          </p>
          <h1 className="font-display mt-2 text-5xl leading-none text-primary sm:text-6xl">
            Enter the password
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            No password, no entry into the stadium. Bowl the right word to get in.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                type="password"
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="• • •"
                key={wrong}
                className={`w-full rounded-xl border-2 border-primary/30 bg-input px-5 py-4 text-center font-display text-3xl tracking-[0.4em] text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15 ${
                  wrong ? "animate-shake" : ""
                }`}
              />
            </label>
            <button
              type="submit"
              className="font-display w-full rounded-xl bg-primary px-6 py-4 text-2xl tracking-widest text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-bat active:translate-y-0"
            >
              Howzat! →
            </button>
          </form>

          {wrong > 0 && (
            <p className="mt-4 text-center text-sm font-semibold text-ball">
              NOT OUT — wrong password. Try again {wrong > 1 ? `(${wrong} attempts)` : ""}
            </p>
          )}

          <div className="mt-8 border-t border-dashed border-primary/30 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-widest text-foreground">Need a hint?</span>
              {hint < 2 && (
                <button
                  type="button"
                  onClick={() => setHint((h) => h + 1)}
                  className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
                >
                  {hint === 0 ? "Hint 1" : "Hint 2"}
                </button>
              )}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              {hint >= 1 && (
                <li className="animate-rise rounded-lg bg-muted px-4 py-3">
                  <span className="font-semibold">Hint 1:</span> You used it a lot when it rains… 🌧️
                </li>
              )}
              {hint >= 2 && (
                <li className="animate-rise rounded-lg bg-muted px-4 py-3">
                  <span className="font-semibold">Hint 2:</span> …and then, the name of something disgusting. 🤢
                </li>
              )}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-center text-xs font-medium tracking-widest text-foreground/60 uppercase">
          Made for Saii · 🏏🇮🇳
        </p>
      </section>
    </main>
  );
}

/* ---------------- Wish page ---------------- */

const MESSAGE = [
  "I may not have known you for years, and we're definitely not those friends who talk every single day. But I'm genuinely glad that somehow, through the most random connection, we became friends.",
  "You may just be my roommate's brother who became a friend… but somewhere along the way, you ended up having your own little place in my heart.",
  "I hope this birthday brings you a lot of happiness, crazy memories, peaceful moments, and all the success you're working so hard for.",
  "Keep practicing. Keep believing. Keep chasing that dream, even on the days when it feels difficult.",
  "And who knows…",
  "Maybe one day I'll be sitting somewhere watching a cricket match, and suddenly I'll see your name on the screen.",
];

function WishPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero */}
      <section className="stripes relative px-4 pt-16 pb-24 sm:pt-24">
        <CricketBall className="absolute top-8 right-[-3rem] h-40 w-40 animate-spin-slow opacity-90 sm:right-12" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="animate-rise font-display text-lg tracking-[0.35em] text-foreground/70">
            🏏 SCOREBOARD · A NEW YEAR ON THE CREASE 🏏
          </p>
          <h1 className="font-display mt-4 animate-pop text-7xl leading-[0.9] text-primary sm:text-9xl">
            Happy
            <br />
            Birthday
            <br />
            <span className="text-ball">Saii!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-rise text-lg text-foreground/80 [animation-delay:200ms]">
            Pads on, helmet strapped, one more year and the innings only gets better.
          </p>
        </div>
      </section>

      {/* Photo + message */}
      <section className="relative px-4 pb-24">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <figure className="animate-rise lg:sticky lg:top-8 [animation-delay:300ms]">
            <div className="relative">
              <div className="absolute -inset-3 -rotate-2 rounded-2xl bg-primary" />
              <div className="absolute -inset-3 rotate-1 rounded-2xl bg-accent/80" />
              <img
                src={saiiPhoto.url}
                alt="Saii and a friend in a rainy park, feeding treats to two happy dogs"
                className="relative w-full rounded-xl border-4 border-card object-cover shadow-bat"
              />
              <span className="font-display absolute -right-4 -bottom-5 rotate-6 rounded-lg bg-ball px-4 py-2 text-2xl tracking-widest text-ball-foreground shadow-bat">
                PLAYER OF THE DAY
              </span>
            </div>
          </figure>

          <article className="space-y-5">
            <div className="flex items-center gap-3">
              <Stumps />
              <h2 className="font-display text-4xl text-primary sm:text-5xl">A few words for you</h2>
            </div>
            {MESSAGE.map((para, i) => (
              <p
                key={i}
                style={{ animationDelay: `${300 + i * 140}ms` }}
                className={`animate-rise rounded-2xl border-l-4 border-primary bg-card px-6 py-5 text-lg leading-relaxed text-card-foreground shadow-bat ${
                  i === 4 ? "font-display text-3xl tracking-widest text-ball" : ""
                }`}
              >
                “{para}”
              </p>
            ))}
            <p className="animate-rise pt-2 text-center text-5xl [animation-delay:1200ms]">🏏🇮🇳</p>
          </article>
        </div>
      </section>

      {/* Footer pitch */}
      <footer className="relative">
        <div className="pitch-lines bg-pitch px-4 py-14 text-center text-pitch-foreground">
          <p className="font-display text-3xl tracking-[0.25em] sm:text-4xl">
            KEEP PRACTICING · KEEP BELIEVING · KEEP CHASING
          </p>
          <p className="mt-3 text-sm opacity-80">See you on the big screen someday, Saii. Happy birthday. 🎂</p>
        </div>
      </footer>
    </main>
  );
}

/* ---------------- Decorations ---------------- */

function CricketBall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="48" className="fill-ball" />
      <path
        d="M30 6 Q 50 50 30 94 M70 6 Q 50 50 70 94"
        className="stroke-seam"
        strokeWidth="2.5"
        fill="none"
      />
      <g className="stroke-seam" strokeWidth="1.6" strokeLinecap="round">
        {Array.from({ length: 14 }).map((_, i) => {
          const t = 10 + i * 6;
          const x = 30 + Math.sin(((t - 6) / 88) * Math.PI) * 20 * (t < 50 ? 1 : 1);
          return (
            <g key={i}>
              <line x1={x - 4} y1={t - 2} x2={x + 4} y2={t + 2} />
              <line x1={100 - x - 4} y1={t + 2} x2={100 - x + 4} y2={t - 2} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function Stumps() {
  return (
    <svg viewBox="0 0 40 48" className="h-12 w-10 shrink-0" aria-hidden="true">
      <rect x="4" y="8" width="5" height="40" rx="2" className="fill-primary" />
      <rect x="17.5" y="8" width="5" height="40" rx="2" className="fill-primary" />
      <rect x="31" y="8" width="5" height="40" rx="2" className="fill-primary" />
      <rect x="3" y="3" width="16" height="4" rx="2" className="fill-ball" />
      <rect x="21" y="3" width="16" height="4" rx="2" className="fill-ball" />
    </svg>
  );
}
