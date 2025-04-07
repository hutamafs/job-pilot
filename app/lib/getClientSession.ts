const getClientSession = async () => {
  const res = await fetch("/api/me");
  if (res.ok) {
    const { data } = await res.json();
    return { user: data.user };
  } else if (res.status === 401) {
    return null;
  }
};

export default getClientSession;
