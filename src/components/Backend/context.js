import React from "react";

const BackendContext = React.createContext(null);

export const withBackend = Component => props => (
  <BackendContext.Consumer>
    {backend => <Component {...props} backend={backend} />}
  </BackendContext.Consumer>
);
export default BackendContext;
