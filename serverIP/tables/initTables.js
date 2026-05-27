import {createUsersTable} from "./createUserTables.js"
import { createWorkTable } from "./createWorksTable.js"
import { createVocation } from "./createVocationTable.js"

export async function initTables() {
    await createUsersTable()
    await createWorkTable()
    await createVocation()
    console.log("All tables created!")
}

initTables()