// pages/search/search.js
var util = require("../../utils/util.js");
var api = require("../../utils/api.js");
var keyword = null;
var start = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    keyword = null;
    start = 0;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getWords: function(e) {
    var val = e.detail.value;
    keyword = val;
  },
  search: function() {
    start = 0;
    var that = this;
    wx.request({
      url: api.search + keyword + "&start=0",
      success: function(res) {
        if (res.errMsg != "request:ok") {
          return;
        }
        that.setData({
          books: res.data.books
        });
      },
      fail: function(res) {
        console.log("查询请求出错啦", res);

      }
    })
  },
  //滑动到view底部事件方法
  getMore: function() {
    start = start + 20;
    var that = this;
    wx.request({
      url: api.search + keyword + "&start=" + start,
      success: function(res) {
        if (res.errMsg != "request:ok") {
          return;
        }
        if (res.data.books.size == 0) {
          console.log("没有更多了");
          return;
        }
        that.setData({
          books: that.data.books.concat(res.data.books)
        });
      },
      fail: function(res) {
        console.log("查询请求出错啦", res);

      }
    })
  },
  goBookInfoPage: function(e) {
    util.goBookInfoPage(e.currentTarget.dataset.bookid);
  },
})