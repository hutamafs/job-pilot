const uploadFile = async (file: File, folder: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/upload`, {
      method: "POST",
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        folder,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { url } = await res.json();

    const uploadRes = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (uploadRes.ok) {
      return {
        status: true,
        url: url.split("?")[0],
      };
    } else {
      throw new Error("File upload failed.");
    }
  } catch (error) {
    console.error(error, "File upload failed.");
  }
};

export default uploadFile;
