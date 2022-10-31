// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlogList from '../../../app/model/blogList';

declare module 'egg' {
  interface IModel {
    BlogList: ReturnType<typeof ExportBlogList>;
  }
}
