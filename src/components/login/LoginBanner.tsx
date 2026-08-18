import hero from "../../assets/imges/app icons coming out .png";

export default function LoginBanner() {
  return (
    <div className="relative flex h-full min-h-120 overflow-hidden rounded-3xl">
      {/* Background Image */}
      <img
        src={hero}
        alt="People staying connected"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/70 via-black/35 to-violet-500/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
        <span className="mb-4 w-fit rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur animate-[float_4s_ease-in-out_infinite]">
          Welcome back
        </span>

        <h2 className="max-w-md text-3xl font-bold leading-tight md:text-4xl">
          Stay connected. <br />
          Keep sharing moments.
        </h2>

        <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
          Log in to reconnect with your people and see what’s happening in your
          community.
        </p>
      </div>
    </div>
  );
}
