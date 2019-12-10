// pages/admin/admin.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: [{
      date: '',
      time:'',
      reason: '',
      situation: '',
      ordid:'',
    }],
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.updateuse();
   
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
  promise: function (e) {
    let index = e.currentTarget.id;
    this.update_user(index, 'promise');
    this.update_situ(index, 0);//如果允许，则situation表单中对应的order项变为0
    let t = 'obj[' + index + '].situation';
    this.setData({
      [t]: 'promise'
    })
  },
  refuse: function (e) {
    let index = parseInt(e.currentTarget.id)
    this.update_user(index,'refuse');
    this.update_situ(index, 1);//如果不允许，则situation表单中对应的order项变为1
    let t = 'obj[' + index + '].situation'
    this.setData({
      [t]: 'refuse'
    })
  },
  //从数据库中调取信息更新界面
  updateuse:async  function(){
    const db = wx.cloud.database();
    var user = await db.collection('user').where({
      id:"1"//这里应该写满足数据库中日期大于当前日期的判断条件
    }).get();
    var i = 0;
    let si='';
    let reason='';
    let date='';
    let time='';
    let ordid='';
    for(i = 0;i<user.data.length;i++){
     si = 'obj[' + i + '].situation';
     reason = 'obj[' + i + '].reason';
     date = 'obj[' + i + '].date';
     time = 'obj[' + i + '].time';
     ordid = 'obj[' + i + '].ordid';
    this.setData({
      [si]: user.data[i].flag,
      [reason]: user.data[i].reason,
      [date]: user.data[i].date,
      [time]: user.data[i].time,
      [ordid]: user.data[i]._id,
    })
  }
  },

  //更新user表单中的预约信息，及改变处理结果是允许了还是拒绝了
  update_user:function(index,result){
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: "subord",
      data: {
        type: "update", //指定操作是update  
        db: "user", //指定操作的数据表
        indexKey: this.data.obj[index].ordid,
        data: {
          flag:result
        }

      },
      success: function (res) {
        
      },
      error: function (error) {
        
      }
    })
  },
  //更细situation表单的记录，区分不可预约和可预约
  update_situ:async function (index,flag){
    const db = wx.cloud.database()
    //根据日期获取我所处理的信息对应的记录
    var infor = await db.collection('situation').where({
      date: this.data.obj[index].date
    })
      .get();
    var _ord=infor.data[0].order;
    var i;
    //通过时间判断order数组的下标
    switch(this.data.obj[index].time){
      case '8-9': i = 0;break;
      case '9-10': i = 1; break;
      case '10-11': i = 2; break;
      case '11-12': i = 3; break;
      case '14-15': i = 4; break;
      case '15-16': i = 5; break;
      case '16-17': i = 6; break;
      case '19-20': i = 7; break;
    }
    console.log(i);
    _ord[i]=flag;
    console.log(_ord);
    wx.cloud.callFunction({
      name: "subord",
      data: {
        type: "update", //指定操作是update  
        db: "situation", //指定操作的数据表
        indexKey: infor.data[0]._id,
        data: {
          order:_ord
        }

      },
      success: function (res) {
               
      },
      error: function (error) {

      }
    })
  }
})