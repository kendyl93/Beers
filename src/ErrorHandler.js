export const statusHandler = res => {
  let error;
  if (res.status >= 500) {
    error = new Error();
    error.message = 'Server error';
    error.status = res.status;
  }
  if (res.status >= 400) {
    error = new Error();
    error.message = 'Wrong query';
    error.status = res.status;
  }

  return error;
};

export const itemErrorChecker = element => {
  if (element instanceof Error || element === undefined) {
    console.log(element);
    if (element instanceof Error && element.statusCode === 429)
      alert('you have reached query limits. Try later in an hour');
    this.setState({
      isError: true,
      isLoadingContent: false
    });

    return true;
  }
};
