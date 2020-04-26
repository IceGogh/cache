### Cache-Control 
*  no-cache / no-store 无缓存设置
*  max-age / Expires 强缓存 
* last-modified / if-modified-since 协议缓存
* 强缓存 < 协议缓存优先级
* E-tag / if-None-Match   优先于 modified

| 浏览器 | 访问方式 | 缓存方式| Status |                  Size                     | Time | 服务器是否监听到 request |
|:-------|:--------|:--------|:-------|:-----|:-----|:------------------------|
| Chrome/FireFox |直接url访问| Expires| 200    | Size | Time | 是 |
| ~      | ~        | last-modified | 200 | Size | Time | 是 |
| ~      | ~        | max-age | 200    |  Size   | Time  | 是 |
| ~      | ~        | public  | 200    | Size   | Time  | 是 |
| ~      | ~        | privite | 200    | Size | Time | 是 | 
| Chrome | Tab页(站内跳转) | Expires | 200    | memory cache | 0ms | 否 |
| ~      | ~        | last-modified | 200 | memory cache | 0ms | 否 |
| ~      | ~        | no-store | 200    | memory cache | 0ms | 否 |
| ~      | ~        | no-cache | 200    | memory cache | 0ms | 否 |
| ~      | ~        | max-age | 200    | memory cache | 0ms | 否 |
| ~      | ~        | public  | 200    | memory cache | 0ms | 否 |
| ~      | ~        | privite | 200    | memory cache | 0ms | 否 |
| Chrome | Tab页(站外跳转) | Expires | 200    | disk cache | mini Time | 否 |
| ~      | ~        | last-modified | 200 | disk cache | 1ms | 否 |
| ~      | ~        | no-store | 200    | Size | Time | 是 |
| ~      | ~        | no-cache | 200    | disk cache | mini Time | 否 |
| ~      | ~        | max-age | 200    | disk cache | mini Time | 否 |
| ~      | ~        | public  | 200    | disk cache | mini Time | 否 |
| ~      | ~        | privite | 200    | disk cache | mini Time | 否 |
| FireFox| Tab页(站内/外)跳转 | Expires / no-store / no-cache / max-age / public /privite | 调试器 网络栏直接不显示 | - | - | 否 |
| Chrome/FireFox | F5 刷新  | Expires | 200    | Size | Time | 是 |
| ~      | ~        | last-modified | 命中 304 <br> 未中 200 | 命中 mini Size(header size?) <br/> 未中 Size | mini Time <br> Time | 是 |
| ~      | ~        | no-cache| 200    | Size | Time | 是 |
| ~      | ~        | no-store| 200    | Size | Time | 是 |
| ~      | ~        | max-age | 200 | 过期 Size <br/> 未过期 memory cache 200 | 过期 Time <br/> 未过期 0ms | 过期 是 <br/> 未过期 否 |
| ~      | ~        | public  | 200 | Size | Time | 是 |
| ~      | ~        | privite | 200    | Size | Time | 是 |
#### 组合情形
| 浏览器 | 访问方式 | 缓存方式| Status |                  Size                     | Time | 服务器是否监听到 request |
|:-------|:--------|:---------------------|:-------|:-----|:-----|:------------------------|
| Chrome/FireFox |直接url访问| no-store + modified | 200    |  Size | Time | 是 |
| Chrome |直接url访问| (Expires/public/privite) + modified | 200    | memory cache | 0ms | 否 |
| Chrome | Tab页跳转 | *(除no-store)  | 200    | memory/disk cache | 0ms | 否 |
| Chrome |直接url访问| max-age + modified | 未过期 200 <br/> 过期 304 | memory cache <br/> mini Size(header size?)  | 0ms <br/> mini Time | 否 <br/> 是 |
| FireFox |直接url访问| (Expires/public/privite) + modified | 命中 304 <br> 未中 200 | 命中 mini Size(header size?) <br/> 未中 Size | mini Time <br> Time | 是 |

#### note
* Size 值为 Size 即 原始Size值； time 值为 Time 即 所需要加载时间， min Time 指 小于无缓存加载时间 但不等于 0ms；
* 关闭浏览器重新打开 chrome 结果 同Tab页站外打开； FireFox同 直接打开。
* Expires 与 Cache-Control: max-age 同时存在时， max-age 优先级高于 Expires, 执行max-age
* 搜狗浏览器，Opera 浏览器 同 Chrome 一样结果
* FireFox 无论缓存机制与否 都会缓存 favicon.ico
* Ctrl + F5 (清空缓存并硬性重新加载 同上(没有访问记录直接url访问))
* no-cache 并不是说，不准使用缓存，而是需要走接下来的优先级相对较低的另一类--协议缓存。真正决定不用缓存内的资源是将该值定义为 no-store
* must-revalidate，如果超过了max-age的时间，必须向服务器发送请求，验证资源的有效性
* no-cache，基本等价于max-age=0，由对比缓存来决定是s否缓存资源
* no-store，真正意义上的不缓存
* public，所有内容都可以被缓存
* private，所有内容只有客户端可以缓存，代理服务器不能缓存。默认值
* eTag 同 modified 验证机制一样, 各浏览器请求响应机制也同 modified一致。
