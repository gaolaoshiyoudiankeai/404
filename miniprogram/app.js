//app.js
App({
  year:'',
  month:'',
  day:'',
  hour:'',
  one:'',
  date: [
    ['时间日期', '1', '2', '3'],
    ['8-9', '0', '0', '1'],
    ['9-10', '1', '1', '0'],
    ['10-11', '0', '1', '1'],
    ['11-12', '1', '0', '0'],
    ['14-15', '0', '1', '0'],
    ['15-16', '0', '0', '1'],
    ['16-17', '0', '1', '0'],
    ['19-20', '0', '1', '0']],
  
  onLaunch: async function () {
    var _this=this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',this.getsu();
        
        traceUser: true,
        
      })
    }
    
  },
  
  change:function(){
    var newAddr = this.date;
    
    this.setData({

      date: newAddr

    })
  },
  
  //获取当天多少天后的日期
  getDateStr: function (today, addDayCount) {
    var dd;
    if (today) {
      dd = new Date(today);
    } else {
      dd = new Date();
    }
    dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };
    return y + "-" + m + "-" + d;
  }
  
})
