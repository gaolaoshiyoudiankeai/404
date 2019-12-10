// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    id:'',//用户的id
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

formSubmit:async function (e) {
    var click = e.detail.target.id;
    var _id=e.detail.value.id;
    var password=e.detail.value.password;
    const db = wx.cloud.database();
    this.setData({
    id: _id
    });
   
    if( click==0)
    {
      var user = await db.collection('useraccount').where({
        id: _id
      }).get();
      if(password==user.data[0].password)
        wx.navigateTo({
          url: '../index/index?id='+this.data.id,
        })
      }
  if (click == 1) {
    var admin = await db.collection('admin').where({
      id: _id
    }).get();
    if (password == admin.data[0].password)
      wx.navigateTo({
        url: '../admin/admin'
      })
  }
    if (_id.lenght == 0 || password.length==0)
      {
      this.setData({
        modalHidden: !this.data.modalHidden,})
      }  
    },
  
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
    }
})