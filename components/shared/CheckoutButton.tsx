"use client";
import { Button } from "@/components/ui/button";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className="flex  items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button size={"lg"} asChild className="button rounded-full">
              <Link href={"/sign-in"}>Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
