// pages/index/index.js
var util = require("../../utils/util.js");
var api = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: 5000,
    duration: 1000,
    books: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: api.RecommendBooks,
      method: "GET",
      success: function(res) {
        that.setData({
          books: res.data.books
        });
      },
      fail: function(res) {
        wx.showToast({
          title: "网络好像出现了点问题",
        })
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
  goBookInfoPage: function(e) {
    util.goBookInfoPage(e.currentTarget.dataset.bookid);
  },
  goSearchPage: function() {
    wx.navigateTo({
      url: "/pages/search/search",
    })
  },
  goTestPage: function() {
    wx.navigateTo({
      url: "/pages/test/test",
    })
  }
})