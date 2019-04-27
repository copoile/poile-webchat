// pages/book_read/bookread.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var cont = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    isHide: true,
    scrollTop: 0,
    exBookShelf: false,
    chapters: [],
    sourceArray: [],
    isFirstRead: "fasle",
    bookid: null,
    img: null,
    source: null,
    title: null,
    lastIndex: 0,
    bookSourceId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: "加载",
      mask: true
    });
    var info = wx.getStorageSync(options.bookid);
    if (info != "") {
      that.setData({
        exBookShelf: true,
        isFirstRead: info.isFirstRead,
        bookid: info.bookid,
        img: info.img,
        title: info.title,
      });
    }
    if (that.data.isFirstRead == "true") {
      // 获取书源id
      wx.request({
        url: api.BookSource + that.data.bookid,
        success: function(res) {
          if (res.errMsg != "request:ok") {
            return;
          }
          that.setData({
            sourceArray: res.data,
            source: res.data[0].source,
            bookSourceId: res.data[0]._id
          });
          //获取目录
          wx.request({
            url: api.Catalog + that.data.bookSourceId + "?view=chapters",
            success: function(res) {
              if (res.errMsg != "request:ok") {
                return;
              }
              that.setData({
                chapters: res.data.chapters
              });
              wx.request({
                url: api.chapter + encodeURIComponent(that.data.chapters[that.data.lastIndex].link),
                success: function(res) {
                  var cpContent = null;
                  if (that.data.source == "zhuishuvip") {
                    cpContent = res.data.chapter.cpContent;
                  } else {
                    cpContent = res.data.chapter.body;
                  }
                  cpContent = cpContent.replace(/\s/g, "  ");
                  cpContent = cpContent.replace(/    /g, "\n&emsp;&emsp;");
                  cpContent = cpContent.replace(/   /g, "\n&emsp;&emsp;");
                  cpContent = cpContent.replace(/  /g, "\n&emsp;&emsp;");
                  cpContent = cpContent.replace(/ /g, "\n&emsp;&emsp;");
                  var content = "\n" + that.data.chapters[that.data.lastIndex].title + "\n\n&emsp;&emsp;" + cpContent;
                  that.setData({
                    content: content
                  });
                  cont = content;
                  wx.hideLoading();
                },
                fail: function(res) {
                  console.log("章节内容请求失败", res);
                }
              })
            },
            fail: function(res) {
              console.log("请求目录出错啦", res);
            }

          });
        },
        fail: function(res) {
          console.log("请求书源出错啦", res);
        }
      });
    } else {
      console.log("不是第一次阅读",info);
      wx.request({
        url: api.Catalog + info.bookSourceId + "?view=chapters",
        success:function(res){
          wx.request({
            url: api.chapter + encodeURIComponent(that.data.chapters[that.data.lastIndex].link),
            success: function (res) {
              var cpContent = null;
              if (that.data.source == "zhuishuvip") {
                cpContent = res.data.chapter.cpContent;
              } else {
                cpContent = res.data.chapter.body;
              }
              cpContent = cpContent.replace(/\s/g, "  ");
              cpContent = cpContent.replace(/    /g, "\n&emsp;&emsp;");
              cpContent = cpContent.replace(/   /g, "\n&emsp;&emsp;");
              cpContent = cpContent.replace(/  /g, "\n&emsp;&emsp;");
              cpContent = cpContent.replace(/ /g, "\n&emsp;&emsp;");
              var content = "\n" + that.data.chapters[that.data.lastIndex].title + "\n\n&emsp;&emsp;" + cpContent;
              that.setData({
                content: content
              });
              cont = content;
              that.setData({
                sourceArray: info.sourceArray,
              });
              that.setData({
                source: info.source,
                bookSourceId: info.bookSourceId,
                lastIndex: info.lastIndex,
                chapters: info.chapters
              });
              wx.hideLoading();
            },
            fail: function (res) {
              console.log("章节内容请求失败", res);
            }
          })
        }
      })
       


    }
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
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this;
    var exBookShelf = that.data.exBookShelf;
    if (exBookShelf) { //存在书架中保存阅读进度
      var bookshelf = {
        bookid: that.data.bookid,
        isFirstRead: "false",
        bookSourceId: that.data.bookSourceId,
        lastIndex: that.data.lastIndex,
        img: that.data.img,
        title: that.data.title,
        source: that.data.source,
        chapters: that.data.chapters,
        sourceArray: that.data.sourceArray,
      }
      wx.setStorageSync(that.data.bookid, bookshelf);
    } else {

    }

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

  //加载更多
  getMore: function() {
    var that = this;
    wx.showLoading({
      title: "加载",
      mask: true
    });
    var lastIndex = that.data.lastIndex + 1;
    that.setData({
      lastIndex: lastIndex,
    });
    wx.request({
      url: api.chapter + encodeURIComponent(that.data.chapters[that.data.lastIndex].link),
      success: function(res) {
        var cpContent = null;
        if (that.data.source == "zhuishuvip") {
          cpContent = res.data.chapter.cpContent;
        } else {
          cpContent = res.data.chapter.body;
        }
        cpContent = cpContent.replace(/\s/g, "  ").replace(/    /g, "\n&emsp;&emsp;").
        replace(/   /g, "\n&emsp;&emsp;").replace(/   /g, "\n&emsp;&emsp;").replace(/  /g, "\n&emsp;&emsp;");
        var content = "\n\n" + that.data.chapters[that.data.lastIndex].title + "\n\n&emsp;&emsp;" + cpContent;
        that.setData({
          content: cont + content
        });
        cont = cont + content;
        wx.hideLoading();
      },
      fail: function(res) {
        var lastIndex = that.data.lastIndex - 1;
        that.setData({
          lastIndex: lastIndex,
        });
        wx.hideLoading();
        wx.showToast({
          title: "网络好像出现了点问题",
        });
      }
    })
  },

  //换源
  changeSource: function(e) {
    wx.showLoading({
      title: "加载",
      mask: true
    });
    var that = this;
    console.log(that.data.sourceArray[e.detail.value]);
    var bookSourceId = that.data.sourceArray[e.detail.value]._id;
    var source = that.data.sourceArray[e.detail.value].source;
    that.setData({
      bookSourceId: bookSourceId,
      source: source
    });
    //获取目录
    wx.request({
      url: api.Catalog + bookSourceId + "?view=chapters",
      success: function(res) {
        if (res.errMsg != "request:ok") {
          return;
        }
        var chapters = res.data.chapters;
        that.setData({
          chapters: chapters
        });

        wx.request({
          url: api.chapter + encodeURIComponent(that.data.chapters[that.data.lastIndex].link),
          success: function(res) {
            var cpContent = null;
            if (that.data.source == "zhuishuvip") {
              cpContent = res.data.chapter.cpContent;
            } else {
              cpContent = res.data.chapter.body;
            }
            cpContent = cpContent.replace(/\s/g, "  ").replace(/    /g, "\n&emsp;&emsp;").
            replace(/   /g, "\n&emsp;&emsp;").replace(/   /g, "\n&emsp;&emsp;").replace(/  /g, "\n&emsp;&emsp;");
            var content = "\n\n" + that.data.chapters[that.data.lastIndex].title + "\n\n&emsp;&emsp;" + cpContent;
            that.setData({
              content: content,
              scrollTop: 0
            });
            cont = content;
            wx.hideLoading();
          },
          fail: function(res) {
            console.log("章节内容请求失败", res);
          }
        })
      },
      fail: function(res) {
        console.log("请求目录出错啦", res);
      }
    });
  },

  //目录
  catalog: function(e) {
    wx.showLoading({
      title: "加载",
      mask: true
    });
    var that = this;
    var lastIndex = parseInt(e.detail.value);
    that.setData({
      lastIndex: lastIndex,
    });
    wx.request({
      url: api.chapter + encodeURIComponent(that.data.chapters[that.data.lastIndex].link),
      success: function(res) {
        console.log("目录", res);
        var cpContent = null;
        if (that.data.source == "zhuishuvip") {
          cpContent = res.data.chapter.cpContent;
        } else {
          cpContent = res.data.chapter.body;
        }
        cpContent = cpContent.replace(/\s/g, "  ").replace(/    /g, "\n&emsp;&emsp;").
        replace(/   /g, "\n&emsp;&emsp;").replace(/   /g, "\n&emsp;&emsp;").replace(/  /g, "\n&emsp;&emsp;");
        var content = "\n\n" + that.data.chapters[that.data.lastIndex].title + "\n\n&emsp;&emsp;" + cpContent;
        that.setData({
          content: content,
          scrollTop: 0
        });
        cont = content;
        wx.hideLoading();
      },
      fail: function(res) {
        console.log("章节内容请求失败", res);
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //显示隐藏上下操作栏
  showAndHide: function() {
    var that = this;
    var isHide = that.data.isHide;
    if (isHide) {
      that.setData({
        isHide: false
      });
    } else {
      that.setData({
        isHide: true
      });
    }
  }

})