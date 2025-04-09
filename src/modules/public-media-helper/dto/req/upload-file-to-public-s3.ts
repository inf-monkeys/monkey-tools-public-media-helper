export type UploadFileToDto = {
  contentType?: string;
  fileUrlRegex?: string;
  fileUrlReplace?: string;
}

export type UploadFileToPublicS3Dto = UploadFileToDto & {
  fileUrl: string;
}

export type UploadFilesToPublicS3Dto = UploadFileToDto & {
  fileUrls: string[];
}
