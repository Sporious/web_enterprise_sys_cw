import { useRouter } from "next/router";
import { isBrowser } from "./_app";

const Logout = () => {
  if (!isBrowser()) return null;
  const router = useRouter();

  localStorage.clear();
  setTimeout(() => router.replace("/"), 2000);
  return (
    <a className="m-8 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
      Logging out
    </a>
  );
};

export default Logout;
