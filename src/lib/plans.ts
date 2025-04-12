import { gql, useMutation } from "@apollo/client";
import { useAuthQuery } from "@nhost/react-apollo";
import {
  CreatePlanMutation,
  CreatePlanMutationVariables,
  GetPlansQuery,
  GetPlansQueryVariables,
} from "~/lib/schema";

const CREATE_PLAN = gql`
  mutation CreatePlan($name: String!, $description: String) {
    insert_plans_one(object: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;

const GET_PLANS = gql`
  query GetPlans {
    plans {
      id
      name
      description
    }
  }
`;

export type PlanTemplate = {
  id: string;
  name: string;
  description: string | null;
};

export function usePlansQuery() {
  return useAuthQuery<GetPlansQuery, GetPlansQueryVariables>(GET_PLANS);
}

export function useCreatePlanMutation() {
  return useMutation<CreatePlanMutation, CreatePlanMutationVariables>(
    CREATE_PLAN,
  );
}
