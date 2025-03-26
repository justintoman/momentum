import { useEffect, useState } from "react";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Momentum" },
    { name: "description", content: "Keep your momentum in the gym" },
  ];
}

const PLAN_CONST = {
  name: "Upper Body 1",
  description: "Jeff Nippard Essentials Program",
  exercises: [
    {
      name: "Bench Press",
      warmUpSets: 3,
      sets: 4,
      reps: 10,
      weight: 95,
      restBetween: 120,
      restAfter: 120,
    },
    {
      name: "Tricep Cable Pulldowns",
      warmUpSets: 1,
      sets: 4,
      reps: 10,
      weight: 25,
      restBetween: 90,
      restAfter: 120,
    },
    {
      name: "Bicep Curls",
      warmUpSets: 1,
      sets: 4,
      reps: 10,
      weight: 20,
      restBetween: 90,
      restAfter: 120,
    },
    {
      name: "Lateral Raises",
      warmUpSets: 1,
      sets: 4,
      reps: 10,
      weight: 10,
      restBetween: 90,
      restAfter: 120,
    },
  ],
} satisfies Plan;

type Plan = {
  name: string;
  description: string;
  exercises: Exercise[];
};

type Exercise = {
  name: string;
  warmUpSets: number;
  sets: number;
  reps: number;
  weight: number;
  restBetween: number;
  restAfter: number;
};

export default function Home() {
  const [plan, setPlan] = useState(PLAN_CONST);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [resting, setResting] = useState(false);
  const [isPicking, setIsPicking] = useState(true);

  useEffect(() => {
    if (!resting) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 16);
    return () => clearInterval(interval);
  }, [setIndex, exerciseIndex, resting]);

  if (timer >= plan.exercises[exerciseIndex].restBetween) {
    setResting(false);
    setTimer(0);
    if (setIndex === plan.exercises[exerciseIndex].sets - 1) {
      setExerciseIndex((i) => i + 1);
      setSetIndex(0);
      setIsPicking(true);
    } else {
      setSetIndex((i) => i + 1);
    }
  }

  return (
    <main>
      <header className="my-4 p-4">
        <h1 className="text-lg">{plan.name}</h1>
        <p className="text-sm">{plan.description}</p>
      </header>
      <ul className="space-y-2 mx-2">
        {plan.exercises.map((exercise, exIdx) => (
          <li
            key={exercise.name}
            className="bg-cyan-900/50 p-4 transition-all rounded-sm"
          >
            {isPicking && exIdx === exerciseIndex ? (
              <div>
                <div>Pick your next Exercise</div>
                <ul className="space-y-2 my-2">
                  {plan.exercises.map((ex, i) =>
                    exerciseIndex > i ? null : (
                      <li
                        key={i}
                        className="cursor-pointer p-2 bg-cyan-700 hover:bg-cyan-900/50 rounded-md"
                        onClick={() => {
                          setIsPicking(false);
                          setPlan({
                            ...plan,
                            exercises: [
                              ...plan.exercises.slice(0, exerciseIndex),
                              plan.exercises[i],
                              ...plan.exercises.filter(
                                (_, k) => k !== i && k >= exerciseIndex
                              ),
                            ],
                          });
                        }}
                      >
                        {ex.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <h2>{exercise.name}</h2>
                  <span>
                    {exerciseIndex === exIdx
                      ? setIndex + 1
                      : exerciseIndex > exIdx
                      ? exercise.sets
                      : 0}{" "}
                    / {exercise.sets}{" "}
                    {exerciseIndex < exIdx
                      ? "⚫️"
                      : exerciseIndex === exIdx
                      ? "🟡"
                      : "✅"}
                  </span>
                </div>

                {exerciseIndex === exIdx ? (
                  <div className="space-y-2 my-4">
                    {Array(exercise.sets)
                      .fill(0)
                      .map((_, setIdx) => (
                        <div key={setIdx} className="px-4">
                          <div className="flex justify-between">
                            <span>{exercise.weight}lbs</span>
                            <span>
                              {setIndex === setIdx ? (
                                <>
                                  Set {setIdx + 1} of {exercise.sets}
                                </>
                              ) : setIndex < setIdx ? (
                                "⚫️"
                              ) : (
                                "✅"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-center">
                            {setIndex === setIdx ? (
                              resting ? (
                                <span className="text-sm">
                                  Rest for{" "}
                                  <span className="text-cyan-400 text-2xl">
                                    {exercise.restBetween - timer}
                                  </span>{" "}
                                  seconds
                                </span>
                              ) : (
                                <button
                                  className="rounded-md bg-white text-black p-4 my-4"
                                  onClick={() => setResting(true)}
                                >
                                  Finished with this set
                                </button>
                              )
                            ) : null}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : null}
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
