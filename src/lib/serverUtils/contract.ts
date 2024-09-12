import AWS from 'aws-sdk'

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})


export async function getFileFromBucket({
  bucketName,
  fileName,
}: {
  bucketName: string
  fileName: string
}) {
  try {
    // Check if the object exists in the bucket
    s3Client.headObject({ Bucket: bucketName, Key: fileName }).promise()
  } catch (error) {
    console.error('Error in statObject:', error)
    return null
  }

  try {
    // Retrieve the object from the bucket
    const fileStream = s3Client.getObject({ Bucket: bucketName, Key: fileName }).createReadStream()
    return fileStream;
  } catch (error) {
    console.error('Error in getObject:', error)
    return null
  }
}
