import { buildSchema } from "type-graphql";

export const createSchema = () => 
    buildSchema({
        resolvers: [
            __dirname + "/../modules/**/*.resolver.ts"
        ],
        authChecker: ({ context: { req }}) => {
            if (req.session.userId){
                return true;
            }
            return false;
        }
    })