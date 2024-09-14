import { auth } from "../../../auth";

export async function getId() {
    const session = await auth();
    const id = session?.user.id;
    const role = session?.user.role?.toLocaleLowerCase();
    const email = session?.user.email;
    return { id, role, email };
    
}