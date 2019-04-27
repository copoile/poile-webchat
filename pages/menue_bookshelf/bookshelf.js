// pages/menue_bookshelf/bookshelf.js
var api = require('../../utils/api.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haslogin:true,
    bookList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var bookshelf_keys = wx.getStorageSync("bookshelf_keys");
    var bookList = [];
    for (var i = 0; i < bookshelf_keys.length; i++) {
      var bookshelf = wx.getStorageSync(bookshelf_keys[i]);
      bookList.push(bookshelf);
    }
    that.setData({
      bookList: bookList
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  goReadPage:function(e){
    wx.navigateTo({
      url: "/pages/book_read/bookread?bookid=" + e.currentTarget.dataset.bookid,
    })
  }
})