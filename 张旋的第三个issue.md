#### 张旋的第三个issue

----

##### 1.获取当前时间及时间格式问题

解决方案：

```javascript
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

```

