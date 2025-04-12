import { zodResolver } from "@hookform/resolvers/zod";
import { SignedIn, SignedOut, useSignInEmailPasswordless } from "@nhost/react";
import { useForm } from "react-hook-form";
import { Form } from "react-router";
import { z } from "zod";
import { usePlansQuery } from "~/lib/plans";

const schema = z.object({
  email: z.string().email(),
});

export function HomePage() {
  const methods = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });
  const { signInEmailPasswordless } = useSignInEmailPasswordless();

  const { data } = usePlansQuery();
  const plans = data?.plans;

  function onSubmit({ email }: z.infer<typeof schema>) {
    signInEmailPasswordless(email);
  }

  return (
    <main>
      <SignedOut>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...methods.register("email")}
          />
          <button type="submit">Send magic link</button>
        </Form>
      </SignedOut>

      <SignedIn>
        <ul className="mx-2 space-y-2">
          {plans?.length ? (
            plans.map((plan) => (
              <li>
                <a href={`/plan/${plan.id}`}>{plan.name}</a>
              </li>
            ))
          ) : (
            <li>No plans yet.</li>
          )}
        </ul>
      </SignedIn>
    </main>
  );
}
