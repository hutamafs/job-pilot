export const getAllJobApplications = async () => {
  try {
    const res = await fetch(`/api/companies/applied-candidates`, {
      method: "GET",
    });
    const { data, success, message } = await res.json();
    if (!success) throw new Error(message);
    return { data };
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
    const { message, success } = await res.json();
    if (!success) throw new Error(message);
    return { success };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};
