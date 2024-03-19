import TopNav from "../ui/common/topNav"; 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
    // flex: 这个类名表明该 <div> 元素采用了弹性布局，其子元素会按照一定的规则自动伸缩。 
    // h-screen: 这个类名表示该 <div> 元素的高度会占据整个屏幕高度。通常用于使元素铺满整个屏幕。
    // flex-col: 这个类名表示在小屏幕上（例如移动设备），子元素将按列排列，即垂直方向排列。
    // md:flex-row: 这个类名表示在中等大小的屏幕（例如平板电脑、桌面电脑等），子元素将按行排列，即水平方向排列。
// md:overflow-hidden: 这个类名表示在中等大小的屏幕上，当内容溢出时隐藏溢出部分。这可用于防止内容在较窄的视口上产生水平滚动条。
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-0">
        <TopNav />
      </div>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}
