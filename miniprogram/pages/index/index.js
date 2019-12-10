//index.js
const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    date:app.date,//获取预约情况数组
    reason:'',//申请原因
    click:-1,
    todid:'',//今天预约id
    tomid:'',//明天的id
    tdatid:'',//后天的id
    id: '',
    userid:app.id,


  },
 

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  onLoad:function(options){
    this.getsu();
    this.setData({
      userid:options.id
    })
 },
  
// 用户点击button按钮改变数组值

  change: function (res) {
    

     var newAddr = this.data.date;
     
  
    for(var i=0;i<9;i++){
      for (var j = 0; j < 4; j++) {
        if ((4 * i + j + 1 == res.currentTarget.id) && (newAddr[i][j] == 1)) {
          newAddr[i][j] = 2;
          
          this.setData({
            click: res.currentTarget.id,
            date: newAddr,

          })
          return
        }
      
        if ((4*i+j +1== res.currentTarget.id)&&(newAddr[i][j]==2)) {
          newAddr[i][j] = 1;
          this.setData({
            click: res.currentTarget.id,
            date: newAddr,

          })
          return
        }
      }
    }
   
  },
  // 点击预约提交信息按钮
  submit:  function (e) {
    var ord=[0,0,0,0,0,0,0,0];
    var i=0;
    for(i;i<8;i++){
      ord[i] = this.data.date[i+1][1];
      if (ord[i] == 2||ord[i]==4) {
        ord[i] = 3;
      }

    }
    const db = wx.cloud.database()
    
    
    wx.cloud.callFunction({
      name: "subord",
      data: {
        type: "update", //指定操作是update  
        db: "situation", //指定操作的数据表
        indexKey: this.data.todid,
        data: {
         order:ord
        }

      },
      success: function (res) {
        
      },
      error: function (error) {
        console.log(error)
      }
    })//改变数据库中今天的订阅信息
    for (i=0; i < 8; i++) {
      ord[i] = this.data.date[i + 1][2];
      if (ord[i] == 2||ord[i]==4) {
       ord[i] = 3;//3代表个人申请但还未审核通过
      }

    } wx.cloud.callFunction({
      name: "subord",
      data: {
        type: "update", //指定操作是update  
        db: "situation", //指定操作的数据表
        indexKey: this.data.tomid,
        data: {
          order: ord
        }

      },
      success: function (res) {

      },
      error: function (error) {
        console.log(error)
      }
    })//改变数据库中明天的订阅信息
    for (i = 0; i < 8; i++) {
      ord[i] = this.data.date[i + 1][3];
      if(ord[i]==4||ord[i]==2){
        ord[i] = 3;
      }
      
    } wx.cloud.callFunction({
      name: "subord",
      data: {
        type: "update", //指定操作是update  
        db: "situation", //指定操作的数据表
        indexKey: this.data.tdatid,
        data: {
          order: ord
        }

      },
      success: function (res) {

      },
      error: function (error) {
        console.log(error)
      }
    })//改变数据库中后天的订阅信息
    this.order_submit();
   
  },
  reason: function (e){
    this.setData({
      reason: e.detail.value
    })

  },
  //向数据库user提交预约信息
  order_submit: function(){
    var newArr = this.data.date;
    var _date='';
    var _time='';
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 4; j++) {
        if (this.data.date[i][j] == '2') {
          newArr[i][j]=4;//使用户端点击预约过的时间段且点击预约后的时间不能再次点击修改
          if(j==1){
            _date=this.getDateStr('',0,0);
          }
          if (j == 2) {
            _date = this.getDateStr('', 1, 0);
          }
          if (j == 3) {
            _date = this.getDateStr('', 2, 0);
          }
          _time = newArr[i][0];
          wx.cloud.callFunction({
            name: "subord",
            data: {
              type: "insert", //指定操作是insert  
              db: "user", //指定操作的数据表
              data: {
                reson: this.data.reason,
                id: this.data.userid,
                flag: 'Unaudited',//代表未审核
                date: _date,
                time: _time,
              }
            },
            success: function (res) {
            },
            error: function (error) {
              console.log(error)
            }
          })
          //点击提交按钮，更新date数组
         
        }
      }
    }
    this.setData({
      date: this.data.date,
      reason:''
    })
  },
  //从数据库中调取查找近三天预定信息
  getsu: async function () {
    var _this = this;
    const db = wx.cloud.database();
    //返回今天
    var tod = await db.collection('situation').where({
      date: this.getDateStr('',0,0)
    })
      .get();
      //返回明天
    var tom = await db.collection('situation').where({
      date: this.getDateStr('', 1,0)
    })
      .get();
      //返回后天
    var tdat = await db.collection('situation').where({
      date: this.getDateStr('', 2,0)
    })
      .get(); 

      //如果数据库中没有后天这条记录，初始化后天记录，并添加到数据库中
    if(tdat.data.length==0){
      var _ord=[1,1,1,1,1,1,1,1];
      wx.cloud.callFunction({
        name: "subord",
        data: {
          type: "insert", //指定操作是insert  
          db: "situation", //指定操作的数据表
          data: {
            order:_ord,
            date: this.getDateStr('', 2, 0),
          }
        },
        success: function (res) {
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
    
    //重新获取后天信息
    tdat = await db.collection('situation').where({
      date: this.getDateStr('', 2, 0)
    })
      .get();
    
    var newAddr=this.data.date;
    newAddr[0][1] = this.getDateStr('',0,1);
    newAddr[0][2] = this.getDateStr('', 1,1);
    newAddr[0][3] = this.getDateStr('', 2,1);
    for(var i=0;i<8;i++){
      newAddr[i + 1][1] = tod.data[0].order[i];
      newAddr[i + 1][2] = tom.data[0].order[i];
      newAddr[i + 1][3] = tdat.data[0].order[i];
    }
    
    this.setData({
      date:newAddr,
      todid:tod.data[0]._id,
      tomid:tom.data[0]._id,
      tdatid: tdat.data[0]._id,
    })
      },
  //获取当天多少天后的日期
  getDateStr :function (today, addDayCount,flag) {//flag=0指示返回年月日 flag=1指示返回月日
    var dd;
    if(today) {
      dd = new Date(today);
    }else{
      dd = new Date();
    }
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期 
    var d = dd.getDate();
    if(m < 10) {
      m = '0' + m;
    };
    if(d < 10) {
      d = '0' + d;
    };
    if(flag==0)
      return y + "-" + m + "-" + d;
    else
      return  m + "-" + d;
  }
})
