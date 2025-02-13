import React from "react";

const loginHooks = () => {
  const [createAcctState, setCreateAcctState] = React.useState(false);
  const [validUsernameState, setValidUsernameState] = React.useState(false);
  const [validPasswordState, setValidPasswordState] = React.useState(false);
  const [validConfirmState, setValidConfirmState] = React.useState(false);
  const [usernameInitState, setUsernameState] = React.useState(true);
  const [passwordInitState, setPasswordState] = React.useState(true);
  const [confirmInitState, setConfirmState] = React.useState(true);

  return {
    createAcctState,
    setCreateAcctState,
    validUsernameState,
    setValidUsernameState,
    validPasswordState,
    setValidPasswordState,
    usernameInitState,
    setUsernameState,
    passwordInitState,
    setPasswordState,
    validConfirmState,
    setValidConfirmState,
    confirmInitState,
    setConfirmState,
  };
};

export default loginHooks;
