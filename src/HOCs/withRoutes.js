import { useRoutes } from "react-router-dom";

export const withRoutes = (Component, routesArr) => {
  const Wrapper = (props) => {
    const routes = useRoutes(routesArr);
    return <Component routes={routes} {...props} />;
  };

  return Wrapper;
};
