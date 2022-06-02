import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withReactRouterDom = (Component) => {
  const Wrapper = (props) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    return (
      <Component reactRouterDom={{ location, params, navigate }} {...props} />
    );
  };
  return Wrapper;
};
