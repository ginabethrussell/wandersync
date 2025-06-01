import Image from "next/image";
import Link from "next/link";

export default function LogoHeader() {
  return (
    <Link href="/" className="inline-block">
      <Image
        src="/wanderSyncLogo.png"
        alt="WanderSync logo"
        height={50}
        width={200}
        priority
      />
    </Link>
  );
}
