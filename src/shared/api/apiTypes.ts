import { AuthResult, ServerErrors } from "../../entities/types.ts";

export type Auth = {
  login: string;
  password: string;
  commandId?: string;
};
export type Answer = Request & AuthResult & ServerErrors;
