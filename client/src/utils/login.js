const loginUtils = () => {
  const validateInput = (input) => {
    /*  ^ → match starts at the beginning
    
        (?!.*[-_]{2}) → negative lookahead prevents consecutive _ or -
    
        [a-zA-Z0-9_-]{3,20} → allows:
          1.) letters (a-z, A-Z)
          2.) numbers (0-9)
          3.) underscore (_) and dash (-) (but no consecutive ones)
          4.) enforces 3 to 20 characters in length
    
        $ → match ends at the last character */
    const usernameRegex = /^(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}$/;

    return usernameRegex.test(input)
  };

  return { validateInput };
};

export default loginUtils;
