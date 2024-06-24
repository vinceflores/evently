import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/assets/images/hero.png";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  // console.log(events);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold ">
              Host, Connect, Celebrate: Your Evnts, Our Platform!
            </h1>
            <p className="font-light text-md">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button asChild size={"lg"} className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src={HeroImage}
            alt="hero"
            width={1000}
            height={1000}
            className="object-contain object-center max-h-[70vh] 2xl:max-h-[50vh] "
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold ">
          Trusted By <br /> Thousands of Events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search CategoryFilter
        </div>
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectiontype="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
