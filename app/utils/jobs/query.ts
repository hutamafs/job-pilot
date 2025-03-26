export const unsaveJob = async (id: string) => {
  try {
    const res = await fetch(`/api/jobs/${id}/save-job`, {
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

export const saveJob = async (id: string) => {
  try {
    const res = await fetch(`/api/jobs/${id}/save-job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
