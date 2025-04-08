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
import { UploadFileToPublicS3Dto } from './dto/req/upload-file-to-public-s3';
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
  @MonkeyToolName('upload-file-to-public-s3')
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
      type: 'string',
    },
    {
      name: 'contentType',
      displayName: {
        'zh-CN': '文件类型',
        'en-US': 'File Type',
      },
      required: false,
      type: 'string',
      description: {
        'zh-CN':
          '文件类型，为空时首先使用文件 Url 的 Content-Type，不存在则从 Url 的文件名中提取',
        'en-US':
          'File Type, if empty, first use the Content-Type of the file Url, if not exist, extract from the file name of the Url',
      },
    },
    {
      name: 'fileUrlRegex',
      displayName: {
        'zh-CN': '文件 Url 替换正则表达式',
        'en-US': 'File Url Regex',
      },
      required: false,
      type: 'string',
      description: {
        'zh-CN': '文件 Url 替换正则表达式，为空时不替换',
        'en-US': 'File Url Replace Regex, if empty, not replace',
      },
    },
    {
      name: 'fileUrlReplace',
      displayName: {
        'zh-CN': '文件 Url 替换内容',
        'en-US': 'File Url Replace',
      },
      required: false,
      type: 'string',
      description: {
        'zh-CN': '文件 Url 替换内容，支持 $1 $2 等变量',
        'en-US': 'File Url Replace, support $1 $2 etc.',
      },
    },
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
}
