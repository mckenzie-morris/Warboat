const loginHooks = () => {
  const [createAcctState, setCreateAcctState] = React.useState(false);
  const [validUsernameState, setValidUsernameState] = React.useState(null);
  const [validPasswordState, setValidPasswordState] = React.useState(null);
  const [validConfirmState, setValidConfirmState] = React.useState(null);

  return {
    createAcctState,
    setCreateAcctState,
    validUsernameState,
    setValidUsernameState,
    validPasswordState,
    setValidPasswordState,
    validConfirmState,
    setValidConfirmState,
  };
};

export default loginHooks;
