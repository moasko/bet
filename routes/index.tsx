function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  betters: path(ROOTS_DASHBOARD, "/betters"),
  events: path(ROOTS_DASHBOARD, "/events"),
  sports: path(ROOTS_DASHBOARD, "/sports"),
  teams: path(ROOTS_DASHBOARD, "/teams"),
  settings: path(ROOTS_DASHBOARD, "/settings"),
  account: path(ROOTS_DASHBOARD, "/account"),
};

export const PATH_AUTH = {
  root: "/auth",
  login: path("/auth", "/login"),
  register: path("/auth", "/register"),
  verify: path("/auth", "/verify"),
  forgotPassword: path("/auth", "/forgot-password"),
  resetPassword: path("/auth", "/reset-password"),
};

export const PATH_APP = {
  root: "/app",
  bet: path("/app", "/bet"),
  user: path("/app", "/user"),
  payment: path("/app", "/payment"),
};