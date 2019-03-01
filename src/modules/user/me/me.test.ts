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

const meQuery = `
    {
    me {
        id
        firstname
        lastname
        email
        name
        }
    }                                                               
`;

describe('Me', () => {
    it("Get User", async () => {

        const user = await User.create({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save()

        

        const response = await gCall({
            source: meQuery,
            userId: user.id
        })  

        expect(response).toMatchObject({
            data: {
                me: {
                    id: `${user.id}`,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    name: `${user.firstname} ${user.lastname}`
                }
            }
        })
    })

    it("Returns null", async () => {

        const response = await gCall({
            source: meQuery,
        })  

        expect(response).toMatchObject({
            data: {
                me: null
            }
        })
    })
})