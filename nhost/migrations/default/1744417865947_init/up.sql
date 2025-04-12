SET check_function_bodies = false;
CREATE TABLE public.exercise_records (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    template_name text NOT NULL,
    template_description text,
    date timestamp with time zone DEFAULT now() NOT NULL,
    workout_record_id uuid NOT NULL
);
CREATE TABLE public.exercise_templates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    workout_template_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    type text NOT NULL
);
CREATE TABLE public.plans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    user_id uuid NOT NULL
);
CREATE TABLE public.set_records (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    exercise_name text NOT NULL,
    date timestamp with time zone NOT NULL,
    weight numeric,
    reps smallint,
    exercise_record_id uuid NOT NULL,
    duration_sec smallint
);
CREATE TABLE public.set_templates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    notes text,
    exercise_id uuid NOT NULL,
    type text NOT NULL,
    duration_sec smallint,
    weight numeric,
    meta text,
    reps_min smallint,
    reps_max smallint,
    "order" smallint NOT NULL
);
CREATE TABLE public.workout_records (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    date timestamp with time zone NOT NULL,
    template_name text NOT NULL,
    template_description text,
    plan_name text NOT NULL,
    plan_description text
);
CREATE TABLE public.workout_templates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    plan_id uuid NOT NULL
);
ALTER TABLE ONLY public.exercise_records
    ADD CONSTRAINT exercise_records_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.exercise_templates
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.set_records
    ADD CONSTRAINT set_records_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.set_templates
    ADD CONSTRAINT set_template_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.workout_records
    ADD CONSTRAINT workout_records_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.workout_templates
    ADD CONSTRAINT workouts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.exercise_records
    ADD CONSTRAINT exercise_records_workout_record_id_fkey FOREIGN KEY (workout_record_id) REFERENCES public.workout_records(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.exercise_templates
    ADD CONSTRAINT exercises_workout_template_id_fkey FOREIGN KEY (workout_template_id) REFERENCES public.workout_templates(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.set_records
    ADD CONSTRAINT set_records_exercise_record_id_fkey FOREIGN KEY (exercise_record_id) REFERENCES public.exercise_records(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.set_templates
    ADD CONSTRAINT set_template_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise_templates(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.workout_templates
    ADD CONSTRAINT workouts_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id) ON UPDATE RESTRICT ON DELETE CASCADE;
