// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportUpload from '../../../app/controller/upload';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    upload: ExportUpload;
  }
}
