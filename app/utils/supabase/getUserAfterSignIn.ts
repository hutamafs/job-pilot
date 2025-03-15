"use client";

export const fetchUser = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-in`,
      {
        headers: {
          Authorization: `${id}`,
        },
      }
    );
  const { data } = await response.json();
  return { data: data.user };
};
