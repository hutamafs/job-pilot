export const getAllJobApplications = async () => {
  try {
    const res = await fetch(`/api/companies/applied-candidates`, {
      method: "GET",
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

export const updateApplicationStatus = async (id: string, status: string) => {
  try {
    const res = await fetch(`/api/companies/applied-candidates`, {
      method: "PUT",
      body: JSON.stringify({ id, status }),
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
