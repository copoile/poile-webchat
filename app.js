//app.js
App({
  onLaunch: function() {
    wx.getStorage({
      key: "bookshelf_keys",
      success: function(res) {
      },
      fail:function(res){
        var bookshelf_keys=[];
        wx.setStorage({
          key: "bookshelf_keys",
          data: bookshelf_keys,
        })

      }
    })
  },

})