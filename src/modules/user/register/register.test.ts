import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gcall";
import faker from 'faker'
import { User } from "../../../entity/User";

let conn: Connection
beforeAll(async () => {
    conn = await testConn();
})

afterAll(async () => {
    await conn.close()
})

const registerMutation = `
    mutation RegisterMutation($data: RegisterInputs!) {
        register(data:$data) {
            firstname
            lastname
            email
        }
    }                                                               
`;

describe('Register', () => {
    it("create user", async () => {
        const user = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const response = await gCall({
            source: registerMutation,
            variableValues: {
                data: user
            }
        })  
        expect(response).toMatchObject({
            data: {
                register: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
            }
        })

        const dbUser = await User.findOne({ where: { email: user.email }})
        expect(dbUser).toBeDefined()
        expect(dbUser!.firstname).toBe(user.firstname)
        expect(dbUser!.confirmed).toBe(false);
    })
})