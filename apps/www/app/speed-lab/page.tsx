import { DemoCard } from "@/components/speed-lab/demo-card";
import { MeasurementStrip } from "@/components/speed-lab/measurement-strip";
import {
  BaselineButton,
  Sub100Button,
} from "@/components/speed-lab/optimistic-button-demo";
import {
  BaselineCommandMenu,
  Sub100CommandMenu,
} from "@/components/speed-lab/command-menu-demo";
import {
  BaselineToastDemo,
  Sub100ToastDemo,
} from "@/components/speed-lab/toast-failure-demo";

export const metadata = {
  title: "Speed Lab — sub100",
  description:
    "Side-by-side demos measuring the difference perceived speed makes.",
};

export default function SpeedLabPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Speed Lab
          </h1>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400 max-w-2xl text-pretty">
            Watch the difference perceived speed makes. Tap each side-by-side.
            The thesis isn't a feeling — it's measured in CI.
          </p>
        </div>

        {/* Demos */}
        <div className="flex flex-col gap-12">
          <DemoCard
            title="Optimistic button"
            description="Async save action. Baseline waits for the server before updating. sub100 flips the label on pointerdown — the server resolves silently."
            caption="Click both. Feel the difference."
            baseline={<BaselineButton />}
            sub100={<Sub100Button />}
          />

          <DemoCard
            title="Command menu filter"
            description="Filtering a list on keystroke. Baseline adds a 50ms debounce — a common 'optimization' that makes it feel slower. sub100 filters synchronously."
            caption="Type 'cal' in both. The left lags one frame; the right is already filtered."
            baseline={<BaselineCommandMenu />}
            sub100={<Sub100CommandMenu />}
          />

          <DemoCard
            title="Failure surface"
            description="A delete action that always fails. Baseline shows a loading state then a hard-rendered error. sub100 closes the dialog optimistically and routes failure through Toast."
            caption="Both fail. One jumps; one rolls back."
            baseline={<BaselineToastDemo />}
            sub100={<Sub100ToastDemo />}
          />
        </div>

        {/* Measurement strip */}
        <MeasurementStrip />
      </div>
    </div>
  );
}
