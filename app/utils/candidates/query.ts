export const unsaveCandidate = async (id: string) => {
  try {
    const res = await fetch(`/api/candidates/${id}/save-candidate`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { data, success: true };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};

export const saveCandidate = async (id: string) => {
  try {
    const res = await fetch(`/api/candidates/${id}/save-candidate`, {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { data, success: true };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};
