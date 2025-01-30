const loginHooks = () => {
  const [createAcctState, setCreateAcctState] = React.useState(false);
  return {createAcctState, setCreateAcctState}
};

export default loginHooks