import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  console.log("Upload API hit:", req.method);
  console.log("Request Origin:", req.headers.get("origin"));
  try {
    const { fileName, fileType, folder } = await req.json();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `${folder}/${Date.now()}-${fileName}`,
      ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return Response.json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response("Error generating signed URL", { status: 500 });
  }
}
