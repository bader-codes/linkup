import hero from "@/assets/images/coming out.png";

export default function RegisterBanner() {
  return (
    <div className="relative flex h-full min-h-145 overflow-hidden rounded-3xl">
      {/* Background Image */}
      <img
        src={hero}
        alt="People connecting"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/60 via-black/30 to-pink-500/50 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
        <span className="mb-4 w-fit rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur animate-[float_4s_ease-in-out_infinite]">
          Join the community
        </span>

        <h2 className="max-w-md md:text-3xl lg:text-4xl font-bold leading-tight">
          Meet people. <br /> Share moments. <br /> Build connections.
        </h2>
      </div>
    </div>
  );
}
