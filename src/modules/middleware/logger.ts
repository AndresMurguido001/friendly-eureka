import { MiddlewareFn } from "type-graphql";

export const logger: MiddlewareFn = async ({ args }, next) => {
  console.log("ARGS: ", args)
  return next();
};