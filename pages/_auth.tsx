import { createGetServerSideAuth, createUseAuth } from "aws-cognito-next";
import pems from "../pems.json";

const config = {
  pems,
};

export const getServerSideAuth = createGetServerSideAuth(config);
export const useAuth = createUseAuth(config);
export * from "aws-cognito-next";
