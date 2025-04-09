import {
  MonkeyToolCategories,
  MonkeyToolDescription,
  MonkeyToolDisplayName,
  MonkeyToolIcon,
  MonkeyToolInput,
  MonkeyToolName,
  MonkeyToolOutput,
} from '@/common/decorators/monkey-block-api-extensions.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { IRequest } from '@/common/typings/request';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UploadFilesToPublicS3Dto, UploadFileToPublicS3Dto } from './dto/req/upload-file-to-public-s3';
import { CONTENT_TYPE_PROPERTY, FILE_URL_REGEX_PROPERTY, FILE_URL_REPLACE_PROPERTY } from './public-media-helper.consts';
import { PublicMediaHelperService } from './public-media-helper.service';

@Controller('public-media-helper')
@UseGuards(new AuthGuard())
export class PublicMediaHelperController {
  constructor(private readonly service: PublicMediaHelperService) { }

  @Post('/upload-file-to-public-s3')
  @ApiOperation({
    summary: 'Upload File To Public S3',
    description: 'Upload an file to the public S3.',
  })
  @MonkeyToolName('upload_file_to_public_s3')
  @MonkeyToolCategories(['extra'])
  @MonkeyToolIcon('emoji:🗃️:#d9caf8')
  @MonkeyToolDisplayName({
    'zh-CN': '上传单个文件到公共 S3',
    'en-US': 'Upload Single File To Public S3',
  })
  @MonkeyToolDescription({
    'zh-CN': '传递文件的 Url，下载并上传文件到公共 S3',
    'en-US': 'Pass the file Url, download and upload the file to the public S3',
  })
  @MonkeyToolInput([
    {
      name: 'fileUrl',
      displayName: {
        'zh-CN': '文件 Url',
        'en-US': 'File Url',
      },
      required: true,
      type: 'file',
    },
    CONTENT_TYPE_PROPERTY,
    FILE_URL_REGEX_PROPERTY,
    FILE_URL_REPLACE_PROPERTY,
  ])
  @MonkeyToolOutput([
    {
      name: 'url',
      displayName: {
        'zh-CN': '结果 Url',
        'en-US': 'Result Url',
      },
      required: true,
      type: 'string',
      description: {
        'zh-CN': '上传后的 Url',
        'en-US': 'The Url after upload',
      },
    },
  ])
  public async uploadFileToPublicS3(
    @Req() req: IRequest,
    @Body() body: UploadFileToPublicS3Dto,
  ) {
    const { fileUrl, contentType, fileUrlRegex, fileUrlReplace } = body;
    return {
      url: await this.service.uploadFileToPublicS3(
        fileUrl,
        contentType,
        fileUrlRegex,
        fileUrlReplace,
      ),
    };
  }

  @Post('/upload-files-to-public-s3')
  @ApiOperation({
    summary: 'Upload Files To Public S3',
    description: 'Upload an files to the public S3.',
  })
  @MonkeyToolName('upload_files_to_public_s3')
  @MonkeyToolCategories(['extra'])
  @MonkeyToolIcon('emoji:🗃️:#d9caf8')
  @MonkeyToolDisplayName({
    'zh-CN': '上传多个文件到公共 S3',
    'en-US': 'Upload Multiple Files To Public S3',
  })
  @MonkeyToolDescription({
    'zh-CN': '传递文件的 Url 列表，下载并上传文件到公共 S3',
    'en-US': 'Pass the file Url list, download and upload the files to the public S3',
  })
  @MonkeyToolInput([
    {
      name: 'fileUrls',
      displayName: {
        'zh-CN': '文件 Url 列表',
        'en-US': 'File Url List',
      },
      required: true,
      type: 'file',
      typeOptions: {
        multipleValues: true,
      },
    },
    CONTENT_TYPE_PROPERTY,
    FILE_URL_REGEX_PROPERTY,
    FILE_URL_REPLACE_PROPERTY,
  ])
  @MonkeyToolOutput([
    {
      name: 'urls',
      displayName: {
        'zh-CN': '结果 Url 列表',
        'en-US': 'Result Url List',
      },
      required: true,
      type: 'string',
      description: {
        'zh-CN': '上传后的 Url 列表',
        'en-US': 'The Url list after upload',
      },
      typeOptions: {
        multipleValues: true,
      },
    },
  ])
  public async uploadFilesToPublicS3(
    @Req() req: IRequest,
    @Body() body: UploadFilesToPublicS3Dto,
  ) {
    const { fileUrls, contentType, fileUrlRegex, fileUrlReplace } = body;
    return {
      urls: await this.service.uploadFilesToPublicS3(
        fileUrls,
        contentType,
        fileUrlRegex,
        fileUrlReplace,
      ),
    };
  }
}
