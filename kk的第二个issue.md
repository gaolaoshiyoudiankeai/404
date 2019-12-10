## kk的第二个issue

#### 1. 如何在wxml中循环显示一个js中的结构体数组

在管理员界面中想要循环显示出申请会议室的申请时间和申请理由。



解决方法：

```html
<view wx:for="{{obj}}" wx:for-index="i" >
  <view class="view2" hidden="{{item.show}}">
    <view class="view1">
     {{item.text}}：{{item.describe}}
    </view>
    <view>
       <button class="button1" type="default" size="mini" bindtap="promise" id="{{i}}"> 允  许 </button>
       <button class="button2" type="default" size="mini" bindtap="refuse"   id="{{i}}"> 拒     绝 </button>
    </view>
  </view>
```

通过wx:for来循环显示，{{obj}}为要循环显示的对象，item为当前下标的结构体。



#### 2. 如何确定结构体数组的长度

​        在循环显示申请前，这些申请数据通过数据库读取来获得，在js处应如何确定有几条消息？怎样可以动态的生成一个结构体数组？

