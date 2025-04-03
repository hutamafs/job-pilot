const getClientSession = async () => {
  const res = await fetch("/api/me");
  if (res.ok) {
    const { user } = await res.json();
    return { user };
  } else if (res.status === 401) {
    return null;
  }
};

export default getClientSession;
