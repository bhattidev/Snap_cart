import mongoose from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: String;
}
const Nav = ({ user }: { user: IUser }) => {
  return <div></div>;
};

export default Nav;
