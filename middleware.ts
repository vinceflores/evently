import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// will return true if the user is trying to access a route that matches one of the routes
const isProtectedRoute = createRouteMatcher([]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
