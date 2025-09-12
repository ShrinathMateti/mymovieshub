import { BiCameraMovie } from "react-icons/bi";

const MovieListHeading = ({ heading }) => {
  return (
    <div className="w-full">
      <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-wide text-white">
        <BiCameraMovie className="text-yellow-400 text-3xl md:text-4xl" />
        {heading}
      </h1>
    </div>
  );
};

export default MovieListHeading;
