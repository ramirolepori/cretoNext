import { getServerSession } from "next-auth";
import Form from "./form";

export default async function DashboardPage() {
    const session = await getServerSession();
    return <Form session={session}/>;
}