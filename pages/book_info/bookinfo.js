// pages/book_detail/bookdetail.js
var api = require("../../utils/api.js");
var bookid="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    exBookShelf: false,
    bookId: "",
    image: "",
    title: "",
    author: "",
    isSerial: "",
    wordCount: 0,
    info: "",
    majorCate: "",
    majorCateV2: "",
    lastChapter: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    bookid=options.bookId;
    wx.showLoading({
      title: "加载中",
      mask: true
    })
    wx.request({
      url: api.BookInfo + options.bookId,
      success: function(res) {
        that.setData({
          bookId: res.data._id,
          image: res.data.cover,
          title: res.data.title,
          author: res.data.author,
          isSerial: res.data.isSerial == "true" ? "连载中" : "已完结",
          wordCount: res.data.wordCount,
          info: res.data.longIntro,
          majorCate: res.data.majorCate,
          majorCateV2: res.data.majorCateV2,
          lastChapter: res.data.lastChapter,
        });
        wx.hideLoading();
      },
      fail: function(res) {
        wx.showToast({
          title: "网络好像出现了点问题",
        });
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that=this;
    var bookshelf_keys = wx.getStorageSync("bookshelf_keys");
    for (var i = 0; i < bookshelf_keys.length; i++) {
      if (bookid == bookshelf_keys[i]) {
        that.setData({
          exBookShelf: true
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  addBookShelf: function(e){
    var that=this;
    var bookshelf_keys = wx.getStorageSync("bookshelf_keys");
    var bookid=e.currentTarget.dataset.bookid;
    var img = e.currentTarget.dataset.img;
    var title = e.currentTarget.dataset.title;
    bookshelf_keys.push(bookid);
    wx.setStorageSync("bookshelf_keys", bookshelf_keys);
    var bookshelf={
      bookid: bookid,
      isFirstRead:"true",
      bookSourceId:"",
      lastIndex:0,
      img:img,
      title: title,
      source:"",
      chapters:[],
      sourceArray:[],
    }
    wx.setStorageSync(bookid,bookshelf);
    that.setData({
      exBookShelf:true
    });
    wx.showToast({
      title:"已添加到书架",
    })
  }
  ,
  goReadPage: function(e) {
    console.log("e", e);
    var bookid = e.currentTarget.dataset.bookid;
    var img = e.currentTarget.dataset.img;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: "/pages/book_read/bookread?bookid=" + bookid +"&img="+img+"&title="+title,
    })
  }
})