import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.User);
  return (
    <div className="max-w-screen-xl mx-auto mt-10">
      <p className="text-2xl">Welcome back {user.name}</p>
      <p className="mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        obcaecati facere vero iusto inventore ullam, aut ea corrupti praesentium
        quaerat? Illum quam explicabo, officiis quisquam praesentium ipsum
        omnis, nesciunt maxime error molestiae laborum maiores harum et ducimus
        iure quas quod quia blanditiis. Quo nostrum, veritatis error natus
        eligendi distinctio saepe!
      </p>
      <div className="text-blue-700 flex flex-col mt-5">
        <Link to={"/form"}>Forms</Link>
        <Link to={"/about-us"}>About Us</Link>
      </div>
    </div>
  );
};

export default Home;
