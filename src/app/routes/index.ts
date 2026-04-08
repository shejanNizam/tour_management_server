import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.router";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  //   {
  //     path: "/tours",
  //     route: TourRoutes,
  //   },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
