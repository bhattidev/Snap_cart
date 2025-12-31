import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { unwatchFile } from "fs";
import { redirect } from "next/navigation";
import EditeRoleMobile from "./components/EditeRoleMobile";
import Nav from "./components/Nav";

const Home = async () => {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }
  const inComplete =
    !user.mobile || !user.role || (!user.mobile && user.role == "user");
  if (inComplete) {
    return <EditeRoleMobile />;
  }

  return (
    <>
      <Nav user={user} />
    </>
  );
};

export default Home;
