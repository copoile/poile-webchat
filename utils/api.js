var ApiRoot = "http://localhost:8080/novel/";
//使用方式 var api = require('../../config/api.js'); api.IndexUrl
module.exports = {
  IndexUrl: ApiRoot + 'home/index', //首页数据接口
  BookShelf: ApiRoot + 'bookshelf/index', //书架书本数据接口
  ChapterTest: "https://chapter2.zhuishushenqi.com/chapter/http%3a%2f%2fvip.zhuishushenqi.com" +
    "%2fchapter%2f5698c06def0cc97e6e843725%3fcv%3d1527239849289",
  RecommendBooks: "https://api.zhuishushenqi.com/book/566a0609469c97325459f068/recommend", //根据书籍id查找类似的,猜你喜欢
  BookInfo: "https://api.zhuishushenqi.com/book/", //书籍详情
  BookSource: "https://api.zhuishushenqi.com/atoc?view=summary&book=", //566a0609469c97325459f068"
  Catalog: "https://api.zhuishushenqi.com/atoc/", //"http://api.zhuishushenqi.com/atoc/5698c054ef0cc97e6e843524?view=chapters"
  chapter: "https://chapter2.zhuishushenqi.com/chapter/",
  search: "https://api.zhuishushenqi.com/book/fuzzy-search?&limit=20&&query="
}