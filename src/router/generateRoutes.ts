


export const generateRoutes = (routes) => {
  return routes.map((item) => ({
    Component: item.Component,
    path: item.path,
  }));
};
